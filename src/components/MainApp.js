import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import Map from './Map';

function MainApp() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
	});

	return isLoaded ? (
		<div>
			<Map />
			<SearchBar />
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default MainApp;
