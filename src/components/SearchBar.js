import {
	Combobox,
	ComboboxInput,
	ComboboxList,
	ComboboxOption,
	ComboboxPopover
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useGoogleMap } from '@react-google-maps/api';

import './SearchBar.css';

function SearchBar({ setSelectedAddress }) {
	const map = useGoogleMap();

	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions
	} = usePlacesAutocomplete();
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
		setSelectedAddress({ address, ...latlng });

		// pan to address on map
		map.panTo(latlng);
	};

	return (
		<div className="SearchBar" style={{ minWidth: value ? '80%' : '35px' }}>
			<Combobox onSelect={handleSelect}>
				<ComboboxInput
					value={value}
					onChange={handleSearchChange}
					disabled={!ready}
					className="SearchBar-input"
					placeholder="🔍"
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
