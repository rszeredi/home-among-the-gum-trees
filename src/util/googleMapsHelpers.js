export const MELBOURNE_LAT_LNG = {
	lat: -37.81,
	lng: 144.96
};

// https://developers.google.com/maps/documentation/places/web-service/supported_types
export const PLACE_TYPES = [
	[ 'gym' ],
	[ 'park' ],
	[ 'restaurant' ],
	[ 'bar' ],
	[ 'cafe' ],
	[ 'bus_station', 'light_rail_station', 'subway_station', 'train_station', 'transit_station' ],
	[ 'supermarket', 'bakery' ]
];

export function parseNearbySearchResults(results, forStorage = false) {
	return results.map((res) => {
		const {
			name,
			rating,
			types,
			business_status,
			price_level,
			user_ratings_total,
			vicinity,
			place_id,
			photos,
			icon,
			icon_mask_base_uri,
			geometry
		} = res;
		let imageUrl = photos ? photos[0].getUrl() : null;

		if (forStorage) {
			imageUrl = imageUrl
				? imageUrl.replace(`&key=${process.env.REACT_APP_MAPS_API_KEY}`, '&key=')
				: imageUrl;
		}

		const url = `https://www.google.com/maps/place/?q=place_id:${place_id}`;
		const iconNonColored = `${icon_mask_base_uri}.svg`;
		const coords = { lat: geometry.location.lat(), lng: geometry.location.lng() };
		return {
			name,
			place_id,
			types,
			business_status,
			vicinity,
			rating,
			price_level,
			user_ratings_total,
			imageUrl,
			icon,
			iconNonColored,
			url,
			coords
		};
	});
}

export function selectTopRated(results, topK) {
	const resultsSorted = results.sort((x, y) => y.rating - x.rating);
	return resultsSorted.slice(0, topK);
}

// //temp
// service.getDetails({ placeId: 'ChIJT-0oULFB1moRHfywNgnQ07o' }, function(place, status) {
// 	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
// 		if (place) {
// 			console.log('place1 tram:::', place);
// 		}
// 	}
// });

// service.getDetails({ placeId: 'ChIJ1WzOWOdB1moRuB2G1g8x3SA' }, function(place, status) {
// 	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
// 		if (place) {
// 			console.log('place2 bus:::', place);
// 		}
// 	}
// });

// const symbol = '13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75';
// const svgMarker = {
// 	path:
// 		'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
// 	fillColor: 'blue',
// 	fillOpacity: 0.6,
// 	strokeWeight: 0,
// 	rotation: 0,
// 	scale: 2,
// 	anchor: new window.google.maps.Point(15, 30)
// };

{
	/* <Marker
						position={coords}
						key={`${place_id}`}
						// icon={markerImage}
						onClick={handleMarkerClick}
						icon={svgMarker}
						// icon={{
						// 	// coords: '13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75',
						// 	path:
						// 		'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',

						// 	fillColor: 'blue',
						// 	fillOpacity: 0.9,
						// 	scale: 1,
						// 	strokeColor: 'blue',
						// 	strokeWeight: 0,
						// 	backgroundColor: 'pink'
						// }}
						label={{
							// text: '1km',
							text: '\ue530',
							fontFamily: 'Material Icons',
							color: 'white',
							fontSize: '18px',
							fontWeight: 'bold',
							backgroundColor: 'blue',
							shape: ''
						}}
					/> */
}
