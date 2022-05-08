import React from 'react';

import { placeholderImageUrls } from '../data/testData';
import constants from '../util/constants';
import './SubDashboard.css';

const { PLACE_TYPE_ICONS } = constants;

function Place({ item, placeType, displayType, setInfoWindowPlace, idxForFakeImage }) {
	const { name, imageUrl, rating, user_ratings_total, vicinity, price_level, url, coords } = item;
	const ratingsCountDisplay = user_ratings_total || 0;
	const ratingDisplay = `${(rating || 0).toFixed(1)}`;

	const imageOrIconDisplay = imageUrl
		? getImageUrl(imageUrl, placeType, idxForFakeImage)
		: getPlaceTypeIconDisplay(placeType);

	const nameDisplay =
		displayType === 'InfoWindow' ? (
			<a href={url} target="_blank" className="Place-link SubDashboard-place-info-heading">
				<span className="Place-link-name">{name}</span>
				<span>
					{'   '}
					<i className="fa-solid fa-link" />
				</span>
			</a>
		) : (
			<div className="SubDashboard-place-info-heading">{name}</div>
		);

	const handleClick = () => {
		if (displayType !== 'InfoWindow')
			setInfoWindowPlace({ ...item, placeType, idxForFakeImage });
	};

	return (
		// <a href={url} target="_blank" className="SubDashboard-place">
		<div
			className={` SubDashboard-place ${displayType !== 'InfoWindow' &&
				'SubDashboard-place-dashboard'}`}
			onClick={handleClick}
		>
			<div className="SubDashboard-place-image-container">{imageOrIconDisplay}</div>
			<div className="SubDashboard-place-info">
				{nameDisplay}
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

function addMapKeyToImageUrl(imageUrl) {
	if (!imageUrl) return;
	return imageUrl.replace('&key=', `&key=${process.env.REACT_APP_MAPS_API_KEY}`);
}

function getImageUrl(realImageUrl, place_type, idx) {
	let imageUrlDisplay;
	if (process.env.NODE_ENV !== 'development' || process.env.REACT_APP_OVERRIDE_ENV === 'prod')
		imageUrlDisplay = realImageUrl;
	else {
		const imageCandidates = placeholderImageUrls[place_type];
		imageUrlDisplay = imageCandidates[idx ? idx % 3 : 0];
	}

	return <img src={imageUrlDisplay} alt="Place Image" />;
}

function getPlaceTypeIconDisplay(placeType) {
	return (
		<div className="SubDashboard-place-icon-container SubDashboard-place-icon">
			{<i className={`${PLACE_TYPE_ICONS[placeType]}`} />}
		</div>
	);
}

export default Place;
