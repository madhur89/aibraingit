import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, Box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2 mh7'>
        		<img className='mh6 ph4' id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        	<div className='bounding-box mh6 ph4' style={{top: Box.topRow, right: Box.rightCol, bottom: Box.bottomRow, left: Box.leftCol}}></div>
      </div>
    </div>
  );
}


export default FaceRecognition;