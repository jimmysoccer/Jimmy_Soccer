import { useState } from 'react';
import Lightbox from '../common/Lightbox';
import { useAtomValue } from 'jotai';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import DownhillSkiingRoundedIcon from '@mui/icons-material/DownhillSkiingRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import PhotoCameraBackRoundedIcon from '@mui/icons-material/PhotoCameraBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { languageAtom } from '../../atoms/primitive.atom';
import { LANGUAGE } from '../../constants/navbar-items';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { funFacts, gallery, hobbies } from '../../constants/about-items';
import { Page, PageHeader, Reveal } from '../common/Motion';
import Avatar from '../common/Avatar';
import ContactCards from './Contact';

const HOBBY_ICONS = {
  soccer: SportsSoccerRoundedIcon,
  realmadrid: EmojiEventsRoundedIcon,
  skiing: DownhillSkiingRoundedIcon,
  travel: FlightTakeoffRoundedIcon,
  tech: MemoryRoundedIcon,
};

/** Small photo for a hobby; falls back to the icon if the photo is missing. */
function HobbyThumb({ src, Icon, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span className="hobby-thumb hobby-thumb--icon" aria-hidden>
        <Icon />
      </span>
    );
  }
  return (
    <img
      className="hobby-thumb"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Block({ id, title, children, style = {} }) {
  return (
    <section id={id} className="section about-block" style={style}>
      <Reveal className="section-head">
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default function About() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const zh = language === LANGUAGE.chinese.value;

  const intro = zh
    ? [
        `嗨，我是 Jimmy！在研究之余，我喜欢踢足球，并为皇家马德里队加油。足球是我生活中重要的一部分，也是“jimmysoccer”的灵感来源。`,
        `我还喜欢滑雪、旅行和亲近大自然。我曾参观过许多国家公园，总是期待探索新的徒步路线，欣赏美丽的风景，或品尝当地美食。在冬季，你经常会看到我期待下一次滑雪的日子。`,
        `在安静的时光里，我是大耳狗的忠实粉丝。我也喜欢通过小型副项目来构建事物和学习新技术——这个网站就是其中之一。如果你也有这些兴趣，我很乐意与你交流！`,
      ]
    : [
        `Hi, I'm Jimmy! Outside of research, I love playing soccer and cheering on Real Madrid. Soccer is a big part of my life — and the inspiration behind "jimmysoccer."`,
        `I also enjoy skiing, traveling, and spending time in nature. I've visited many national parks and am always excited to explore a new trail, take in a beautiful landscape, or try local food along the way. In winter, you'll often find me looking forward to my next day on the slopes.`,
        `On the quieter side, I'm a big fan of Cinnamoroll. I also enjoy building things and learning new technologies through small side projects — this website is one of them. If you share any of these interests, I'd love to chat!`,
      ];

  const [lightbox, setLightbox] = useState(null);
  const tiles = gallery.length
    ? gallery
    : Array.from({ length: 6 }, (_, i) => ({ placeholder: true, key: i }));

  return (
    <Page>
      <div className="about-hero">
        <PageHeader
          eyebrow={t('About', '关于')}
          title={t('Beyond the Code', '代码之外')}
        >
          <div className="page-lead mt-3">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </PageHeader>
        <Reveal className="about-hero__avatar">
          <Avatar size={220} />
        </Reveal>
      </div>

      <Block
        id="interests"
        title={t('Interests & Hobbies', '兴趣爱好')}
        style={{ 'margin-top': '0' }}
      >
        <div className="hobby-grid">
          {hobbies.map((h, i) => {
            const Icon = HOBBY_ICONS[h.key] || AutoAwesomeRoundedIcon;
            return (
              <Reveal key={h.key} delay={(i % 5) * 0.05}>
                <div className="card-surface hobby-card">
                  <HobbyThumb src={h.image} Icon={Icon} alt={t(h.en, h.zh)} />
                  <h3 className="card-title">{t(h.en, h.zh)}</h3>
                  <p className="card-meta mb-0">{t(h.den, h.dzh)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Block>

      <Block id="gallery" title={t('Personal Gallery', '生活相册')}>
        <div className="gallery-grid">
          {tiles.map((g, i) =>
            g.placeholder ? (
              <div
                key={g.key}
                className="gallery-tile gallery-tile--empty"
                aria-hidden
              >
                <PhotoCameraBackRoundedIcon />
              </div>
            ) : (
              <Reveal key={g.src} delay={(i % 3) * 0.05}>
                <button
                  type="button"
                  className="gallery-tile gallery-tile--button"
                  onClick={() => setLightbox(i)}
                  aria-label={
                    t(g.caption, g.caption_chinese) ||
                    t('Open photo', '查看照片')
                  }
                >
                  <img
                    src={g.src}
                    alt={t(g.caption, g.caption_chinese) || ''}
                    loading="lazy"
                  />
                  {g.caption && (
                    <span className="gallery-tile__caption">
                      {t(g.caption, g.caption_chinese)}
                    </span>
                  )}
                </button>
              </Reveal>
            )
          )}
        </div>
        <Lightbox
          items={gallery.map((g) => ({
            src: g.src,
            caption: t(g.caption, g.caption_chinese),
          }))}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={setLightbox}
        />
        {!gallery.length && (
          <p className="card-meta px-3 mt-3 mb-0">
            {t(
              'Photos from travels and memorable moments are coming soon.',
              '旅行与难忘瞬间的照片即将上线。'
            )}
          </p>
        )}
      </Block>

      <Block id="fun-facts" title={t('Fun Facts', '趣味小事')}>
        <div className="card-grid card-grid--2">
          {funFacts.map((f, i) => (
            <Reveal key={f.en} delay={(i % 2) * 0.05}>
              <div className="card-surface fact-card">
                <span className="fact-card__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{t(f.en, f.zh)}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block id="contact" title={t('Contact & Socials', '联系方式')}>
        <p className="page-lead px-3 mb-4" style={{ maxWidth: 760 }}>
          {t(
            "I'm always interested in connecting with researchers, developers, and collaborators working on artificial intelligence, machine learning, and interdisciplinary applications. Feel free to reach out to discuss research, projects, or potential collaborations.",
            '我很乐意与从事人工智能、机器学习及跨学科应用的研究者、开发者和合作者交流。欢迎联系我，探讨研究、项目或潜在的合作。'
          )}
        </p>
        <ContactCards />
      </Block>
    </Page>
  );
}
