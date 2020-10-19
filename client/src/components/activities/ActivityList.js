import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities, createActivityInstance } from '../../actions';
import { withRouter } from 'react-router-dom';

import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AiFillHeart } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

import './ActivityList.css';

class ActivityList extends Component {
	state = { term: '', activityTitles: [] };

	componentDidMount() {
		this.props.fetchActivities();
	}

	dynamicSearch = () => {
		return this.props.activities.activityTitles.filter((title) =>
			title.toLowerCase().includes(this.state.term.toLowerCase())
		);
	};

	returnSplitActivityList = () => {
		let index = 0;
		let arrayLength = this.props.activities.length;
		let tempArray = [];

		for (index = 0; index < arrayLength; index += 4) {
			let myChunk = this.props.activities.slice(index, index + 4);
			if (myChunk.length !== 1) {
				tempArray.push(myChunk);
			} else {
				tempArray[tempArray.length - 1].push(myChunk[0]);
			}
		}

		return tempArray;
	};

	renderCards(row) {
		return row.map((activity) => {
			if (
				!activity.title
					.toLowerCase()
					.includes(this.state.term.toLowerCase())
			) {
				return false;
			}

			return (
				<Card
					border="primary"
					style={{ width: '18rem' }}
					key={activity.title}
				>
					<Card.Body
						style={{ cursor: 'pointer' }}
						onClick={() => {
							this.props.createActivityInstance(
								activity,
								this.props.history,
								true
							);
						}}
					>
						<Card.Title>{activity.title}</Card.Title>
						<Card.Text>{activity.description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<AiFillHeart />
						<FiUsers />
					</Card.Footer>
				</Card>
			);
		});
	}

	renderCardRow = (oneRow) => {
		return (
			<CardDeck key={oneRow[0].title}>
				{this.renderCards(oneRow)}
			</CardDeck>
		);
	};

	render() {
		let activitiesSplit = this.returnSplitActivityList();
		return (
			<div>
				<Form.Group>
					<Form.Control
						size="lg"
						type="text"
						placeholder="Search For An Activity"
						value={this.state.term}
						onChange={(e) =>
							this.setState({ term: e.target.value })
						}
					/>
					<br />
				</Form.Group>
				{activitiesSplit.map((oneRow) => this.renderCardRow(oneRow))}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { activities: state.activities };
}

export default connect(mapStateToProps, {
	fetchActivities,
	createActivityInstance
})(withRouter(ActivityList));
