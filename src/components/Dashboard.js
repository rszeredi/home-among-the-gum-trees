import React from 'react';

// import { PLACE_TYPES } from '../util/googleMapsHelpers';
import SubDashboard from './SubDashboard';

import './Dashboard.css';

import { importNearbyPlaceSampleData } from '../data/testData';

const PLACE_TYPES = [ 'cafe', 'restaurant', 'bar' ];
const testData = importNearbyPlaceSampleData();

function Dashboard({ selectedAddress }) {
	const subDashboards = PLACE_TYPES.slice(0, 3).flat().map((p) => {
		console.log(p);
		if (!testData[p]) return;
		return <SubDashboard key={p} placeType={p} items={testData[p]} />;
	});

	return (
		<div className="Dashboard">
			<div className="Dashboard-heading">Dashboard for {`${selectedAddress}`}</div>
			<div className="Dashboard-container">{subDashboards}</div>
		</div>
	);
}

export default Dashboard;
