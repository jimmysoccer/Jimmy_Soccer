import { techStack } from '../../constants/tech-stack';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  cPlusPlusImage,
  cSharpImage,
  djangoImage,
  figmaImage,
  googleMapImage,
  jsImage,
  mongoDBImage,
  nodeJSImage,
  openAIImage,
  phpImage,
  pythonImage,
  reactImage,
  sqlImage,
  threeDJSImage,
  wechatImage,
} from '../../assets/images/images';
import '../../assets/styles/style.css';

export default function TechStackIcon({ stack }) {
  switch (stack) {
    case techStack.js:
      return <img src={jsImage} alt='js' className='project-logo'></img>;
    case techStack.react:
      return <img src={reactImage} alt='react' className='project-logo'></img>;
    case techStack.python:
      return (
        <img src={pythonImage} alt='python' className='project-logo'></img>
      );
    case techStack.mongoDB:
      return (
        <img src={mongoDBImage} alt='mongoDB' className='project-logo'></img>
      );
    case techStack.cSharp:
      return <img src={cSharpImage} alt='c#' className='project-logo'></img>;
    case techStack.cPlusPlus:
      return (
        <img src={cPlusPlusImage} alt='c++' className='project-logo'></img>
      );
    case techStack.figma:
      return <img src={figmaImage} alt='figma' className='project-logo'></img>;
    case techStack.googleMap:
      return (
        <img
          src={googleMapImage}
          alt='google map'
          className='project-logo'
        ></img>
      );
    case techStack.sql:
      return <img src={sqlImage} alt='sql' className='project-logo'></img>;
    case techStack.php:
      return <img src={phpImage} alt='php' className='project-logo'></img>;
    case techStack.threeDJS:
      return (
        <img src={threeDJSImage} alt='3d js' className='project-logo'></img>
      );
    case techStack.dJango:
      return (
        <img src={djangoImage} alt='django' className='project-logo'></img>
      );
    case techStack.nodeJS:
      return (
        <img src={nodeJSImage} alt='node js' className='project-logo'></img>
      );
    case techStack.wechat:
      return (
        <img src={wechatImage} alt='wechat' className='project-logo'></img>
      );
    case techStack.openAI:
      return (
        <img src={openAIImage} alt='openAI' className='project-logo'></img>
      );
    default:
      return (
        <QuestionMarkIcon
          className='project-logo'
          style={{ width: '50px', height: '50px', backgroundColor: 'gray' }}
          color='action'
        >
          {' '}
        </QuestionMarkIcon>
      );
  }
}
