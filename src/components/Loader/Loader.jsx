import React from 'react';
import './Loader.css';
import loaderImg from '../../images/loader.gif';

function Loader() {
  return (
    <div className="loader">
      <div className="spinner">
      </div>
      <img src={loaderImg} alt="" /> 
    </div>
  );
}

export default Loader;
