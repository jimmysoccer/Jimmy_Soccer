import React from 'react';

const Publication = ({ publication }) => {
  return (
    <div
      key={`publication-${publication?.link}`}
      className='box shadow p-3 rounded m-2'
      onClick={() => window.open(publication.link)}
      title='click to see paper'
    >
      <div className='fs-5 fw-bold text-black'>{publication.title}</div>
      <ul>
        <li>
          <div>
            {publication.authors.map((name, index) => {
              let prefix = ', ';
              if (index === 0) prefix = '';
              return (
                <>
                  <span>{prefix}</span>
                  <span
                    className={`${name.includes('Heng Sun') ? 'fw-bold' : ''}`}
                  >
                    {name}
                  </span>
                </>
              );
            })}
          </div>
        </li>
        <li>
          <div className='fst-italic'>
            {publication.conference + publication.journal}
          </div>
        </li>
        <li>
          <div>{`${publication.date}, ${publication.place}`}</div>
        </li>
      </ul>
    </div>
  );
};

export default Publication;
