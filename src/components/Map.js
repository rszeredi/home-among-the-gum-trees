import { GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react';

import { parseNearbySearchResults, MELBOURNE_LAT_LNG } from '../util/googleMapsHelpers';

const containerStyle = {
	// width: '100%'
	height: '100vh'
};

function Map({ selectedAddress }) {
	const onMapLoad = (map) => {
		const service = new window.google.maps.places.PlacesService(map);
		const melbourne = new window.google.maps.LatLng(
			process.env.REACT_APP_BERYL_LAT,
			process.env.REACT_APP_BERYL_LNG
		);
		const request = {
			location: melbourne,
			radius: '1000',
			type: [ 'bakery' ]
		};

		const nearbySearchCallback = (results, status, next_page_token) => {
			console.log('next_page_token!', next_page_token);
			console.log('results!', results);
			console.log('results! parsed ', parseNearbySearchResults(results));
			console.log('results! parsed JSON ', JSON.stringify(parseNearbySearchResults(results)));

			window.myresults = results;
			window.next_page_token = next_page_token;
			// if (status == window.google.maps.places.PlacesServiceStatus.OK) {
			// 	for (var i = 0; i < results.length; i++) {
			// 		// createMarker(results[i]);
			// 		console.log('results[i]', results[i]);
			// 	}
			// }
		};

		// service.nearbySearch(request, nearbySearchCallback);
	};

	return (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={MELBOURNE_LAT_LNG}
				zoom={12}
				onLoad={onMapLoad}
				options={{
					mapId: process.env.REACT_APP_MAP_ID,
					disableDefaultUI: true,
					streetViewControl: true
				}}
			>
				{selectedAddress && <Marker position={selectedAddress} />}
			</GoogleMap>
		</div>
	);
}

export default Map;
