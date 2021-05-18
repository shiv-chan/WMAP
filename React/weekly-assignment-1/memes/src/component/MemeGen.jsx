import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// meme generator
export default function MemeGen() {
	const [templates, setTemplates] = useState([]);
	const randNum = Math.floor(Math.random() * 100);

	useEffect(() => {
		return fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => setTemplates(data.data.memes))
			.catch((err) => console.error(`Error: ${err}`));
	}, []);

	return (
		<div>
			<img src={templates[randNum].url} alt={templates[randNum].name} />
		</div>
	);
}
