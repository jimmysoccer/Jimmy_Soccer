import { useCallback, useEffect, useRef } from 'react';
import { Modal, IconButton, Fade } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

/**
 * Full-screen photo viewer.
 * - Click outside / Esc / × to close
 * - ← → keys, on-screen arrows, or swipe to navigate
 *
 * items: [{ src, caption }]; index: number | null (null = closed)
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null && index >= 0 && index < items.length;
  const count = items.length;
  const touchX = useRef(null);

  const go = useCallback(
    (delta) => {
      if (!open || count < 2) return;
      onChange((index + delta + count) % count);
    },
    [open, count, index, onChange]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Preload neighbours so navigation feels instant.
  useEffect(() => {
    if (!open || count < 2) return;
    [index - 1, index + 1].forEach((i) => {
      const img = new Image();
      img.src = items[(i + count) % count].src;
    });
  }, [open, index, count, items]);

  const item = open ? items[index] : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 250,
          sx: {
            backgroundColor: 'rgba(10, 14, 24, 0.88)',
            backdropFilter: 'blur(6px)',
          },
        },
      }}
    >
      <Fade in={open} timeout={250}>
        <div
          className="lightbox"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          role="dialog"
          aria-modal="true"
          aria-label={item?.caption || 'Photo'}
        >
          <IconButton
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseRoundedIcon />
          </IconButton>

          {count > 1 && (
            <IconButton
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeftRoundedIcon fontSize="large" />
            </IconButton>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {item && (
              <motion.figure
                key={item.src}
                className="lightbox__figure"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <img src={item.src} alt={item.caption || ''} />
                {(item.caption || count > 1) && (
                  <figcaption>
                    <span>{item.caption}</span>
                    {count > 1 && (
                      <span className="lightbox__count">
                        {index + 1} / {count}
                      </span>
                    )}
                  </figcaption>
                )}
              </motion.figure>
            )}
          </AnimatePresence>

          {count > 1 && (
            <IconButton
              className="lightbox__nav lightbox__nav--next"
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              <ChevronRightRoundedIcon fontSize="large" />
            </IconButton>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
