import React from 'react';
import './Loader.css';

const Loader = () => {
  return <div className='loaderCtn'>
    <p className='loaderText'>Uploading...</p>
    <div className='loaderLine'></div>
  </div>;
};

export default Loader;
