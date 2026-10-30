import { publicationItems } from "../../constants/publication-items";
import { patentItems } from "../../constants/patent-items";
import Publication from "../common/Publication";
import Patent from "../common/Patent";
import { Reveal } from "../common/Motion";

export function PublicationList() {
  return (
    <div className="stack">
      {publicationItems.map((p, i) => (
        <Reveal key={`publication-${p.link || p.title}`} delay={i * 0.06}>
          <Publication publication={p} />
        </Reveal>
      ))}
    </div>
  );
}

export function PatentList() {
  return (
    <div className="stack">
      {patentItems.map((p, i) => (
        <Reveal key={`patent-${p.title}`} delay={i * 0.06}>
          <Patent patent={p} />
        </Reveal>
      ))}
    </div>
  );
}

export { publicationItems, patentItems };
