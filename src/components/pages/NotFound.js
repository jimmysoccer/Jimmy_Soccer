import not_found_animation from '../../assets/animations/404.json';
import Lottie from 'lottie-react';
import { useMediaQuery } from '@mui/material';

export default function NotFound() {
  const isMobileMatch = useMediaQuery('(max-width:600px)');
  return (
    <div className='m-5 text-center'>
      <div className={`container w-${isMobileMatch ? '100' : '50'}`}>
        <Lottie animationData={not_found_animation}></Lottie>
      </div>
    </div>
  );
}
