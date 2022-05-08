import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import Dashboard from './Dashboard';

import './MainApp.css';

const mapsLibraries = [ 'places' ];

function MainApp() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
		libraries: mapsLibraries,
		mapIds: [ process.env.REACT_APP_MAP_ID ]
	});

	const [ selectedAddress, setSelectedAddress ] = useState(null);
	const [ placesOfInterest, setPlacesOfInterest ] = useState({});
	const [ infoWindowPlace, setInfoWindowPlace ] = useState(null);

	return isLoaded ? (
		<div className="MainApp">
			<div className="MainApp-map">
				<Map
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
					placesOfInterest={placesOfInterest}
					setPlacesOfInterest={setPlacesOfInterest}
					infoWindowPlace={infoWindowPlace}
					setInfoWindowPlace={setInfoWindowPlace}
				/>
			</div>
			<div
				className={
					'MainApp-dashboard ' +
					(selectedAddress ? 'MainApp-dashboard-visible' : 'MainApp-dashboard-hidden')
				}
			>
				<Dashboard
					selectedAddress={selectedAddress}
					placesOfInterest={placesOfInterest}
					setInfoWindowPlace={setInfoWindowPlace}
				/>
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default MainApp;
