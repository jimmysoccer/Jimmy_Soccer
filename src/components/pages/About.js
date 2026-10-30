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

function Block({ id, title, children }) {
  return (
    <section id={id} className="section about-block">
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
        '嗨，我是 Jimmy！工作之外的我，大部分时间都和足球有关——不是在球场上踢球，就是在看皇马的比赛。',
        '我喜欢到处走走：去新的城市、尝当地的美食，冬天有机会就去滑雪。旅行总能带给我新的视角和灵感。',
        '我也一直喜欢动手做东西，经常拿新技术做些小项目，这个网站就是其中之一。如果你也喜欢足球、旅行或者科技，欢迎来聊聊！',
      ]
    : [
        "Hi, I'm Jimmy! When I'm not working, there's a good chance I'm thinking about soccer — either playing it or watching Real Madrid.",
        'I love getting out and exploring: new cities, local food, and, when winter comes around, a day on the slopes. Travel keeps giving me fresh perspectives and ideas.',
        "I've also always enjoyed making things, and I often pick up new technologies through small side projects — this website is one of them. If you're into soccer, travel, or tech, I'd love to chat.",
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
          <div className="about-prose mt-3">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </PageHeader>
        <Reveal className="about-hero__avatar">
          <Avatar size={220} />
        </Reveal>
      </div>

      <Block id="interests" title={t('Interests & Hobbies', '兴趣爱好')}>
        <div className="hobby-grid">
          {hobbies.map((h, i) => {
            const Icon = HOBBY_ICONS[h.key] || AutoAwesomeRoundedIcon;
            return (
              <Reveal key={h.key} delay={(i % 5) * 0.05}>
                <div className="card-surface hobby-card">
                  <span className="research-card__icon" aria-hidden>
                    <Icon fontSize="small" />
                  </span>
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
                    t(g.caption, g.caption_chinese) || t('Open photo', '查看照片')
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
