import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// number of votes

// candidate
class Candidate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			votes: Array(4).fill(0),
		};
	}

	buttonClick(i) {
		const votes = this.state.votes.slice();
		votes[i]++;
		this.setState({
			votes: votes,
		});
	}

	renderCandidate(lang, i) {
		return (
			<section>
				<span className="votes">{this.state.votes[i]}</span>
				<h1>{lang}</h1>
				<button onClick={() => this.buttonClick(i)}>Click Here</button>
			</section>
		);
	}

	render() {
		return (
			<div className="container">
				<h1>Vote Your Language!</h1>
				<section>
					{this.renderCandidate('Php', 0)}
					{this.renderCandidate('Python', 1)}
					{this.renderCandidate('Go', 2)}
					{this.renderCandidate('Java', 3)}
				</section>
			</div>
		);
	}
}

ReactDOM.render(<Candidate />, document.getElementById('root'));
