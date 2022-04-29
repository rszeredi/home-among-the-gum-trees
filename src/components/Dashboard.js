import React from 'react';

import { PLACE_TYPES } from '../util/googleMapsHelpers';

import './Dashboard.css';

import { importNearbyPlaceSampleData } from '../data/testData';

const testData = importNearbyPlaceSampleData();

function Dashboard({ selectedAddress }) {
	console.log('importData', importNearbyPlaceSampleData('cafe'));

	const subDashboards = PLACE_TYPES.flat().map((p) => {
		console.log(p);
		if (!testData[p]) return;
		return <SubDashboard key={p} placeType={p} items={testData[p]} />;
	});

	return (
		<div className="Dashboard">
			Dashboard for {`${selectedAddress}`}
			<div className="Dashboard-container">{subDashboards}</div>
		</div>
	);
}

function pluralizePlaceType(placeType) {
	if (placeType === 'bakery') return 'bakeries';
	else return placeType + 's';
}

function SubDashboard({ placeType, items }) {
	const itemRows = items.slice(0, 3).map((i) => {
		const ratings_count_string = i.user_ratings_total ? `(${i.user_ratings_total})` : '';
		return (
			<tr key={i.place_id}>
				<td>{i.name}</td>
				<td>{`${i.rating || 'N/A'} ${ratings_count_string}`}</td>
			</tr>
		);
	});
	return (
		<div className="SubDashboard">
			<h4 className="SubDashboard-heading">
				{pluralizePlaceType(placeType.replace('_', ' '))}
			</h4>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>{itemRows}</tbody>
			</table>
		</div>
	);
}

export default Dashboard;
