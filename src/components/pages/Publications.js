import { NAV_BAR } from '../../constants/navbar-items';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';
import { publicationItems } from '../../constants/publication-items';
import Masonry from '@mui/lab/Masonry';
import Publication from '../common/Publication';

export default function Publications({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);

  useEffect(() => {
    if (!hideHeader)
      document.title = `Jimmy | ${getCurrentLanguageText(
        language,
        NAV_BAR.publications.title,
        NAV_BAR.publications.titleChinese
      )}`;
  }, [hideHeader, language]);

  return (
    <motion.div
      className='container'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!hideHeader && (
        <div className='px-3'>
          <h1 className='text-left w-50 mt-5'>
            {getCurrentLanguageText(
              language,
              `My Research & Publications`,
              '我的研究与刊物'
            )}
          </h1>
          <p className='fs-5 text-secondary'>
            {getCurrentLanguageText(
              language,
              `Explore my published research and contributions in CS & BME, 
              showcasing the insights and innovations that drive my work.`,
              `探索我在CS & BME的已发表研究和贡献, 展示推动我工作的见解与创新。`
            )}
          </p>
        </div>
      )}
      <div className={`${hideHeader ? '' : 'px-3'}`}>
        {!hideHeader && <h2>Conference Papers</h2>}
        <Masonry columns={1} spacing={2} className='container'>
          {publicationItems.map((p) => {
            return <Publication publication={p}></Publication>;
          })}
        </Masonry>
      </div>
      {/* <div className='px-3'>{!hideHeader && <h2>Journal Papers</h2>}</div> */}
    </motion.div>
  );
}
