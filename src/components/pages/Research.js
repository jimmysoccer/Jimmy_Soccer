import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import WatchRoundedIcon from '@mui/icons-material/WatchRounded';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { LANGUAGE } from '../../constants/navbar-items';
import { currentResearch, researchAreas } from '../../constants/research-items';
import { educationExperience } from '../../constants/education-items';
import {
  UFImage,
  aquinasImage,
  emoryLogoImage,
} from '../../assets/images/images';
import { Page, PageHeader, Reveal } from '../common/Motion';
import ExperienceSection from './Works';
import {
  PatentList,
  PublicationList,
  patentItems,
  publicationItems,
} from './Publications';
import CvSection from './CV';

const ICONS = {
  multimodal: HubRoundedIcon,
  foundation: ModelTrainingRoundedIcon,
  timeseries: MonitorHeartRoundedIcon,
  healthcare: LocalHospitalRoundedIcon,
  wearable: WatchRoundedIcon,
};

const SECTIONS = [
  { id: 'education', en: 'Education', zh: '教育' },
  { id: 'interests', en: 'Interests', zh: '研究兴趣' },
  { id: 'current', en: 'Current Research', zh: '当前研究' },
  { id: 'experience', en: 'Experience', zh: '科研经历' },
  { id: 'publications', en: 'Publications', zh: '论文' },
  { id: 'patents', en: 'Patents', zh: '专利' },
  { id: 'cv', en: 'CV', zh: '简历' },
];

const UNIVERSITY_LOGOS = {
  'Emory University': emoryLogoImage,
  'University of Florida': UFImage,
  'Aquinas High School': aquinasImage,
};

function Block({ id, title, count, children }) {
  return (
    <section id={id} className="research-block">
      <h2 className="subsection-title">
        {title}
        {count != null && <span className="count">{count}</span>}
      </h2>
      {children}
    </section>
  );
}

/** Highlights the sub-nav item for the section currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || !els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function Research() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const zh = language === LANGUAGE.chinese.value;
  const active = useActiveSection(SECTION_IDS);
  const universities = educationExperience.filter(
    (e) => UNIVERSITY_LOGOS[e.school]
  );

  return (
    <Page>
      <PageHeader
        eyebrow={t('Research', '研究')}
        title={t('Research & Exploration', '研究与探索')}
        lead={t(
          'I am interested in machine learning methods that remain reliable on complex, real-world data — especially the multimodal and time-series data that arise in healthcare.',
          '我关注在复杂真实数据上依然可靠的机器学习方法，尤其是医疗场景中产生的多模态与时间序列数据。'
        )}
      />

      <nav
        className="research-subnav"
        aria-label={t('On this page', '本页目录')}
      >
        {SECTIONS.map((s) => (
          <Link
            key={s.id}
            to={`#${s.id}`}
            className={`research-subnav__link ${active === s.id ? 'is-active' : ''}`}
          >
            {t(s.en, s.zh)}
          </Link>
        ))}
      </nav>

      <Block id="education" title={t('Education', '教育经历')}>
        <div className="card-grid card-grid--2">
          {universities.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <div className="card-surface edu-card h-100">
                <div className="edu-card__logo">
                  <img
                    src={UNIVERSITY_LOGOS[e.school]}
                    alt={e.school}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="card-meta mb-1">
                    {t(e.time, e.time_chinese)}
                  </div>
                  <h3 className="card-title fs-5">
                    {t(e.degree, e.degree_chinese)}
                  </h3>
                  <div className="work-card__role">
                    {t(e.school, e.school_chinese)}
                  </div>
                  <div className="card-meta">
                    {t(e.location, e.location_chinese)}
                  </div>
                  {e.advisor && (
                    <div className="mt-2 fw-semibold small">
                      {t(e.advisor, e.advisor_chinese)}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block id="interests" title={t('Research Interests', '研究兴趣')}>
        <div className="card-grid card-grid--3">
          {researchAreas.map((area, i) => {
            const Icon = ICONS[area.key];
            return (
              <Reveal key={area.key} delay={(i % 3) * 0.06}>
                <article className="card-surface research-card">
                  <span className="research-card__icon" aria-hidden>
                    <Icon fontSize="small" />
                  </span>
                  <h3 className="card-title">
                    {t(area.title, area.title_chinese)}
                  </h3>
                  <p className="card-meta mb-0">
                    {t(area.description, area.description_chinese)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Block>

      <Block
        id="current"
        title={t(currentResearch.title, currentResearch.title_chinese)}
      >
        <Reveal className="px-3">
          <div className="card-surface detail__body">
            <ul className="mb-0">
              {(zh
                ? currentResearch.points_chinese
                : currentResearch.points
              ).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="card-meta mt-3 mb-0">
              {t(
                'This work is ongoing; details will be shared here as results are published.',
                '相关工作仍在进行中，研究成果发表后将在此更新。'
              )}
            </p>
          </div>
        </Reveal>
      </Block>

      <Block id="experience" title={t('Research Experience', '科研经历')}>
        <ExperienceSection />
      </Block>

      <Block
        id="publications"
        title={t('Publications', '论文')}
        count={publicationItems.length}
      >
        <PublicationList />
      </Block>

      <Block
        id="patents"
        title={t('Patents', '专利')}
        count={patentItems.length}
      >
        <PatentList />
      </Block>

      <Block id="cv" title={t('Curriculum Vitae', '个人简历')}>
        <CvSection />
      </Block>
    </Page>
  );
}
