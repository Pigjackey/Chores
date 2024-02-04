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

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            index: this.props.index,
            year: this.props.year,
            month: this.props.month,
            date: this.props.date,
            fillers: this.initializeFillers(),
            currentKey: 0
        }
    }

    initializeFillers() {
        let weekday = [{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        let saturday = [{},{},{},{},{},{},{},{}]
        let sunday = [{},{},{}]

        if(this.props.name === 0) {
            return sunday
        } else if(this.props.name === 6) {
            return saturday
        } else {
            return weekday
        }
    }

    generateKey() {
        let key = this.state.currentKey
        this.setState({currentKey: key + 1})
        return key
    }

    getKey() {
        return this.state.currentKey
    }

    handleInput() {
        const newArray = this.state.todos
        const newFiller = this.state.fillers

        newArray.push(
                        <DoItem
                            key={this.generateKey()}
                            keyC={this.getKey()}
                            text={document.getElementById(this.state.index).value}
                            popOff={item => this.popDoItem(item)}
                        />
                    )
        newFiller.pop()

        this.setState({todos: newArray, fillers: newFiller})
        document.getElementById(this.state.index).value = ''
    }

    translateDay(input) {
        switch (input) {
            case 0: return 'Sun'
            case 1: return 'Mon'
            case 2: return 'Tue'
            case 3: return 'Wed'
            case 4: return 'Thu'
            case 5: return 'Fri'
            case 6: return 'Sat'
        }
    }

    translateDate(input) {
        switch (input) {
            case 1: return '01'
            case 2: return '02'
            case 3: return '03'
            case 4: return '04'
            case 5: return '05'
            case 6: return '06'
            case 7: return '07'
            case 8: return '08'
            case 9: return '09'
            case 10: return '10'
            case 11: return '11'
            case 12: return '12'
            case 13: return '13'
            case 14: return '14'
            case 15: return '15'
            case 16: return '16'
            case 17: return '17'
            case 18: return '18'
            case 19: return '19'
            case 20: return '20'
            case 21: return '21'
            case 22: return '22'
            case 23: return '23'
            case 24: return '24'
            case 25: return '25'
            case 26: return '26'
            case 27: return '27'
            case 28: return '28'
            case 29: return '29'
            case 30: return '30'
            case 31: return '31'
        }
    }

    translateMonth(input) {
        switch (input) {
            case 0: return '01'
            case 1: return '02'
            case 2: return '03'
            case 3: return '04'
            case 4: return '05'
            case 5: return '06'
            case 6: return '07'
            case 7: return '08'
            case 8: return '09'
            case 9: return '10'
            case 10: return '11'
            case 11: return '12'
        }
    }

    todayIsToday() {
        let date = new Date()
        return (this.state.date === date.getDate() && this.state.month === date.getMonth() && this.state.year === date.getFullYear())
    }

    popDoItem(keyC) {
        const newArray = this.state.todos
        const newFiller = this.state.fillers

        console.log(newArray, keyC)

        let index = newArray.findIndex(element => element.key === keyC.toString())
        newArray.splice(index, 1)
        newFiller.push({})

        console.log(newArray, index, keyC)

        this.setState({todos: newArray, fillers: newFiller})
    }

    render() {
        return (
            <div className="day">
                <div className={`title + ${this.todayIsToday() ? ' titleToday' : ''}`}>
                    <h2 className="titleDate">{`${this.translateMonth(this.state.month)}.${this.translateDate(this.state.date)}`}</h2>
                    <h2 className={`titleDay + ${this.todayIsToday() ? ' titleDayToday' : ''}`}>{this.translateDay(this.props.name)}</h2>
                </div>
                {
                    this.state.todos.map((todo) => {
                        return todo
                    })
                }
                <input
                    name={this.state.index}
                    id={this.state.index}
                    className="typeBox"
                    type="text"
                    onKeyDown={event => { if(event.key === 'Enter') {this.handleInput()}}}
                    onBlur={event => { if(event.target.value !== '') {this.handleInput()}}}
                />
                {
                    this.state.fillers.map((filler, i) => {
                        return <p key={i} className="filler" />
                    })
                }
            </div>
        )
    }
}

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: this.initializeAllDays(),
            plainDays: this.initializePlainDays(),
            currentSpot: this.initializeCurrentSpot()
        }
    }

    initializeAllDays() {
        const days = []

        let date = new Date(2022, 0, 1)

        for(let i = 0; i < 29200; i++) {
            days.push(<Day
                            key={`${date.getFullYear()} + ${date.getMonth()} + ${date.getDate()}`}
                            name={date.getDay()}
                            year={date.getFullYear()}
                            month={date.getMonth()}
                            date={date.getDate()}
                            index={i}
                        />)
            date.setDate(date.getDate() + 1)
        }

        return days
    }

    initializePlainDays() {
        const plainDays = []

        let date = new Date(2022, 0, 1)

        for(let i = 0; i < 29200; i++) {
            plainDays.push({date: date.getDate(), month: date.getMonth(), year: date.getFullYear()})

            date.setDate(date.getDate() + 1)
        }

        return plainDays
    }

    initializeCurrentSpot() {
        let oldDate = new Date(2022, 0, 1)
        let newDate = new Date()

        let daysBetween = Math.floor((newDate.getTime() - oldDate.getTime()) / (1000*60*60*24))

        switch (newDate.getDay()) {
            case 0: return daysBetween - 6
            case 1: return daysBetween
            case 2: return daysBetween - 1
            case 3: return daysBetween - 2
            case 4: return daysBetween - 3
            case 5: return daysBetween - 4
            case 6: return daysBetween - 5
        }
    }

    translateMonthLong(input) {
        switch (input) {
            case 0: return 'January'
            case 1: return 'February'
            case 2: return 'March'
            case 3: return 'April'
            case 4: return 'May'
            case 5: return 'June'
            case 6: return 'July'
            case 7: return 'August'
            case 8: return 'September'
            case 9: return 'October'
            case 10: return 'November'
            case 11: return 'December'
        }
    }

    handleBack() {
        this.setState({currentSpot: this.state.currentSpot - 7})
        this.setState({days: this.state.allDays.slice(this.state.currentSpot, this.state.currentSpot + 7)})
    }

    handleForward() {
        this.setState({currentSpot: this.state.currentSpot + 7})
        this.setState({days: this.state.allDays.slice(this.state.currentSpot, this.state.currentSpot + 7)})
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
root.render(<Week />);