import React from 'react';

import './SubDashboard.css';

import { placeholderImageUrls } from '../data/testData';

function pluralizePlaceType(placeType) {
	if (placeType === 'bakery') return 'bakeries';
	else return placeType + 's';
}

function addMapKeyToImageUrl(imageUrl) {
	if (!imageUrl) return;
	return imageUrl.replace('&key=', `&key=${process.env.REACT_APP_MAPS_API_KEY}`);
}

function SubDashboard({ placeType, items }) {
	const itemRows = items
		.slice(0, 3)
		.map((item) => <Place key={item.place_id} {...item} placeType={placeType} />);
	return (
		<div className="SubDashboard">
			<h4 className="SubDashboard-heading">
				{pluralizePlaceType(placeType.replace('_', ' '))}
			</h4>
			{itemRows}
		</div>
	);
}

function getImageUrl(realImageUrl, place_type) {
	if (process.env.NODE_ENV === 'development') {
		const imageCandidates = placeholderImageUrls[place_type];
		return imageCandidates[Math.floor(Math.random() * imageCandidates.length)];
	} else return addMapKeyToImageUrl(realImageUrl);
}

function Place({
	name,
	imageUrl,
	rating,
	user_ratings_total,
	vicinity,
	price_level,
	placeType,
	url
}) {
	const ratings_count_string = user_ratings_total ? `(${user_ratings_total})` : '';

	const imageUrlDisplay = getImageUrl(imageUrl, placeType);
	return (
		<a href={url} target="_blank" className="SubDashboard-place">
			<div className="SubDashboard-place-image-container">
				{imageUrlDisplay && <img src={imageUrlDisplay} alt="place-image" />}
			</div>
			<div className="SubDashboard-place-info">
				<div className="SubDashboard-place-info-heading">{name}</div>
				<div>
					<span>{rating} </span>
					<span>{ratings_count_string} </span>
					<span>{'$'.repeat(price_level)}</span>
				</div>
				<div>{vicinity}</div>
			</div>
		</a>
	);
}

export default SubDashboard;
