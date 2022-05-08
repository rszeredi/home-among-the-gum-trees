import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';

import SearchBar from './SearchBar';
import Place from './Place';

import {
	parseNearbySearchResults,
	selectTopRated,
	MELBOURNE_LAT_LNG
} from '../util/googleMapsHelpers';
import { importNearbyPlaceSampleData } from '../data/testData';
import constants from '../util/constants';

import './Map.css';

const { NUM_PLACES_PER_PLACE_TYPE, PLACE_TYPES, PLACE_TYPE_MARKER_COLORS } = constants;

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
			if (!placesService || !selectedAddress) return;
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
					setInfoWindowPlace({ ...place, placeType });
				};

				const marker_color = PLACE_TYPE_MARKER_COLORS[placeType];
				let markerImage = new window.google.maps.MarkerImage(
					`http://maps.google.com/mapfiles/ms/icons/${marker_color}-dot.png`
				);

				markers.push(
					<Marker
						position={coords}
						key={`${place_id}`}
						icon={markerImage}
						onClick={handleMarkerClick}
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

	const shape = {
		coords: [ 1, 1, 1, 20, 18, 20, 18, 1 ],
		type: 'poly'
	};

	const handleCloseInfoWindow = () => {
		setInfoWindowPlace(null);
	};

	const circleOptions = {
		fillOpacity: 0.15,
		fillColor: 'lightgreen',
		strokeColor: 'lightgreen',
		strokeWeight: 1
	};

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
					<Fragment>
						<Circle center={selectedAddress} radius={1000} options={circleOptions} />
						<Marker
							position={selectedAddress}
							shape={shape}
							icon={{
								url: '/favicon.ico',
								anchor: new window.google.maps.Point(17, 46),
								scaledSize: new window.google.maps.Size(37, 37)
							}}
						/>
					</Fragment>
				)}
				{markers}
				{infoWindowPlace && (
					<InfoWindow
						onLoad={(infoBox) => console.log('infoBox', infoBox)}
						position={infoWindowPlace.coords}
						onCloseClick={handleCloseInfoWindow}
					>
						<div className="Map-infowindow">
							{/* <a href={infoWindowPlace.url} target="_blank">
								<h3>{infoWindowPlace.name}</h3>
							</a> */}
							<a href={infoWindowPlace.url} target="_blank">
								<Place
									key={infoWindowPlace.place_id}
									item={infoWindowPlace}
									displayType="InfoWindow"
									placeType={infoWindowPlace.placeType}
									setInfoWindowPlace={setInfoWindowPlace}
									idxForFakeImage={infoWindowPlace.idxForFakeImage}
								/>
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
