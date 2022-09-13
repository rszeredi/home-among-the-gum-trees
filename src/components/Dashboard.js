import React, { useState } from 'react';

// import { PLACE_TYPES } from '../util/googleMapsHelpers';
import SubDashboard from './SubDashboard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './Dashboard.css';

import constants from '../util/constants';
const { PLACE_TYPES } = constants;

function Dashboard({
	selectedAddress,
	placesOfInterest,
	setInfoWindowPlace,
	defaultRadiusInMetres,
	setRadiusInMetres
}) {
	const [ tempRadius, setTempRadius ] = useState(defaultRadiusInMetres / 1000);

	const handleRadiusChange = (e) => {
		setTempRadius(e.target.value);
	};

	const handleRadiusSubmit = (e) => {
		e.preventDefault();
		setRadiusInMetres(tempRadius * 1000);
	};

	const subDashboards = !placesOfInterest
		? null
		: PLACE_TYPES.map((placeType) => {
				const places = placesOfInterest[placeType];
				if (!places) return;
				return (
					<SubDashboard
						key={placeType}
						placeType={placeType}
						items={places}
						setInfoWindowPlace={setInfoWindowPlace}
					/>
				);
			});

	return (
		<div className="Dashboard">
			{selectedAddress && (
				<div className="Dashboard-heading">{`${selectedAddress.address}`}</div>
			)}
			<form onSubmit={handleRadiusSubmit}>
				<TextField
					className="Dashboard-input-radius"
					type="number"
					InputProps={{ inputProps: { min: 0.5, max: 8, step: 0.5 } }}
					value={tempRadius}
					onChange={handleRadiusChange}
				/>
				<Button type="submit" variant="outlined" color="secondary">
					Submit
				</Button>
			</form>
			<div className="Dashboard-container">{subDashboards}</div>
		</div>
	);
}

export default Dashboard;
