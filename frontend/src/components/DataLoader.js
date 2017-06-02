import React, { Component } from 'react';
import ProjectTable from './ProjectTable.js';
import RaisedButton from 'material-ui/RaisedButton';

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
		let requestData = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: this.props.token,
			}),
		}
		fetch(this.props.endpoint, requestData)
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
			<div>
				<RaisedButton className="Margin-top" label="Reload table" primary={true} onClick={this.loadData.bind(this)}/>
				<ProjectTable data={this.state.data} />
			</div>
		)
	}
}

export default DataLoader
