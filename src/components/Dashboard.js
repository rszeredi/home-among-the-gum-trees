import React from 'react';

// import { PLACE_TYPES } from '../util/googleMapsHelpers';
import SubDashboard from './SubDashboard';

import './Dashboard.css';

function Dashboard({ selectedAddress, placesOfInterest, setInfoWindowPlace }) {
	const subDashboards = !placesOfInterest
		? null
		: Object.entries(placesOfInterest).map(([ placeType, places ]) => {
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
