import { techStack } from '../../const/techStack';
import JavascriptIcon from '@mui/icons-material/Javascript';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function TechStackIcon({ stack }) {
  switch (stack) {
    case techStack.js:
      return (
        <JavascriptIcon
          className='project-logo'
          color='action'
          sx={{ fontSize: 50, backgroundColor: 'yellow' }}
        ></JavascriptIcon>
      );
    default:
      return (
        <QuestionMarkIcon
          className='project-logo'
          style={{ width: '50px', height: '50px', backgroundColor: 'gray' }}
          color='action'
        >
          {' '}
        </QuestionMarkIcon>
      );
  }
}
