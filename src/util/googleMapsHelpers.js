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
