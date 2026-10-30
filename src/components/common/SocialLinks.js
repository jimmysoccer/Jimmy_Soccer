import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';

/**
 * Google Scholar profile URL. Leave empty until the profile exists —
 * links to it are hidden while this is empty.
 */
export const GOOGLE_SCHOLAR_URL =
  'https://scholar.google.com/citations?user=j1FQc6gAAAAJ&hl=en';

export const SOCIALS = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/jimmysoccer',
    handle: 'github.com/jimmysoccer',
    Icon: GitHubIcon,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jimmysoccer/',
    handle: 'linkedin.com/in/jimmysoccer',
    Icon: LinkedInIcon,
  },
  {
    key: 'email',
    label: 'Email',
    href: 'mailto:jimmysoccer.sun@gmail.com',
    handle: 'jimmysoccer.sun@gmail.com',
    Icon: EmailRoundedIcon,
  },
  {
    key: 'google-scholar',
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=j1FQc6gAAAAJ&hl=en',
    handle: 'scholar.google.com/citations?user=j1FQc6gAAAAJ&hl=en',
    Icon: SchoolIcon,
  },
];

export default function SocialLinks({ className = 'site-footer__socials' }) {
  return (
    <div className={className}>
      {SOCIALS.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          className="icon-btn"
          aria-label={label}
          title={label}
          target={key === 'email' ? undefined : '_blank'}
          rel="noreferrer"
        >
          <Icon fontSize="small" />
        </a>
      ))}
    </div>
  );
}
