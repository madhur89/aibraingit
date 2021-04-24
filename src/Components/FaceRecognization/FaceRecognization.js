import React from 'react';
import './FaceRecognization.css';

const FaceRecognization = ({ imageUrl, box }) => {
	return (
		<div className = 'center ma mt4'>
			<img id = 'inputimg' src={ imageUrl } width='500px' height= 'auto'/>
			<div className = 'bounding-box'></div>
		</div>
	)	
}

export default FaceRecognization;

