import { NAV_BAR } from '../../constants/navbar-items';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';
import { publicationItems } from '../../constants/publication-items';

export default function Publications({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);

  useEffect(() => {
    if (!hideHeader)
      document.title = `Jimmy | ${getCurrentLanguageText(
        language,
        NAV_BAR.projects.title,
        NAV_BAR.projects.titleChinese
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
      <div className='px-3'>
        <h2>Conference Papers</h2>
        {publicationItems.map((p) => (
          <div></div>
        ))}
      </div>
      <div className='px-3'>
        <h2>Journal Papers</h2>
      </div>
    </motion.div>
  );
}
