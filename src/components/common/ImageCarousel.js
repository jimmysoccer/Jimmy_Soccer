import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function ImageCarousel({ images }) {
  if (!images) return <div></div>;
  return (
    <Carousel navButtonsAlwaysVisible className='mt-5'>
      {images.map((image, index) => (
        <Paper
          key={`carousel-image-${index}`}
          className='d-flex justify-content-center shadow-none'
          style={{ height: '500px' }}
        >
          <img
            src={image}
            alt='projects_carousel'
            className='img-fluid h-100'
          ></img>
        </Paper>
      ))}
    </Carousel>
  );
}
