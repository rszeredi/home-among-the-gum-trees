import React from 'react';

import './SubDashboard.css';

import { placeholderImageUrls } from '../data/testData';

function convertToDisplayName(placeType) {
	if (placeType === 'bakery') return 'bakeries';
	if (placeType === 'transit_station') return 'Tram/Bus Stops';
	else return placeType.replace('_', ' ') + 's';
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
			<h4 className="SubDashboard-heading">{convertToDisplayName(placeType)}</h4>
			{itemRows}
		</div>
	);
}

function getImageUrl(realImageUrl, place_type, idx) {
	if (process.env.NODE_ENV !== 'development' || process.env.REACT_APP_OVERRIDE_ENV === 'prod')
		return realImageUrl;
	else {
		const imageCandidates = placeholderImageUrls[place_type];
		return imageCandidates[idx % 3];
	}
}

function Place({ item, placeType, setInfoWindowPlace, idx }) {
	const { name, imageUrl, rating, user_ratings_total, vicinity, price_level, url, coords } = item;
	const ratingsCountDisplay = user_ratings_total || 0;
	const ratingDisplay = `${(rating || 0).toFixed(1)}`;

	const imageUrlDisplay = getImageUrl(imageUrl, placeType, idx);

	const handleClick = () => {
		setInfoWindowPlace(item);
	};

	const starRatings = Array.from({ length: 5 }).map((_) => (
		<i class="fa-solid fa-star-half-stroke" />
	));
	// const starRatings = Array.from({ length: 5 }).map((_) => <i class="fa fa-solid fa-star" />);
	return (
		// <a href={url} target="_blank" className="SubDashboard-place">
		<div className="SubDashboard-place" onClick={handleClick}>
			<div className="SubDashboard-place-image-container">
				{imageUrlDisplay && <img src={imageUrlDisplay} alt="place-image" />}
			</div>
			<div className="SubDashboard-place-info">
				<div className="SubDashboard-place-info-heading">{name}</div>
				<div>
					<span>{ratingDisplay} </span>
					<span className="SubDashboard-place-info-stars">
						{ratingToStars(rating || 0)}{' '}
					</span>
					<span>{`(${ratingsCountDisplay})`} </span>
					<span>{'$'.repeat(price_level)}</span>
				</div>
				<div>{vicinity}</div>
			</div>
		</div>
		// </a>
	);
}

function starsToSpan(number, icon) {
	return Array.from({ length: number }).map((_, idx) => <i className={icon} key={idx} />);
}

function ratingToStars(rating) {
	const fullStars = Math.floor(rating);
	const remainder = rating - fullStars;
	const halfStars = remainder > 0.2 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStars;
	return (
		<span>
			{starsToSpan(fullStars, 'fa fa-solid fa-star star-full')}
			{starsToSpan(halfStars, 'fa-solid fa-star-half-stroke star-half')}
			{starsToSpan(emptyStars, 'fa-regular fa-star star-empty')}
		</span>
	);
}

export default SubDashboard;
