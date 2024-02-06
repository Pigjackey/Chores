import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataGrid } from '@mui/x-data-grid';
import './index.css';

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
            {
                field: 'name',
                headerName: 'Name',
                width: 70,
                flex: .5,
            },
            {
                field: 'lastDone',
                headerName: 'Last Time Done',
                width: 130,
                flex: .7,
                valueFormatter: params => params.value.toLocaleDateString(),
            },
            {
                field: 'freq',
                headerName: 'Frequency',
                type: 'number',
                width: 90,
                flex: .3,
            },
            {
                field: 'state',
                headerName: 'Urgency',
                width: 160,
                valueGetter: (params) =>  Math.round((Date.now() - params.row.lastDone) / (1000 * 60 * 60 * 24)) / params.row.freq,
                flex: 1,
            }
        ]
    }

    initRows = () => {
        var rows = []

        rows.push(this.initChore('Sweep', 5))

        return rows
    }

    initChore(name, freq) {
        return { name: name, lastDone: new Date('2/2/2024'), timesDone: [], freq: freq }
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
                        getRowId={(row) => row.name}
                    />
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Chores />);