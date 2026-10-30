import { useState } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { Page, PageHeader, Reveal } from "../common/Motion";
import "../../assets/styles/playground.css";

const COLORS = Array.from(
  { length: 16 },
  (_, i) => `hsl(${Math.round((360 / 16) * i)}, 70%, 55%)`,
);

/** Experiment 1: shared-layout transitions (moved from the old Innovation Hub). */
function ColorGallery() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="pg-gallery">
      <ul className="pg-gallery__grid">
        {COLORS.map((color) => (
          <motion.li
            key={color}
            layoutId={color}
            className="pg-gallery__item"
            style={{ backgroundColor: color }}
            onClick={() => setSelected(color)}
            role="button"
            tabIndex={0}
            aria-label={`Expand ${color}`}
            onKeyDown={(e) => e.key === "Enter" && setSelected(color)}
          />
        ))}
      </ul>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="pg-gallery__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={selected}
              className="pg-gallery__single"
              style={{ backgroundColor: selected }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Experiment 2: spring physics with drag constraints. */
function SpringDrag() {
  const [area, setArea] = useState(null);
  return (
    <div className="pg-drag" ref={setArea}>
      <motion.div
        className="pg-drag__ball"
        drag
        dragConstraints={area ? { current: area } : undefined}
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 18 }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
      />
    </div>
  );
}

const EXPERIMENTS = [
  {
    key: "gallery",
    en: "Shared-Layout Gallery",
    zh: "共享布局画廊",
    den: "Click a tile to expand it with a shared-layout animation; click again to return.",
    dzh: "点击色块，以共享布局动画展开；再次点击返回。",
    tags: ["Framer Motion", "UI Animation"],
    Demo: ColorGallery,
  },
  {
    key: "drag",
    en: "Spring Physics",
    zh: "弹簧物理",
    den: "Drag the ball around; it is held by elastic constraints and springs back.",
    dzh: "拖动小球，它受弹性约束并会弹回。",
    tags: ["Interaction", "Physics"],
    Demo: SpringDrag,
  },
];

export default function Playground() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  return (
    <Page>
      <PageHeader
        eyebrow={t("Playground", "游乐场")}
        title={t("Creative Experiments", "创意实验")}
        lead={t(
          "A creative space for exploring new technologies, interactive experiences, and experimental ideas.",
          "一个探索新技术、交互体验与实验性想法的创意空间。",
        )}
      />
      <p className="card-meta px-3 mb-4" style={{ maxWidth: 720 }}>
        {t(
          "These are small, informal experiments in UI, animation, graphics, and AI demos — separate from my academic research projects.",
          "这里是关于界面、动画、图形与AI演示的小型非正式实验，与我的学术研究项目相互独立。",
        )}
      </p>

      <div className="card-grid card-grid--2">
        {EXPERIMENTS.map(({ key, en, zh, den, dzh, tags, Demo }, i) => (
          <Reveal key={key} delay={i * 0.06}>
            <article className="card-surface pg-card">
              <div className="pg-card__stage">
                <Demo />
              </div>
              <div className="pg-card__body">
                <h2 className="card-title">{t(en, zh)}</h2>
                <p className="card-meta mb-2">{t(den, dzh)}</p>
                <div className="d-flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span key={tag} className="tag tag--sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <article className="card-surface pg-card pg-card--soon">
            <ScienceRoundedIcon />
            <h2 className="card-title mt-2">
              {t("More experiments soon", "更多实验即将上线")}
            </h2>
            <p className="card-meta mb-0">
              {t(
                "3D graphics, AI demos, and other web experiments will be added here over time.",
                "3D 图形、AI 演示及其他 Web 实验将陆续加入。",
              )}
            </p>
          </article>
        </Reveal>
      </div>
    </Page>
  );
}
