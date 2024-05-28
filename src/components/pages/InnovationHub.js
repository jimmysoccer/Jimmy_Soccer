import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
export default function InnovationHub() {
  const language = useAtomValue(languageAtom);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('http://111.229.172.53/api/dev/get_all_records')
      .then((res) => {
        const data = res?.data;
        setRecords(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <div className='container my-5 text-center'>
      <h1 className='text-success'>
        {getCurrentLanguageText(language, 'Innovation Hub', '创新Hub')}
      </h1>
      <h3 className='text-success opacity-50'>
        {getCurrentLanguageText(
          language,
          `Discover groundbreaking designs and state-of-the-art tech solutions that
          redefine the digital experience, showcasing the limitless possibilities
          of innovation.`,
          `发现开创性的设计和前沿技术解决方案，
          重新定义数字体验，
          展示创新的无限可能性。`
        )}
      </h3>
      {records.length !== 0
        ? records.map((record) => <div>{record?.first_name}</div>)
        : 'No Users'}
    </div>
  );
}
