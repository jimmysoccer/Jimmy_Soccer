import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Contact() {
  return (
    <div className='container'>
      <h1 className='text-left w-50 mt-5'>
        Let's Get in Touch: Ways to Connect with Me
      </h1>
      <p className='fs-5 text-secondary'>
        Thank you for your interest in getting in touch with me. I welcome your
        feedback, questions, and suggestions. If you have a specific question or
        comment, please feel free to email me. I make an effort to respond to
        all messages within 24 hours, although it may take me longer during busy
        periods. Thanks again for your interest, and I look forward to hearing
        from you!
      </p>

      <div className='text-secondary flex-column justify-content-center'>
        <div className='d-flex justify-content-center my-2'>
          <div
            className='d-flex'
            role='button'
            onClick={() => window.open('https://github.com/jimmysoccer')}
          >
            <GitHubIcon className='mx-2'></GitHubIcon>
            <div>Follow on GitHub</div>
          </div>
        </div>
        <div className='d-flex justify-content-center my-2'>
          <div
            className='d-flex'
            role='button'
            onClick={() =>
              window.open('https://www.linkedin.com/in/jimmysoccer/')
            }
          >
            <LinkedInIcon className='mx-2'></LinkedInIcon>
            <div>Follow on LinkedIn</div>
          </div>
        </div>
        <div className='d-flex justify-content-center my-2'>
          <div
            className='d-flex'
            role='button'
            onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
          >
            <EmailIcon className='mx-2'></EmailIcon>
            <div>Email</div>
          </div>
        </div>
      </div>
    </div>
  );
}
