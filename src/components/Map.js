import { GoogleMap } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
	width: '100%',
	height: '100vw'
};

const center = {
	lat: -37.81,
	lng: 144.96
};

function Map() {
	return (
		<div>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
		</div>
	);
}

export default Map;
