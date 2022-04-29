import bakery from './bakery.json';
import bar from './bar.json';
import cafe from './cafe.json';
import gym from './gym.json';
import park from './park.json';
import restaurant from './restaurant.json';
import supermarket from './supermarket.json';
import train_station from './train_station.json';
import transit_station from './transit_station.json';

const DATA = {
	bakery,
	bar,
	cafe,
	gym,
	park,
	restaurant,
	supermarket,
	train_station,
	transit_station
};

// temp for handling stored data
export function importNearbyPlaceSampleData(place_type) {
	if (!place_type) return DATA;
	return DATA[place_type];
}
