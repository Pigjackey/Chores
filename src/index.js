import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataGrid } from '@mui/x-data-grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faTrash, faCircleArrowLeft, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import './index.css';

class Chore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            lastDone: new Date('2/2/2024'),
            timesDone: {},
            frequency: this.props.frequency
        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

class Chores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: this.initCols(),
            rows: this.initRows()
        }
    }

    initCols() {
        return [
            { field: 'name', headerName: 'Name', width: 70 },
            { field: 'lastDone', headerName: 'Last Time Done', width: 130 },
            {
                field: 'freq',
                headerName: 'Frequency',
                type: 'number',
                width: 90,
            },
            {
                field: 'state',
                headerName: 'Urgency',
                width: 160,
                valueGetter: (params) =>
                `${params.row.lastDone || ''}`,
            }
        ]
    }

    initRows() {
        return [

        ]
    }

    render() {
        return (
            <div>
                <div className="topBar">
                    <h1>{'Hi, this is the Chores app. There\'s not a lot going on yet, but we\'ll get there :)'}</h1>
                </div>
                <div className="screen">
                    <DataGrid
                        rows={this.state.rows}
                        columns={this.state.cols}
                    />
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Chores />);