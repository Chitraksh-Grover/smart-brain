import React from 'react';

const Navigation = ({onRouteChange}) => {
	return(
		<nav onClick={() => onRouteChange('signin')} style={{display: 'flex', justifyContent:'flex-end'}}>
			<p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
		</nav>
	);
}

export default Navigation;
