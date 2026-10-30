import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Projects from './Projects';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { publicationItems } from '../../constants/publication-items';
import { patentItems } from '../../constants/patent-items';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { ANCHORS, NAV_BAR } from '../../constants/navbar-items';
import {
  researchAreas,
  researchInterests,
} from '../../constants/research-items';
import { emoryLogoImage } from '../../assets/images/images';
import { EASE, Page, Reveal } from '../common/Motion';
import SocialLinks, {
  GOOGLE_SCHOLAR_URL,
  SOCIALS,
} from '../common/SocialLinks';
import Avatar from '../common/Avatar';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function Section({ navItem, language, title, children }) {
  return (
    <section className="section">
      <Reveal className="section-head">
        <h2 className="section-title">
          {title ||
            getCurrentLanguageText(
              language,
              navItem.title,
              navItem.titleChinese
            )}
        </h2>
        <Link to={navItem.path} className="section-link">
          {getCurrentLanguageText(language, 'View all', '查看全部')}
          <ArrowForwardRoundedIcon fontSize="small" />
        </Link>
      </Reveal>
      {children}
    </section>
  );
}

export default function Home() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  return (
    <Page>
      <section className="hero">
        <motion.div
          className="hero__copy"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="hero__avatar-mobile">
            <Avatar size={96} />
          </motion.div>
          <motion.span variants={item} className="page-eyebrow">
            {t(
              'Ph.D. Student | AI & Healthcare Research',
              '博士研究生 | AI与医疗健康研究'
            )}
          </motion.span>

          <motion.h1 variants={item} className="hero__title">
            {t('Heng (Jimmy) Sun', '孙恒 (Jimmy)')}
          </motion.h1>

          <motion.p variants={item} className="hero__tagline">
            {t(
              'Exploring intelligent systems through machine learning, multimodal data, and real-world healthcare applications.',
              '通过机器学习、多模态数据与真实医疗应用，探索智能系统。'
            )}
          </motion.p>

          <motion.div variants={item} className="hero__intro">
            <p>
              {t(
                "Hi, I'm Heng (Jimmy) Sun, a Ph.D. student in Computer Science at Emory University, advised by Dr. Xiao Hu and co-advised by Dr. Carl Yang.",
                '你好，我是孙恒（Jimmy），埃默里大学计算机科学专业博士生，导师为 Xiao Hu 博士，联合导师为 Carl Yang 博士。'
              )}
            </p>
            <p>
              {t(
                'My research interests lie at the intersection of artificial intelligence, machine learning, and healthcare. I am particularly interested in multimodal learning, foundation models, and intelligent systems that integrate physiological signals, wearable sensing, and clinical data.',
                '我的研究兴趣位于人工智能、机器学习与医疗健康的交叉领域，尤其关注多模态学习、基础模型，以及融合生理信号、可穿戴传感与临床数据的智能系统。'
              )}
            </p>
            <p>
              {t(
                'With a background in software engineering and applied AI, I aim to develop robust and practical machine learning approaches that bridge computational research and real-world healthcare applications.',
                '凭借软件工程与应用AI的背景，我希望开发稳健、实用的机器学习方法，连接计算研究与真实的医疗应用。'
              )}
            </p>
          </motion.div>

          <motion.ul
            variants={item}
            className="hero__tags"
            aria-label={t('Research interests', '研究兴趣')}
          >
            {researchInterests.map(([en, zh]) => (
              <li key={en} className="tag">
                {t(en, zh)}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="hero__actions">
            <Link to={NAV_BAR.research.path} className="btn-brand">
              {t('Explore my research', '了解我的研究')}
              <ArrowForwardRoundedIcon fontSize="small" />
            </Link>
            <Link to={ANCHORS.cv} className="btn-ghost">
              <DescriptionRoundedIcon fontSize="small" />
              {t('View CV', '查看简历')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.aside
          className="profile-card card-surface"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <div className="d-flex flex-column align-items-center">
            <Avatar size={128} className="profile-card__avatar" />
            <div className="profile-card__logo">
              <img src={emoryLogoImage} alt="Emory University" />
            </div>
            <div className="profile-card__brand">
              {t(
                'AI Researcher & Computer Scientist',
                'AI研究者 & 计算机科学家'
              )}
            </div>
            <div className="profile-card__motto">
              {t(
                'Research-driven. Engineering-minded.',
                '以研究为驱动，以工程为根基。'
              )}
            </div>
          </div>
          <dl className="profile-card__facts">
            <div>
              <dt>
                <SchoolRoundedIcon fontSize="inherit" />
                {t('Program', '项目')}
              </dt>
              <dd>
                {t(
                  'Ph.D. in Computer Science, Emory University',
                  '埃默里大学 计算机科学博士'
                )}
              </dd>
            </div>
            <div>
              <dt>{t('Advisors', '导师')}</dt>
              <dd>
                {t(
                  'Dr. Xiao Hu · Dr. Carl Yang (co-advisor)',
                  'Xiao Hu 博士 · Carl Yang 博士（联合导师）'
                )}
              </dd>
            </div>
            <div>
              <dt>
                <PlaceRoundedIcon fontSize="inherit" />
                {t('Location', '所在地')}
              </dt>
              <dd>{t('Atlanta, GA', '佐治亚州亚特兰大')}</dd>
            </div>
          </dl>
          <SocialLinks className="d-flex gap-2 mt-3" />
        </motion.aside>
      </section>

      <Section
        navItem={NAV_BAR.research}
        language={language}
        title={t('Research Highlights', '研究亮点')}
      >
        <div className="card-grid card-grid--3">
          {researchAreas.slice(0, 3).map((area, i) => (
            <Reveal key={area.key} delay={i * 0.06}>
              <div className="card-surface research-card">
                <h3 className="card-title">
                  {t(area.title, area.title_chinese)}
                </h3>
                <p className="card-meta mb-0">
                  {t(area.description, area.description_chinese)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="subsection-title subsection-title--minor">
          {t('Selected Achievements', '代表性成果')}
        </h3>
        <div className="card-grid card-grid--2">
          {publicationItems.slice(0, 1).map((p) => (
            <Reveal key={p.title}>
              <a
                className="box achievement"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                <span className="research-card__icon mb-0" aria-hidden>
                  <MenuBookRoundedIcon fontSize="small" />
                </span>
                <span>
                  <span className="achievement__kicker">
                    {t(
                      "Publication · ACM MobiCom '24",
                      "论文 · ACM MobiCom '24"
                    )}
                  </span>
                  <span className="achievement__title">{p.title}</span>
                </span>
              </a>
            </Reveal>
          ))}
          {patentItems.slice(0, 1).map((p) => (
            <Reveal key={p.title} delay={0.06}>
              <Link className="box achievement" to={ANCHORS.patents}>
                <span className="research-card__icon mb-0" aria-hidden>
                  <GavelRoundedIcon fontSize="small" />
                </span>
                <span>
                  <span className="achievement__kicker">
                    {t(
                      'Patent pending · University of Florida',
                      '专利申请中 · 佛罗里达大学'
                    )}
                  </span>
                  <span className="achievement__title">{p.title}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        navItem={NAV_BAR.projects}
        language={language}
        title={t('Featured Projects', '精选项目')}
      >
        <Projects hideHeader={true} />
      </Section>

      <section className="section">
        <Reveal className="section-head">
          <h2 className="section-title">{t('Quick Links', '快速链接')}</h2>
        </Reveal>
        <div className="quick-links">
          <Link to={ANCHORS.cv} className="box quick-link">
            <DescriptionRoundedIcon fontSize="small" />
            {t('CV', '简历')}
          </Link>
          <a
            href={SOCIALS.find((x) => x.key === 'github').href}
            target="_blank"
            rel="noreferrer"
            className="box quick-link"
          >
            <GitHubIcon fontSize="small" />
            GitHub
          </a>
          {GOOGLE_SCHOLAR_URL && (
            <a
              href={GOOGLE_SCHOLAR_URL}
              target="_blank"
              rel="noreferrer"
              className="box quick-link"
            >
              <SchoolOutlinedIcon fontSize="small" />
              Google Scholar
            </a>
          )}
          <Link to={ANCHORS.contact} className="box quick-link">
            <MailOutlineRoundedIcon fontSize="small" />
            {t('Contact', '联系我')}
          </Link>
        </div>
      </section>
    </Page>
  );
}
