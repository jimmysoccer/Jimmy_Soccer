import { useAtomValue } from 'jotai';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { Reveal } from '../common/Motion';
import { SOCIALS } from '../common/SocialLinks';

/** Contact cards (email, LinkedIn, GitHub), rendered on the About page. */
export default function ContactCards() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const labels = {
    github: t('Follow on GitHub', '关注我的GitHub'),
    linkedin: t('Connect on LinkedIn', '关注我的领英'),
    email: t('Send an email', '发送电子邮件'),
    'google-scholar': t('View on Google Scholar', '查看我的谷歌学术'),
  };
  const order = ['email', 'linkedin', 'github', 'google-scholar'];

  return (
    <div className="card-grid card-grid--3">
      {order
        .map((k) => SOCIALS.find((s) => s.key === k))
        .map(({ key, href, handle, Icon }, i) => (
          <Reveal key={key} delay={i * 0.07}>
            <a
              className="box contact-card"
              href={href}
              target={key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
            >
              <span className="contact-card__icon">
                <Icon />
              </span>
              <span className="contact-card__text">
                <span className="contact-card__label">{labels[key]}</span>
                <span className="contact-card__handle">{handle}</span>
              </span>
              <ArrowOutwardRoundedIcon
                className="contact-card__arrow"
                fontSize="small"
              />
            </a>
          </Reveal>
        ))}
    </div>
  );
}
