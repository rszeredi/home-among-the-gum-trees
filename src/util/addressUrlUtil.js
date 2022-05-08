// TODO: convert to camel case (this code was translated from Python)

const streettype_replacements = {
	street: 'st',
	road: 'rd',
	place: 'pl',
	parade: 'pde',
	avenue: 'ave',
	grove: 'gr',
	way: 'way',
	court: 'ct',
	st: 'st',
	gardens: 'gdns',
	terrace: 'tce',
	drive: 'dr',
	close: 'cl',
	crescent: 'cres',
	circuit: 'cct',
	lane: 'lane',
	ln: 'lane',
	boulevard: 'bvd',
	terrace: 'tce'
};

const streettype_suffix_replacements = {
	north: 'n',
	south: 's',
	east: 'e',
	west: 'w'
};

function splitOnLast(s, delimiter) {
	const s_split = s.split(delimiter);
	const first_part = s_split.slice(0, -1).join(delimiter);
	const second_part = s_split[s_split.length - 1];
	return [ first_part, second_part ];
}

function parse_street_address_parts(route) {
	// streettype suffix
	let street_address_str_no_suffix;
	let streettype_suffix;
	if (
		route.endsWith(' N') ||
		route.endsWith(' E') ||
		route.endsWith(' S') ||
		route.endsWith(' W')
	) {
		const street_address_str_split = splitOnLast(route, ' ');
		street_address_str_no_suffix = street_address_str_split[0];
		streettype_suffix = street_address_str_split[1];
	} else {
		street_address_str_no_suffix = route;
		streettype_suffix = '';
	}

	// streettype
	const [ street_name, streettype ] = splitOnLast(street_address_str_no_suffix, ' ');

	return { street_name, streettype, streettype_suffix };
}

function parse_address_parts(address_str) {
	const [ street_address_str, suburb_state, country ] = address_str.split(',');
	const [ suburb, state ] = splitOnLast(suburb_state);
	let { street_number, street_name, streettype, streettype_suffix } = parse_street_address_parts(
		street_address_str
	);
	return {
		street_number,
		street_name,
		streettype,
		streettype_suffix,
		suburb,
		state,
		country
	};
}

function get_hyphenated_address({
	subpremise,
	street_number,
	route,
	locality,
	postal_code,
	administrative_area_level_1,
	country
}) {
	if (country !== 'AU') return null; // only for realestate.com.au

	const { street_name, streettype, streettype_suffix } = parse_street_address_parts(route);

	// replace street with st etc.
	const streettype_new = streettype_replacements.hasOwnProperty(streettype.toLowerCase())
		? streettype_replacements[streettype.toLowerCase()]
		: streettype.toLowerCase();

	// handle units
	const street_number_new = subpremise ? `unit-${subpremise}-${street_number}` : street_number;

	// hyphenate
	const transformed_street_address = `${street_number_new} ${street_name.toLowerCase()} ${streettype_new.toLowerCase()} ${streettype_suffix.toLowerCase()}`
		.trim()
		.replaceAll(' ', '-');

	console.log('transformed_street_address', transformed_street_address);
	const suburb_str = locality.replaceAll(' ', '-').toLowerCase();

	const full_address_str = `${transformed_street_address}-${suburb_str}-vic-${postal_code}`;
	return full_address_str;
}

export function create_property_url(address_components) {
	console.log('address_components1', address_components);
	const full_address_str = get_hyphenated_address(address_components);

	return `https://www.realestate.com.au/property/${full_address_str}`;
}

// const aa = {"street_number":"82","route":"Ogrady St","locality":"Clifton Hill","administrative_area_level_2":"Yarra","administrative_area_level_1":"VIC","country":"AU","postal_code":"3068"}
// console.log(create_property_url(aa));
