import React from 'react';
import Place from './Place';

import './SubDashboard.css';

function convertToDisplayName(placeType) {
	if (placeType === 'bakery') return 'bakeries';
	if (placeType === 'transit_station') return 'Tram/Bus Stops';
	else return placeType.replace('_', ' ') + 's';
}

function SubDashboard({ placeType, items, setInfoWindowPlace }) {
	const itemRows = items.map((item, idx) => (
		<Place
			key={item.place_id}
			item={item}
			placeType={placeType}
			setInfoWindowPlace={setInfoWindowPlace}
			idxForFakeImage={idx}
		/>
	));
	return (
		<div className="SubDashboard">
			<h4 className="SubDashboard-heading">{convertToDisplayName(placeType)}</h4>
			{itemRows}
		</div>
	);
}

export default SubDashboard;
