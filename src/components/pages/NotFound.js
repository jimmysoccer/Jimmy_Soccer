import { Link } from 'react-router-dom';
import { NAV_BAR } from '../../constants/navbar-items';
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
      <h1>Oops! This page is not found</h1>
      <button className='btn btn-primary m-5'>
        <Link
          className='text-white text-decoration-none'
          to={NAV_BAR.home.path}
        >
          Go Back To Home
        </Link>
      </button>
    </div>
  );
}
