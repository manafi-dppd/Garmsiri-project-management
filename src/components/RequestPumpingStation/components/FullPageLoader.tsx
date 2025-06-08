import * as React from 'react';
import './FullPageLoader.css'; // فایل استایل جداگانه

const FullPageLoader: React.FC = () => {
  return (
    <div className="full-page-loader">
      <div className="loader-spinner">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
      <p className="loader-text">لطفا منتظر بمانید...</p>
    </div>
  );
};

export default FullPageLoader;
