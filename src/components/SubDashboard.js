import React from 'react';

import './SubDashboard.css';

// placeholder images
const placeholderImageUrls = {
	cafe: [
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
		'https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
		'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
	],
	restaurant: [
		'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
		'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1324&q=80'
	],
	bar: [
		'https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
		'https://images.unsplash.com/photo-1539639885136-56332d18071d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
	]
};

function pluralizePlaceType(placeType) {
	if (placeType === 'bakery') return 'bakeries';
	else return placeType + 's';
}

function addMapKeyToImageUrl(imageUrl) {
	if (!imageUrl) return;
	const [ baseUrl, token ] = imageUrl.split('&token=');
	return `${baseUrl}&key=${process.env.REACT_APP_MAPS_API_KEY}&token=${token}`;
}

function SubDashboard({ placeType, items }) {
	const handleRowClick = (e) => {
		console.log('e.target', e);
		// window.location = e.target.dataset
	};

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

	const handlePlaceClick = () => {
		window.location = url;
	};

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
