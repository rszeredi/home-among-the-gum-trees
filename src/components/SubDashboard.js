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

function SubDashboard({ placeType, items, setInfoWindowPlace }) {
	const itemRows = items.map((item, idx) => (
		<Place
			key={item.place_id}
			item={item}
			placeType={placeType}
			setInfoWindowPlace={setInfoWindowPlace}
			idx={idx}
		/>
	));
	return (
		<div className="SubDashboard">
			<h4 className="SubDashboard-heading">
				{pluralizePlaceType(placeType.replace('_', ' '))}
			</h4>
			{itemRows}
		</div>
	);
}

function getImageUrl(realImageUrl, place_type, idx) {
	if (process.env.NODE_ENV === 'development') {
		const imageCandidates = placeholderImageUrls[place_type];
		return imageCandidates[idx % 3];
	} else return realImageUrl;
}

function Place({ item, placeType, setInfoWindowPlace, idx }) {
	const { name, imageUrl, rating, user_ratings_total, vicinity, price_level, url, coords } = item;
	const ratings_count_string = user_ratings_total ? `(${user_ratings_total})` : '';
	const imageUrlDisplay = getImageUrl(imageUrl, placeType, idx);

	const handleClick = () => {
		setInfoWindowPlace(item);
	};
	return (
		// <a href={url} target="_blank" className="SubDashboard-place">
		<div className="SubDashboard-place" onClick={handleClick}>
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
		</div>
		// </a>
	);
}

export default SubDashboard;
