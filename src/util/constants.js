const constants = {
	NUM_PLACES_PER_PLACE_TYPE: 3,
	PLACE_TYPES: [
		'restaurant',
		'cafe',
		// 'bar',
		'gym',
		'park',
		'transit_station',
		'train_station',
		'supermarket',
		'bakery'
	],
	PLACE_TYPE_MARKER_COLORS: {
		restaurant: 'blue',
		cafe: 'blue',
		gym: 'pink',
		park: 'green',
		train_station: 'purple',
		transit_station: 'orange',
		supermarket: 'red',
		bakery: 'yellow'
	},
	PTV_LOGOS: {
		TRAM:
			'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Melbourne_tram_logo.svg/1024px-Melbourne_tram_logo.svg.png?20210618072626',
		TRAIN:
			'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Melbourne_train_logo.svg/1024px-Melbourne_train_logo.svg.png?20210618072257',
		BUS:
			'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Victoria_bus_logo.svg/1198px-Victoria_bus_logo.svg.png?20170717015922'
	}
};

export default constants;
