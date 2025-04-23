import { Box, Dialog, DialogContent, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';

export default function ImageCarousel({ images }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('currentIndex', currentIndex);
  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images) return <div></div>;
  return (
    <>
      <Carousel navButtonsAlwaysVisible className='mt-5'>
        {images.map((image, index) => (
          <Paper
            key={`carousel-image-${index}`}
            className='d-flex justify-content-center shadow-none'
            style={{ height: '500px' }}
            onClick={() => handleOpen(index)}
          >
            <img
              src={image}
              alt='projects_carousel'
              className='img-fluid h-100'
              style={{ cursor: 'pointer' }}
            ></img>
          </Paper>
        ))}
      </Carousel>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
            }}
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              zIndex: 1,
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <img
            src={images[currentIndex]}
            alt={`img-${currentIndex}`}
            style={{
              display: 'block',
              minHeight: '500px',
              width: '100%',
            }}
          />

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              zIndex: 1,
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
            }}
          >
            <ArrowForwardIos />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              py: 2,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? 'black' : 'gray',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
