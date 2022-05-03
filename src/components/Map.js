import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback, useRef } from 'react';

import SearchBar from './SearchBar';

import {
	parseNearbySearchResults,
	selectTopRated,
	MELBOURNE_LAT_LNG
} from '../util/googleMapsHelpers';
import { importNearbyPlaceSampleData } from '../data/testData';
import constants from '../util/constants';

import './Map.css';

const { NUM_PLACES_PER_PLACE_TYPE, PLACE_TYPES } = constants;

const containerStyle = {
	// width: '100%'
	height: '100vh'
};

const mapOptions = {
	mapId: process.env.REACT_APP_MAP_ID,
	disableDefaultUI: true,
	zoomControl: true,
	streetViewControl: true
};
// const PLACE_TYPES = [ 'cafe', 'restaurant', 'bar', 'gym', 'park', 'supermarket', 'bakery' ];
// const PLACE_TYPES = [ 'cafe', 'restaurant' ];

function Map({
	selectedAddress,
	setSelectedAddress,
	placesOfInterest,
	setPlacesOfInterest,
	infoWindowPlace,
	setInfoWindowPlace
}) {
	const [ placesService, setPlacesService ] = useState(null);
	const [ markers, setMarkers ] = useState([]);
	const mapRef = useRef();

	const onMapLoad = useCallback((map) => {
		// initialize places service
		const service = new window.google.maps.places.PlacesService(map);
		setPlacesService(service);

		// set up reference to map
		mapRef.current = map;
	});

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

				const resultsParsed = parseNearbySearchResults(results);
				console.log('results::', results);
				// console.log('results', JSON.stringify(parseNearbySearchResults(results, true)));
				const selectedPlaces = selectTopRated(resultsParsed, NUM_PLACES_PER_PLACE_TYPE);
				setPlacesOfInterest((prevPlacesOfInterest) => ({
					...prevPlacesOfInterest,
					[placeType]: selectedPlaces
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
				const testData = importNearbyPlaceSampleData(NUM_PLACES_PER_PLACE_TYPE);
				setPlacesOfInterest(testData);
			}
		},
		[ selectedAddress ]
	);

	const getMarkers = () => {
		if (!placesOfInterest) return [];

		let markers = [];
		const existingMarkers = new Set();

		for (let placeType in placesOfInterest) {
			for (let place of placesOfInterest[placeType]) {
				const { coords, place_id } = place;
				if (existingMarkers.has(place_id)) continue;

				const handleMarkerClick = () => {
					console.log('PLACE:', place);
					setInfoWindowPlace(place);
				};

				markers.push(
					<Marker position={coords} key={`${place_id}`} onClick={handleMarkerClick} 
					// label={{
					// 		text: '\ue88a',
					// 		fontFamily: 'Material Icons',
					// 		color: '#ffffff',
					// 		fontSize: '18px'
					// 	}}
						/>
				);
				existingMarkers.add(place_id);
			}
		}

		return markers;
	};

	useEffect(
		() => {
			setMarkers(getMarkers());
		},
		[ placesOfInterest ]
	);

	// var iconShape = [ 8, 33, 6, 21, 1, 13, 1, 5, 5, 1, 13, 1, 18, 6, 18, 13, 12, 21, 10, 33 ];

	const shape = {
		coords: [ 1, 1, 1, 20, 18, 20, 18, 1 ],
		type: 'poly'
	};

	const handleCloseInfoWindow = () => {
		setInfoWindowPlace(null);
	};

	const circleOptions = {fillOpacity: 0.15, fillColor: 'lightgreen', strokeColor: 'lightgreen', strokeWeight: 1	}

	return (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={MELBOURNE_LAT_LNG}
				zoom={12}
				onLoad={onMapLoad}
				options={mapOptions}
			>
				
				{selectedAddress && (
					<>
					<Circle center={selectedAddress} radius={1000} options={circleOptions}/>
					<Marker
						position={selectedAddress}
						shape={shape}
						icon={{
							url: '/favicon.ico',
							// url:,
							// 	'https://maps.gstatic.com/mapfiles/place_api/icons/v2/train_rail_1_pinlet.svg',
							anchor: new window.google.maps.Point(17, 46),
							scaledSize: new window.google.maps.Size(37, 37)
						}}
						// icon={{
						// 	// path:
						// 	// 'M352 0C405 0 448 42.98 448 96V352C448 399.1 412.8 439.7 366.9 446.9L412.9 492.9C419.9 499.9 414.9 512 404.1 512H365.3C356.8 512 348.6 508.6 342.6 502.6L288 448H160L105.4 502.6C99.37 508.6 91.23 512 82.75 512H43.04C33.06 512 28.06 499.9 35.12 492.9L81.14 446.9C35.18 439.7 0 399.1 0 352V96C0 42.98 42.98 0 96 0H352zM64 192C64 209.7 78.33 224 96 224H352C369.7 224 384 209.7 384 192V96C384 78.33 369.7 64 352 64H96C78.33 64 64 78.33 64 96V192zM224 384C250.5 384 272 362.5 272 336C272 309.5 250.5 288 224 288C197.5 288 176 309.5 176 336C176 362.5 197.5 384 224 384z',

						// 	fillColor: 'blue',
						// 	fillOpacity: 0.9,
						// 	scale: 1,
						// 	strokeColor: 'blue',
						// 	strokeWeight: 0,
						// 	backgroundColor: 'pink'
						// }}
					/>
					</>
				)}
				{markers}
				{infoWindowPlace && (
					<InfoWindow
						onLoad={(infoBox) => console.log('infoBox', infoBox)}
						position={infoWindowPlace.coords}
						onCloseClick={handleCloseInfoWindow}
					>
						<div className="Map-infowindow">
							<a href={infoWindowPlace.url} target="_blank">
								<h3>{infoWindowPlace.name}</h3>
							</a>
						</div>
					</InfoWindow>
				)}
				<SearchBar setSelectedAddress={setSelectedAddress} />
			</GoogleMap>
		</div>
	);
}

export default Map;
