import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return(
		<div>
			<p className='f3'>
				{'This AI brain detects faces give it a shot'}
			</p>
			<div className = 'center formElements'>
				<div className = ' form center pa4 br3 shadow-5'>
					<input className = 'f4 pa2 ma-4 br2 w-50 center' type= 'text' onChange = {onInputChange}/>
					<button className = ' center br2 w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick = {onSubmit}> Detect Now </button>
				</div>	
			</div>	
		</div>
	);
}

export default ImageLinkForm;