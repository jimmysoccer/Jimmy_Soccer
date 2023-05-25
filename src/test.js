import {useSelector, useDispatch} from 'react-redux'
import { Tooltip, UncontrolledTooltip } from "reactstrap"
import { MarketData } from '../flows/Flows';
import {useSearchParams, useParams, NavLink, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as pathsActions from '../paths/pathsSlice';
import { segmentConstraintsActions } from '../segmentConstraints/segmentConstraintsSlice'
import { pointConstraintsActions } from '../pointConstraints/pointConstraintsSlice'
import { marketsActions } from '../markets/marketsSlice'
import * as selectedItemsActions from '../selectedItems/selectedItemsSlice';
import {ItemSelector} from '../selectedItems/SelectorComponents'
import { useGetScenarioQuery } from '../services/edgeApi';
import toast from 'react-hot-toast'
import { priceFormatter, numberFormatter } from '../helpers/formatters';
import { SidebarPath } from '../paths/SidebarPaths';
import { OptimizeScenario } from './OptimizeScenario';
import { Contract } from '../contracts/Contract'
import { ContractName } from '../contracts/ContractName'
import { PointName } from '../points/PointName';
import { EditScenario } from '../scenarios/EditScenario'
import { SegmentConstraints } from '../segmentConstraints/SegmentConstraints';
import { PointConstraints } from '../pointConstraints/PointConstraints';
import { Markets } from '../markets/Markets';
import { Trades } from '../trades/Trades';
import { Collapse } from 'reactstrap';
import * as plotterActions from '../plotter/plotterSlice'
import { EyeIcon } from '@iconicicons/react';
import { ToggleContracts } from '../contracts/ToggleContracts'
import {AddToGroup} from '../scenarios/AddToGroup'
import { useGetScenarioGroupQuery } from '../services/edgeApi';
import { ScrollIntoView } from '../helpers/ScrollIntoView';
import * as plotterSelectors from '../plotter/plotterSelectors'; 

export const RenderWithKey = ({ children }) => {
  // just return the child with a key for rerendering when URL changes
  const params = useParams()
  const id = params.id
  return children({ key: id, id: id});
}

export const Scenario = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const scenarioId = props.id
  const [isEditing, setIsEditing] = useState(props.isEditing || scenarioId === 'new')

  const selectedPathId = useSelector(state => state.paths.selectedPathId)
  const [showMarketData, setShowMarketData] = useState(false)
 
  const params = useParams()
  const scenarioGroupId = params.scenarioGroupId 
  const groupUrlPrepend = scenarioGroupId ? `/scenario-groups/${scenarioGroupId}` : ``

  // if there's scenario data passed in from props, start with that
  const [scenario, setScenario] = useState(props.scenario)
  // if scenario data is already here, skip fetching it
  const skip = scenario || scenarioId === 'new'
  // const skip = false
  // or if we pass in scenario data from a list of scenarios, we don't have to run a query for each individual scenario
  const { data: fetchedScenario, error, isLoading} = useGetScenarioQuery({scenarioId: String(scenarioId), scenarioGroupId: scenarioGroupId}, {skip})
  
  // get scenario group name if there's a scenario group
  const { data: scenarioGroup, error: scenarioGroupError, isLoading: scenarioGroupIsLoading} = useGetScenarioGroupQuery(String(scenarioGroupId), {skip: !scenarioGroupId})
  
  useEffect(() => {
    if (fetchedScenario) {
      setScenario(fetchedScenario)
    }
  },[fetchedScenario])


  const onEditSuccess = (result) => {
    // should we invalidate and refetch this scenario, or just handle the response directly?
    setScenario(result)
    setIsEditing(false)
    // navigate to new scenario URL, but might want to do this conditionally
    // right now it does navigate to the new URL but it doesn't re-render this component, probably because there's no key set on the Scenario component in the routes.  I don't know if we really care because it seems to do what we want
    navigate(`${groupUrlPrepend}/scenarios/${result.id}`)

  }

  const onEditCancel = () => {
    setIsEditing(false)
    // depending on where we are, we probably want to do different things when canceliing
    // like on scenarios/new, we probably want to go back to /scenarios
    // but if we make a scenario modal, cancel edit should just hide the modal
    if(scenarioId === 'new'){
      // or "back" to wherever we were previously
      navigate(`/${groupUrlPrepend}scenarios`)
    }
  }

  useEffect(()=>{
    if(scenario?.operations){
      // this should probably be handled individually in the market and segment constraint components?
      // selects first chain if there are chains
      if(scenario.operation_chains.length > 0){
        dispatch(pathsActions.pathSelected({selectedPathId: 0}))
        // set first 5 paths visible initially
        // TODO: use context and map inject instead of redux to make mapping paths more composable and reusable
        dispatch(pathsActions.setPathsVisible([0,1,2,3,4].map(i => String(i))))
      }else{
        // selects most flow if individual ops
        const maxId = scenario.operations.reduce((result, op) => {
          if(op.delivered_dth > result.delivered_dth){
            return op
          }else{
            return result
          }
        },{delivered_dth: 0}).id
        dispatch(pathsActions.pathSelected({selectedPathId: maxId}))
        dispatch(pathsActions.setPathsVisible(scenario.operations.slice(0,5).map(op => String(op.id))))
      }
      
      dispatch(segmentConstraintsActions.overwrite(scenario.segment_constraints))
      dispatch(pointConstraintsActions.overwrite(scenario.point_constraints))
      dispatch(marketsActions.overwrite(scenario.markets))
    }

    //clean up
    return function() {
      dispatch(segmentConstraintsActions.resetState())
      dispatch(pointConstraintsActions.resetState())
      dispatch(marketsActions.resetState())
      dispatch(pathsActions.resetState())
    }

  },[scenario])


  const submitValidated = true

  
  if(isLoading){
    return <>Loading Scenario</>
  }
  
  if(error){
    toast.error('Problem loading scenario')
    return null
  }
  
  if (isEditing) {
    return(
      <EditScenario
        scenario={scenario} 
        onSuccess={onEditSuccess} 
        onCancel={onEditCancel}
      />
      ) 
  }
  
  if(!scenario) {return null}

  // console.log("scenario" + JSON.stringify(scenario))
  const totalProfit = scenario.operations.filter(op => !op.is_reciprocal_op).reduce((sum, operation) => Number(sum) + Number(operation.total_profit), 0)
  // filter out kexchanges so we just see the total delivered dth
  // TODO: this sorting and filtering should be done in backend
  const totalVolume = scenario.operations
    .filter(op => !op.is_reciprocal_op)
    .filter(op => op.delivery_asset_type != 'KEXCHANGE')
    .reduce((sum, operation) => Number(sum) + Number(operation.delivered_dth), 0)

  return (
    <>
      {scenarioGroup && <><h5>{scenarioGroup.name}</h5></>}
      
      <ul className="pagination justify-content-center">
        <li className={(scenario.prev_in_group ? "" : "disabled") + " page-item"}>
          <NavLink
            to={scenario.prev_in_group ? `${groupUrlPrepend}/scenarios/${scenario.prev_in_group}` : "#"}
            className={"page-link"}
          >
            {scenarioGroupId ? 'Prev In Group' : 'Prev Scenario'}
          </NavLink>
        </li>
        <li className={(scenario.next_in_group ? "" : "disabled") + " page-item"}>
          <NavLink
            to={scenario.next_in_group ? `${groupUrlPrepend}/scenarios/${scenario.next_in_group}` : "#"}
            className={"page-link"}
            // disabled={true}
          >
            {scenarioGroupId ? 'Next In Group' : 'Next Scenario'}
          </NavLink>
        </li>
      </ul>

      {/* <GoToScenario  currentId={scenario.id} /> */}
      <UnflowedGasWarnings scenario={ scenario } />
      <h5 className="float-start">{ scenario.name || `Scenario #${ scenario.id }` }</h5>
      <AddToGroup className='float-end btn btn-sm btn-outline-success mb-3' scenarioId={scenario.id}>Add To Group</AddToGroup>
      <div className="clearfix"></div>
      <p>{ scenario.description }</p>
      <button onClick={() => setIsEditing(true)} className="btn w-100 btn-outline-warning mb-3">Edit Scenario</button>
      {/* <OptimizeScenario onSuccess={setScenario} scenario={scenario} >Re-Run Optimization</OptimizeScenario> */}
      <div>Flow Date: {scenario.flow_date} </div>

      {/* <OptimizeScenario currentScenario={scenario} onSuccess={setOverrideScenarioData}/> */}
      <div>Total Profit: ${numberFormatter(totalProfit)}</div>
      <div>Total Delivered Volume: {Math.floor(totalVolume)} dth</div>
      <div>Profit / Dth: ${totalVolume ? numberFormatter(totalProfit/totalVolume,3) : "-"}</div>
      {/* <div>Profit / dth: {priceFormatter.format(totalProfit/totalVolume)} dth</div> */}
      <NavLink 
        to='/scenarios/new' 
        state={{scenario: scenario}}
      >Duplicate This Scenario</NavLink>
      <hr />
      {/* to see market data if we want - this can be set up much better where it loads on first click, but on hide it just removes the flows from the map - fine for now */}
      {/* also might need to get nom cycle - we don't save this to a scenario yet but we could */}
      <button className='btn btn-outline-primary w-100' onClick={() => setShowMarketData(!showMarketData)}>{showMarketData ? 'Hide Market Data' : 'Show Market Data'}</button>
      <Collapse isOpen={showMarketData}>
        {showMarketData && <MarketData gasDate={scenario.flow_date} />}
      </Collapse>
      <hr/>
      <div className="clearfix">
        <div className="float-start" onClick={() => dispatch(pathsActions.hideAll())}>Hide All</div>
        <div className="float-end" onClick={() => dispatch(pathsActions.showAll())}>Show All</div>
      </div>
      <hr />
      {scenario.operation_chains.length === 0 ? (

        <ScrollIntoView selectedChildId={selectedPathId}>
          {scenario.operations
            // filter out reciprocal ops
            .filter(operation => !operation.is_reciprocal_op)
            .filter(operation => operation.contract_id) // filter out contracts but does this also filter out operations buying and selling at one location?
            // .filter(operation => operation.delivered_dth > 0.1)
            .map((operation) => (
            <SidebarPath id={operation.id} path={operation} key={operation.id} title={`${operation.tsp_name} #${operation.id}`}>
              <Operation operation={operation} />
            </SidebarPath> 
        ))}
      </ScrollIntoView>

    ):(

      <ScrollIntoView selectedChildId={selectedPathId}>
        {[...scenario.operation_chains]
          .sort((a,b) => -(a.profit-b.profit))
          .map((operation_chain, i) => {
            // one big path test
            // get each operation path node ids, concatenate them together
            // TODO: decide best way to be able to drill up and down into path chains.  Have backend handle most of this logic instead of having lookups inside of nested maps like this
            const chain_path_node_ids = operation_chain.operations.reduce((prev, op_id) => {
              const operation = scenario.operations.find(op => op.id === op_id)
              return prev.concat(operation?.path_node_ids)
            },[])

            // const popups = operation_chain.operations.reduce
            // TODO: should we add arbitrary popups along the path at each exchange
            // TODO: individual operations don't have the same volumes as the chain, need to calculate the volume for descriptions
            const receipt_description = scenario.operations.find(op => op.id === operation_chain.operations[0])?.receipt_description
            const delivery_description = scenario.operations.find(op => op.id === operation_chain.operations.slice(-1).pop())?.delivery_description
            const chain_path = {id: i, path_node_ids: chain_path_node_ids, receipt_description: receipt_description, delivery_description: delivery_description}
            // this might not be totally accurate, but it's an easy way to get started and it's pretty close
            // TODO: this should be calculated in the backend - I'm hacking it (poorly) in the frontend for now
            const receiptMarketId = scenario.operations.find(op => op.id === operation_chain.operations[0])?.receipt_asset_object_id
            const fuelMakeupCost = scenario.markets.find(market => market.id == receiptMarketId)?.price
            
            return(
              <SidebarPath id={i} path={chain_path} key={operation_chain.id} title={`Chain ${i+1}`}>
  
                <div>Profit: ${numberFormatter(operation_chain.profit)}</div>
                <div>Volume: {numberFormatter(operation_chain.delivered_dth)} dth</div>
                <div>Profit / Dth: ${operation_chain.delivered_dth?numberFormatter(operation_chain.profit / operation_chain.delivered_dth,3):'-'}</div>
                {/* <ul className='list-unstyled'> */}
                <table className="w-100">
                  {operation_chain.operations.map(op_id => {
                    const operation = scenario.operations.find(op => op.id === op_id)
                    if(!operation || !operation.contract_id){ return null}
                    // console.log(operation)
                    return (
                      // <li className='d-flex'>
                      //   <span className='float-start'>{operation.receipt_point.tsp_name} {operation.receipt_point.receipt_zone_name}</span> 
                      //   <span className='float-end'>{operation.delivery_point.tsp_name} {operation.delivery_point.delivery_zone_name}</span>
                      //   <span className='float-end'>{operation.transport_priority}</span>
                      // </li>
                      <tr>
                        <td>{operation.receipt_point.tsp_name} {operation.receipt_point.receipt_zone_name}</td> 
                        <td>{operation.delivery_point.tsp_name} {operation.delivery_point.delivery_zone_name}</td>
                        <td>{operation.transport_priority}</td>
                      </tr>
                    )
                  })}
                {/* </ul> */}
                </table>
                <Collapse isOpen={selectedPathId === i}>
                  <ul className='list-group'>
                    {operation_chain.operations.map(op_id => {
                      const operation = scenario.operations.find(op => op.id === op_id)
                      if (operation){
                          // contract id is null if it's an interconnect, hiding them because they add clutter
                        if(!operation.contract_id){ return null}
                        return(
                          <li className='list-group-item'>
                            <Operation operation={operation} fuelMakeupCost={fuelMakeupCost} />
                          </li>
                        )
                      }
                      else {
                        return (<li className='list-group-item'>Operation Problem</li>)
                      }
                    })}
                  </ul>
                  </Collapse>
                </SidebarPath>
              )
            }
          )}
        </ScrollIntoView>

    )}




    <h6>Segment Constraints</h6>
    <div className="h-50 overflow-auto">
      <SegmentConstraints isViewable isNotEditable preSelect={scenario.segment_constraints} />
    </div>
    <hr/>

    <h6>Point Constraints</h6>
    <div className="h-50 overflow-auto">
      <PointConstraints isViewable isNotEditable preSelect={scenario.point_constraints} />
    </div>
    <hr/>

    <h6>Market Prices</h6> 
    <div className="h-50 overflow-auto">
      <Markets isViewable isNotEditable preSelect={scenario.markets} />
    </div>
    <hr/>

    <h6>Trades</h6>
    <div className="h-50 overflow-auto">
      <Trades isViewable isNotEditable preSelect={scenario.trades} />
    </div>
    <hr/>

    <h6>Contracts
        <ToggleContracts className="btn btn-primary-outline m-0 p-0"/>
    </h6>
    <div className="h-50 overflow-auto">
      <ul className="list-group">
        {/* should probably be using the same contract list component everywhere */}
        
        {scenario.contracts.map((contractId) => <li className="list-group-item" key={contractId}><Contract id={contractId} /></li>)}
      </ul>
    </div>
  </>
)
}


const UnflowedGasWarnings = ({scenario}) => {
// reciprocal operations are the ones where unflowed gas is flowed to so we can prevent optimizer errors and give details about the issue
// if there are reciprocal operations, other options of where to flow gas need to be added to the scenario in locations where the gas can flow to, like other market prices, trades, storage, contracts, park and loans, balancing agreements, or a best efforts trade to reduce the amount required to flow
const reciprocalOps = scenario.operations?.filter(op => op.is_reciprocal_op)

if (!reciprocalOps) {return null}

// right now it's telling where the unflowed gas is based on the trade description
// could also use the point name if there's no description

return(
  <ul className='list-group'>
    {reciprocalOps.map(op => (
      <>
      <li className="list-group-item list-group-item-danger">
        {
          `
            ${Math.ceil(op.delivered_dth)}
            dth of 
            ${scenario.trades.find(trade => trade.id == op.receipt_asset_object_id).buy_sell == 'BUY' ? 'unflowed' : 'undelivered'}
            gas at 
            ${scenario.trades.find(trade => trade.id == op.receipt_asset_object_id)['description']} 
          `
        }
        </li>
      </>
    ))}
  </ul>
)
}

const GoToScenario = ({currentId}) => {

const [goTo, setGoTo] = useState(currentId+1)

return (
  <div>
    <span>Go to scenario </span>
    <input type="text" value={goTo} onChange={(evt) => setGoTo(evt.target.value)} />
    <NavLink
      className="btn btn-primary"
      to={`/scenarios/${goTo}`}
    >
    Go
    </NavLink>
  </div>
)
}



const LinkToRates = ({operation}) => {
return (
  <>
    <a className={operation.has_commodity_rate ? '' : 'text-danger'} href={operation.commodity_rate_url} target="_blank">{operation.has_commodity_rate ? 'Update' : 'Add'} Commodity Rate</a>
    <br/>
    <a className={operation.has_fuel_rate ? '' : 'text-danger'} href={operation.fuel_rate_url} target="_blank">{operation.has_fuel_rate ? 'Update' : 'Add'} Fuel Rate</a>
  </>
)
}

const Operation = ({operation, fuelMakeupCost=3}) => {
  // we don't take reservation cost for firm transport into account in these calcs because it's a sunk cost
  const variableCost = parseFloat(operation.transport_cost_per_dth)
  const fuelFactor = parseFloat(operation.fuel_factor)
  const [makeupCost, setMakeupCost] = useState(fuelMakeupCost)
  const [editingFuel, setEditingFuel] = useState(false)
  const fuelCost = makeupCost * (fuelFactor - 1)
  // this is super confusing nomenclature - ask Matt what he would call each part for clarity
  const transportCost = variableCost + fuelCost
  return(
    <ul className='list-unstyled'>
      {/* <li>Profit: ${numberFormatter(operation.total_profit)}</li> */}
        <li>{operation.receipt_description} ({operation.receipt_point.tsp_name} {operation.receipt_point.receipt_zone_name})</li>
        <li>{operation.delivery_description} ({operation.delivery_point.tsp_name} {operation.delivery_point.delivery_zone_name})</li>
        <li>Contract: <a href={`/contracts/${operation.contract_id}`} target="_blank"><ContractName id={operation.contract_id} /></a></li>
        <li>Priority: {operation.transport_priority}</li>
        {/* <li>Transport cost per dth: ${numberFormatter(operation.transport_cost_per_dth, 5)}</li>
        <li>Profit per dth: ${numberFormatter(operation.profit_per_dth, 5)}</li>
        <li>Fuel factor: {operation.fuel_factor.toFixed(3)}</li> */}
        <li>Variable cost: <span className="float-end monospace">${numberFormatter(variableCost, 5)}</span></li>
        {!!editingFuel ? (
          <li>Fuel makeup cost:<input onChange={(evt) => setMakeupCost(evt.target.value)} value={makeupCost} /><button onClick={() => setEditingFuel(false)} className='btn btn-primary'>Save</button></li>
        ):(
          <>
            <li onClick={() => setEditingFuel(true)}>Fuel cost: <u id={`tooltip-${operation.id}`} className="float-end monospace">+ ${numberFormatter(fuelCost, 5)}</u></li>
            <UncontrolledTooltip target={`tooltip-${operation.id}`}>
              <div>{numberFormatter(makeupCost,5)} * {numberFormatter(100 * (fuelFactor-1),2)}%</div>
            </UncontrolledTooltip>
          </>
        )}
        <li>Transport cost: <span className="float-end monospace">${numberFormatter(transportCost, 5)}</span></li>
        <li><LinkToRates operation={operation} /></li>
      </ul>
    )
}