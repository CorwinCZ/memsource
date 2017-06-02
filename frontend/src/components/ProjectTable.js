import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

// Renders data passed in data prop into table
class ProjectTable extends Component {
	render() {
		return (
			<Table
        selectable={false}
        multiSelectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={true}
          enableSelectAll={false}
        >
          <TableRow>
          	<TableHeaderColumn>Project Name</TableHeaderColumn>
          	<TableHeaderColumn>Source Language</TableHeaderColumn>
          	<TableHeaderColumn>Target language(s)</TableHeaderColumn>
          	<TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}
          stripedRows={true}
        >
        {this.props.data.map((row,idx) => (
          <TableRow rowNumber={idx} key={row.id}>
            <TableRowColumn>{row.name}</TableRowColumn>
            <TableRowColumn>{row.sourceLang}</TableRowColumn>
            <TableRowColumn>
            {
	            row.targetLangs.reduce((acc, item) => {
	            	return `${acc}, ${item}`;
	            }, '')
	            .slice(2)
            }
            	</TableRowColumn>
            <TableRowColumn>{row.status}</TableRowColumn>
          </TableRow>
        ))}
        </TableBody>
      </Table>
		)
	}
}

export default ProjectTable
