import React, { useState } from 'react';
import PropTypes from 'prop-types';

// number of votes
// candidate
export default function ManyCandidates() {
	return (
		<div className="container">
			<h1>Vote Your Language!</h1>
			<section>
				{['Php', 'Python', 'Go', 'Java'].map((lang) => (
					<Candidate key={lang} lang={lang} />
				))}
			</section>
		</div>
	);
}

function Candidate({ lang }) {
	const [votes, setVotes] = useState(0);
	return (
		<section>
			<span className="votes">{votes}</span>
			<h1>{lang}</h1>
			<button onClick={() => setVotes(votes + 1)}>Click Here</button>
		</section>
	);
}

Candidate.propTypes = {
	lang: PropTypes.string.isRequired,
};
