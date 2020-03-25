import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () =>{
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br3  shadow-2" options={{ max : 50 }} style={{ height: 200, width: 200 }} >
				 <div className="Tilt-inner"> 👽 </div>
			</Tilt>
		</div>
	);
}

export default Logo;
