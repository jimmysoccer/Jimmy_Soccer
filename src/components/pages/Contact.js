import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';

export default function Contact() {
  const language = useAtomValue(languageAtom);
  return (
    <motion.div
      className='container'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='px-3'>
        <h1 className='text-left w-50 mt-5'>
          {getCurrentLanguageText(
            language,
            `Let's Get in Touch: Ways to Connect with Me`,
            '让我们保持联系'
          )}
        </h1>
        <p className='fs-5 text-secondary'>
          {getCurrentLanguageText(
            language,
            `Thank you for your interest in getting in touch with me. I welcome your
        feedback, questions, and suggestions. If you have a specific question or
        comment, please feel free to email me. I make an effort to respond to
        all messages within 24 hours, although it may take me longer during busy
        periods. Thanks again for your interest, and I look forward to hearing
        from you!`,
            `感谢您对与我取得联系感兴趣。我欢迎您的反馈、问题和建议。
          如果您有具体的问题或评论，请随时通过电子邮件与我联系。
          我会尽力在24小时内回复所有消息, 尽管在繁忙时期可能需要更长的时间。
          再次感谢您的关注，期待收到您的来信！`
          )}
        </p>
      </div>

      <div className='text-secondary flex-column justify-content-center'>
        <div className='d-flex justify-content-center my-2'>
          <div
            className='d-flex'
            role='button'
            onClick={() => window.open('https://github.com/jimmysoccer')}
          >
            <GitHubIcon className='mx-2'></GitHubIcon>
            <div className='language'>
              {getCurrentLanguageText(
                language,
                'Follow on Github',
                '关注我的Github'
              )}
            </div>
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
            <div className='language'>
              {getCurrentLanguageText(
                language,
                'Follow on LinkedIn',
                '关注我的领英'
              )}
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center my-2'>
          <div
            className='d-flex'
            role='button'
            onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
          >
            <EmailIcon className='mx-2'></EmailIcon>
            <div className='language'>
              {getCurrentLanguageText(language, 'Email', '电子邮箱')}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
