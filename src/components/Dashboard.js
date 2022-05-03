import React from 'react';

// import { PLACE_TYPES } from '../util/googleMapsHelpers';
import SubDashboard from './SubDashboard';

import './Dashboard.css';

import constants from '../util/constants';
const { PLACE_TYPES } = constants;

function Dashboard({ selectedAddress, placesOfInterest, setInfoWindowPlace }) {
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
			<div className="Dashboard-container">{subDashboards}</div>
		</div>
	);
}

export default Dashboard;
