import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import Dashboard from './Dashboard';

import './MainApp.css';
import { importNearbyPlaceSampleData } from '../data/testData';

const mapsLibraries = [ 'places' ];

const testData = importNearbyPlaceSampleData();

function MainApp() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
		libraries: mapsLibraries,
		mapIds: [ process.env.REACT_APP_MAP_ID ]
	});

	const [ selectedAddress, setSelectedAddress ] = useState(null);
	const [ placesOfInterest, setPlacesOfInterest ] = useState({});

	return isLoaded ? (
		<div className="MainApp">
			<div className="MainApp-map">
				<Map
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
					placesOfInterest={placesOfInterest}
					setPlacesOfInterest={setPlacesOfInterest}
				/>
			</div>
			<div className="MainApp-dashboard">
				<Dashboard selectedAddress={selectedAddress} placesOfInterest={placesOfInterest} />
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default MainApp;
