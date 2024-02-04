import React from 'react';
import ReactDOM from 'react-dom/client';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faTrash, faCircleArrowLeft, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import './index.css';

class DoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyC: this.props.keyC,
            text: this.props.text,
            tempText: this.props.text,
            checked: false,
            clicked: false,
            colorMenu: false,
            color: '#FFF',
            textColor: '#000',
            colorList: [
                {color: '#FFF', text: '#000'},
                {color: '#000', text: '#FFF'},
                {color: '#FDEF5D', text: '#000'},
                {color: '#F9FBB6', text: '#000'},
                {color: '#0F580F', text: '#FFF'},
                {color: '#088E08', text: '#FFF'},
                {color: '#38F5B5', text: '#000'},
                {color: '#B1F7E0', text: '#000'},
                {color: '#E00052', text: '#FFF'},
                {color: '#932dd8', text: '#FFF'},
                {color: '#F98AEB', text: '#000'},
                {color: '#D6A8F9', text: '#000'},
                {color: '#0040ff', text: '#FFF'},
                {color: '#0DABFB', text: '#FFF'},
                {color: '#F3A0A5', text: '#000'},
                {color: '#F5C69D', text: '#000'},
            ]
        }
    }

    handleClickClose() {
        this.setState({clicked: false, colorMenu: false, text: this.state.tempText})
    }

    handleClickColor(color, textColor) {
        //document.documentElement.style.setProperty('--textColor', value);
        this.setState({color: color, textColor: textColor})
    }

    doPopOff() {
        this.handleClickClose()
        this.props.popOff(this.state.keyC)
    }

    render() {
        return (
            <div>
                <div className="doItem">
                    <p
                        className={`doItemText + ${this.state.checked ? ' doItemTextDone' : ''}`}
                        onClick={() => this.setState({clicked: true})}
                        style={{ background: this.state.color, color: this.state.textColor }}
                    >
                        {this.state.text}
                    </p>
                    <div className={`doItemCheck + ${this.state.checked ? ' doItemCheckDone' : ''}`}
                         onClick={ () => this.setState({ checked: !this.state.checked }) }>
                        <div className={`doItemCheckInner + ${this.state.checked ? ' doItemCheckInnerDone' : ''}`}/>
                    </div>
                </div>
                {this.state.clicked &&
                    <div>
                        <div className="dimScreen" onClick={() => this.handleClickClose()} />
                        <div className="editScreen" onClick={event => {if (event.target.getAttribute('class').toString() === 'editScreen') {this.setState({colorMenu: false})}}}>
                            <div className="editScreenBar">
                                <p>This is the date</p>
                                <div className="editScreenIcons">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => this.doPopOff()} className="editScreenTrashIcon" />
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="editScreenColorIcon"
                                        onClick={() => this.setState({colorMenu: true})}
                                        color={this.state.color}
                                    />
                                </div>
                            </div>
                            { this.state.colorMenu &&
                                <div className="editScreenColorPicker">
                                    {
                                        this.state.colorList.map((color, i) => {
                                            return <FontAwesomeIcon
                                                        key={i}
                                                        icon={faCircle}
                                                        className="editScreenColorPickerIcon"
                                                        color={color.color}
                                                        onClick={() => this.handleClickColor(color.color, color.text)}
                                                    />
                                        })
                                    }
                                </div>
                            }
                            <div className="editScreenEditor">
                                <input
                                    className={`editScreenInput + ${this.state.checked ? ' editScreenInputDone' : ''}`}
                                    type="text"
                                    defaultValue={this.state.text.slice()}
                                    onChange={e => this.setState({tempText: e.target.value})}
                                />
                                <div className={`editScreenCheck + ${this.state.checked ? ' editScreenCheckDone' : ''}`}
                                     onClick={ () => this.setState({ checked: !this.state.checked }) }>
                                    <div className={`editScreenCheckInner + ${this.state.checked ? ' editScreenCheckInnerDone' : ''}`}/>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

class Chores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "this.initializeCurrentSpot()"
        }
    }

    render() {
        return (
            <div>
                <div className="topBar">
                    <h1 onClick={() => this.setState({currentSpot: this.initializeCurrentSpot()})}>{`${this.translateMonthLong(this.state.plainDays[this.state.currentSpot].month)} ${this.state.plainDays[this.state.currentSpot].year}`}</h1>
                    <div className="topBar">
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="topBarIcon fa-2xl"
                            onClick={() => this.handleBack()}
                        />
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className="topBarIcon fa-2xl"
                            onClick={() => this.handleForward()}
                        />
                    </div>
                </div>
                <div className="screen">
                    <div className="screenMon">
                        { this.state.allDays[this.state.currentSpot] }
                    </div>
                    <div className="screenTue">
                        { this.state.allDays[this.state.currentSpot + 1] }
                    </div>
                    <div className="screenWed">
                        { this.state.allDays[this.state.currentSpot + 2] }
                    </div>
                    <div className="screenThu">
                        { this.state.allDays[this.state.currentSpot + 3] }
                    </div>
                    <div className="screenFri">
                        { this.state.allDays[this.state.currentSpot + 4] }
                    </div>
                    <div className="screenWeekend">
                        { this.state.allDays[this.state.currentSpot + 5] }
                        { this.state.allDays[this.state.currentSpot + 6] }
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Chores />);