import React, { Component } from 'react';
import ProjectTable from './ProjectTable.js';

class DataLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			loading: true,
		}
	}

	loadData() {
		this.setState({loading: true});
		fetch(this.props.endpoint)
			.catch(err => console.log('Error', err))
			.then(response => response.json())
			.then(data => {
				console.log('Navrátila se tato data', data);
				this.setState({
					loading:false,
					data: data.data,
				})
			})
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		console.log('state', this.state);
		if (this.state.loading) {
			return <div>Loading...</div>
		}
		return (
			<ProjectTable data={this.state.data} />
		)
	}
}

export default DataLoader
