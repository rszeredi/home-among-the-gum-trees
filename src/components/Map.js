import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

import SearchBar from './SearchBar';

import { parseNearbySearchResults, MELBOURNE_LAT_LNG } from '../util/googleMapsHelpers';
import { importNearbyPlaceSampleData } from '../data/testData';

const containerStyle = {
	// width: '100%'
	height: '100vh'
};
// const PLACE_TYPES = [ 'cafe', 'restaurant', 'bar', 'gym', 'park', 'supermarket', 'bakery' ];
// const PLACE_TYPES = [ 'cafe', 'restaurant' ];
const PLACE_TYPES = [
	'bar',
	'gym',
	'park',
	'supermarket',
	'bakery',
	'transit_station',
	'train_station'
];

function Map({ selectedAddress, setSelectedAddress, placesOfInterest, setPlacesOfInterest }) {
	const [ placesService, setPlacesService ] = useState(null);
	const [ markers, setMarkers ] = useState([]);

	const onMapLoad = (map) => {
		const service = new window.google.maps.places.PlacesService(map);
		setPlacesService(service);
	};

	useEffect(
		() => {
			if (!placesService) return;
			// const infowindow = new window.google.maps.InfoWindow();

			// empty the current places of interest
			setPlacesOfInterest({});

			const selectAddressLatLng = new window.google.maps.LatLng(
				selectedAddress.lat,
				selectedAddress.lng
			);

			const requestBase = {
				location: selectAddressLatLng,
				radius: '1000'
			};

			const nearbySearchCallback = (results, status, next_page_token, placeType) => {
				console.log('Searching placeType: ', placeType);

				const resultsParsed = parseNearbySearchResults(results).slice(0, 3);
				// console.log('results', JSON.stringify(parseNearbySearchResults(results, true)));
				setPlacesOfInterest((prevPlacesOfInterest) => ({
					...prevPlacesOfInterest,
					[placeType]: resultsParsed
				}));
				// if (status == window.google.maps.places.PlacesServiceStatus.OK)
			};

			if (
				process.env.NODE_ENV !== 'development' ||
				process.env.REACT_APP_OVERRIDE_ENV === 'prod'
			) {
				PLACE_TYPES.forEach((placeType) => {
					const request = { ...requestBase, type: placeType };
					placesService.nearbySearch(request, (results, status, next_page_token) =>
						nearbySearchCallback(results, status, next_page_token, placeType)
					);
				});
			} else {
				const testData = importNearbyPlaceSampleData();
				setPlacesOfInterest(testData);
			}
		},
		[ selectedAddress ]
	);

	const getMarkers = () => {
		if (!placesOfInterest) return [];

		let markers = [];
		const existingMarkers = new Set();

		for (let place of Object.values(placesOfInterest).flat()) {
			const { coords, place_id } = place;
			if (existingMarkers.has(place_id)) continue;

			markers.push(<Marker position={coords} key={`${place_id}`} />);
			existingMarkers.add(place_id);
		}

		return markers;
	};

	useEffect(
		() => {
			setMarkers(getMarkers());
		},
		[ placesOfInterest ]
	);

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
				{selectedAddress && (
					<Marker
						position={selectedAddress}
						icon={{
							url: '/favicon.ico',
							anchor: new window.google.maps.Point(17, 46),
							scaledSize: new window.google.maps.Size(37, 37)
						}}
					/>
				)}
				{markers}
				<SearchBar setSelectedAddress={setSelectedAddress} />
			</GoogleMap>
		</div>
	);
}

export default Map;
