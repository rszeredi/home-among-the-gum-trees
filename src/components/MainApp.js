import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import Map from './Map';

const mapsLibraries = [ 'places' ];

function MainApp() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
		libraries: mapsLibraries
	});

	const [ selectedAddress, setSelectedAddress ] = useState(null);

	return isLoaded ? (
		<div>
			<Map selectedAddress={selectedAddress} />
			<SearchBar setSelectedAddress={setSelectedAddress} />
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default MainApp;
