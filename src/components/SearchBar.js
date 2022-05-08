import {
	Combobox,
	ComboboxInput,
	ComboboxList,
	ComboboxOption,
	ComboboxPopover
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useGoogleMap } from '@react-google-maps/api';
import { MELBOURNE_LAT_LNG } from '../util/googleMapsHelpers';

import './SearchBar.css';

function SearchBar({ setSelectedAddress, selectedAddress }) {
	const map = useGoogleMap();

	const melbourneLatLng = new window.google.maps.LatLng(
		MELBOURNE_LAT_LNG.lat,
		MELBOURNE_LAT_LNG.lng
	);
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions
	} = usePlacesAutocomplete({
		requestOptions: {
			location: melbourneLatLng,
			radius: 15000,
			// componentRestrictions: { country: 'AU' },
			strictBounds: true
		}
	});
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			setValue(process.env.REACT_APP_BERYL_ADDRESS || '');
		}
	}, []);

	const handleSearchChange = (e) => {
		setValue(e.target.value);
	};

	// make the function async because we are converting the selected address to lat/lon
	const handleSelect = async (address) => {
		setValue(address, false); // set to false for now, because don't need fetch additional data, just override and set value
		clearSuggestions();

		// covert to coords
		const results = await getGeocode({ address });
		const latlng = await getLatLng(results[0]);
		const addressComponents = Object.fromEntries(
			results[0].address_components.map((ac) => [ ac.types[0], ac.short_name ])
		);
		setSelectedAddress({ address, ...latlng, addressComponents });

		// pan to address on map
		map.panTo(latlng);
		map.setZoom(14);
	};

	const placeholderText = `🔍 Search for an address (eg. 47 Lansell Road Toorak)`;

	return (
		<div
			className={'SearchBar ' + (!selectedAddress ? 'SearchBar-center' : 'SearchBar-topLeft')}
			style={{ minWidth: value ? '80%' : '35px' }}
		>
			<Combobox onSelect={handleSelect}>
				<ComboboxInput
					value={value}
					onChange={handleSearchChange}
					disabled={!ready}
					className={
						'SearchBar-input ' +
						(!selectedAddress ? 'SearchBar-input-center' : 'SearchBar-input-topLeft')
					}
					placeholder={placeholderText}
				/>
				<ComboboxPopover>
					<ComboboxList className="SearchBar-dropdown">
						{status === 'OK' &&
							data.map(({ place_id, description }) => (
								<ComboboxOption key={place_id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	);
}

export default SearchBar;
