import { Grid, Button, Box } from '@mui/material';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import cvPdf from '../../assets/documents/HENG_SUN_CV.pdf';

export default function CV() {
  const language = useAtomValue(languageAtom);

  // CV PDF imported from assets/documents
  const cvPath = cvPdf;
  // Add zoom parameter for 100% default zoom in viewer
  const cvPathWithZoom = `${cvPath}#zoom=100`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className='container'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container className='mt-3 justify-content-center px-2' spacing={2}>
        <Grid item xs={12}>
          <Box className='text-center mb-3'>
            <PictureAsPdfIcon sx={{ fontSize: 50, color: '#14b8a6', mb: 1 }} />
            <h2 className='fw-bold mb-2'>
              {getCurrentLanguageText(language, 'Curriculum Vitae', '个人简历')}
            </h2>
            <p className='text-secondary fs-6 mb-2'>
              {getCurrentLanguageText(
                language,
                'View or download my CV below.',
                '您可以在下方查看或下载我的简历。'
              )}
            </p>
            <Button
              variant='contained'
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                backgroundColor: '#14b8a6',
                '&:hover': {
                  backgroundColor: '#0d9488',
                },
                mb: 2,
              }}
            >
              {getCurrentLanguageText(language, 'Download CV', '下载简历')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              height: '90vh',
              minHeight: '600px',
              border: '2px solid #e0e0e0',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f5f5f5',
            }}
          >
            <iframe
              src={cvPathWithZoom}
              title='CV'
              width='100%'
              height='100%'
              style={{ border: 'none' }}
            />
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
}
