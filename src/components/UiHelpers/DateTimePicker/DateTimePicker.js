import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from './Date';
import YearPicker from './Year';
import TimePicker from './Time';
import Options from './Options';
import Input from './Input';

import './style.css'

export class MomentInput extends Component {
    constructor(props) {
        super(props);

        this._id = Math.random().toString();
        this.state = {
            selected: (props.value || moment()).clone(),
            activeTab: props.tab,
            date:props.value,
            textValue: "",
            isValid: true,
            isOpen:props.isOpen
        };

        this.onDayClick = this.onDayClick.bind(this);
        this.onActiveTab = this.onActiveTab.bind(this);
        this.onSetTime = this.onSetTime.bind(this);

        this.inputClick = this.inputClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        this.defaultTime = this.props.defaultTime;
        let date = this.props.defaultValue;
        if (this.props.defaultTime && date)
            date = new moment(date.format("YYYY-MM-DD ") + this.defaultTime);

        if (date)
            this.setState({date: date, selected: date});
    }

    add(next, type) {
        const self = this;
        return function () {
            self.setState({selected: self.state.selected.add(type, next)});
        }
    }

    onDayClick(date) {
        const {min, max, format} = this.props;

        if(this.defaultTime)
            date = new moment(date.format("YYYY-MM-DD ") + this.defaultTime);

        if (!this.isValid(min,max, date, date.format(format), false, "day"))
            return;

        this.setState({date, selected: date, isValid: true});
        if (this.props.onChange)
            this.props.onChange(date, this.props.name);
    }

    onActiveTab(tab) {
        this.setState({activeTab: tab});
    }

    onSetTime(type) {
        const self = this;
        return function ({x}) {
            self.state.selected.set(type, x);
            self.defaultTime = null;
           /* const {min, max, format} = self.props;
            if (!self.isValid(min,max, self.state.selected, self.state.selected.format(format), false, "minutes"))
                return self.setState({isValid: false});*/

            if (self.state.date) {
                self.state.date.set(type, x);

                if (self.props.onChange)
                    self.props.onChange(self.state.date, self.props.name);
            }

            self.setState({
                selected: self.state.selected,
                date: self.state.date,
                isValid: self.state.date ? true : self.state.isValid
            });
        }
    }

    isDisabled(min, max, selected, date, value, isYear) {
        if (!this.isValid(min,max, selected, value, isYear, "day"))
            return "disabled-day";
        else if (date && (selected.format("YYYY-MM-DD") === date.format("YYYY-MM-DD") ||
            (isYear && selected.format("YYYY") === date.format("YYYY"))))
            return "selected-day";
        else
            return "";
    }

    isValid(min, max, selected, value, isYear, type = "day"){
        return !(!isYear && (value==="" || (min && selected.diff(min, type) < 0) || (max && selected.diff(max, type)>0)))
    }

    inputClick(e) {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});

        if (isOpen)
            return window.removeEventListener('click', this.onClose);

        const {onChange, onClose} = this.props;
        if (onChange || onClose)
            window.addEventListener('click', this.onClose);

       // e.stopPropagation();
    }

    onClose(e) {
        if (this.node.contains(e.target))
            return;

        const {onClose, name} = this.props;
        this.setState({isOpen: false});
        window.removeEventListener('click', this.onClose);

        const {date} = this.state;
        if (onClose)
            onClose(date, name);
    }

    get Years(){
        const {selected} = this.state;
        let year = Number(selected.format("YYYY"));
        let items = [];

        let i=0;
        do {
            if ((i) % 3 === 0)
                items.push([]);

            items[items.length - 1].push(year++);
            i++;
        } while (i < 12);

        return items;
    }

    get Days() {
        const {daysOfWeek} = this.props;
        const {selected} = this.state;
        const first = selected.clone().date(1);

        const days = first.daysInMonth();
        const index = daysOfWeek.findIndex(x=> x === first.format('ddd'));

        let items = [];
        let nextDay = 1;
        let i = 0;
        do {
            if ((i) % 7 === 0)
                items.push([]);

            items[items.length - 1].push(i < index ? "" : nextDay++);
            i++;
        } while (nextDay <= days);

        const length = items[items.length - 1].length;
        for (let i = length; i < 7; i++)
            items[items.length - 1].push("");

        return items;
    }

    onTextChange(e) {
        let val = e.target.value;

        const {onChange, name, min, max, format} = this.props;

        let nFormat;
        if(format[format.length -1].toUpperCase()==="A")
            nFormat = format.replace("A","").replace("a","");
        else
            nFormat = format;


        let item = moment(val, nFormat, true);

        if (!item.isValid() || !this.isValid(min, max, item, val, false, "minutes"))
            return this.setState({textValue: val, date: null, isValid: false});

        if (onChange)
            onChange(item, name);

        this.setState({selected: item, date: item, textValue: val, isValid: true});
    }

    renderTab(){
        const {min, max, translations, daysOfWeek, format, monthSelect} = this.props;
        const {selected, activeTab, date} = this.state;
        switch (activeTab){
            case 1:
                return (<TimePicker
                    selected={selected}
                    onSetTime={this.onSetTime}
                    translations={translations}
                    isAM={format.indexOf("hh")!==-1}
                />);
            case 2:
                return (<YearPicker
                    defaults={{selected, min, max, date, years: this.Years}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                    translations={translations}
                />);
            default:
                return (<DatePicker
                    defaults={{selected, min, max, date, monthSelect, days: this.Days, months: daysOfWeek}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                    translations={translations}
                />)
        }
    }

    render() {
        const { options, onSave, today, value, style, className, inputClassName, inputStyle, name, readOnly, format, icon, translations, position} = this.props;
        const {selected, activeTab, date, isOpen, textValue, isValid} = this.state;
        let inputValue = value ? value.format(format) : (date ? date.format(format) : "");
        return (
            <div style={{
              ...style,
              display: this.props.isOpen ? 'block' : 'none'
            }} className={className} ref={node => this.node = node}>
                <Input
                    defaults={{readOnly, isValid, format, icon, value:(inputValue || textValue)}}
                    onClick={this.inputClick}
                    onTextChange={this.onTextChange}
                    className={inputClassName}
                    style={this.props.isMobile ? {...inputStyle, width: '10rem'} : {inputStyle}}
                />
                {isOpen &&
                <div className="r-input-moment" id={this._id} style={position === "bottom" ? {} : { display:"inline-block"}}>
                    {options && <Options
                        activeTab={activeTab}
                        onActiveTab={this.onActiveTab}
                        translations={translations} />}
                    <div className="tabs">
                        {this.renderTab()}
                    </div>
                    {today && <button className="btn btn-info im-btn btn-save" onClick={()=> {this.onDayClick(moment())}}>{translations.TODAY || "Сегодня"}</button>}
                    {onSave && <button className="btn btn-info im-btn btn-save" onClick={()=> {this.setState({isOpen:false}); onSave(date || selected, name)}}>{translations.SAVE || "Сохранить"}</button>}
                </div>}
            </div>
        );
    }
}

MomentInput.defaultProps = {
    tab: 0,
    isOpen: false,
    options: true,
    readOnly:true,
    monthSelect:true,
    position:"bottom",
    today:false,
    translations: {},
    icon:false,
    format:"YYYY-MM-DD HH:mm",
    inputClassName:"r-input",
    daysOfWeek:['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
};

MomentInput.propTypes = {
    name: PropTypes.string,
    format: PropTypes.string,
    position: PropTypes.string,
    readOnly: PropTypes.bool,
    monthSelect: PropTypes.bool,
    today: PropTypes.bool,
    translations: PropTypes.object,
    daysOfWeek: PropTypes.array,
    icon: PropTypes.bool,
    min: PropTypes.instanceOf(moment),
    max: PropTypes.instanceOf(moment),
    options: PropTypes.bool,
    tab: PropTypes.number,
    isOpen: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    value:PropTypes.instanceOf(moment),
    defaultValue:PropTypes.instanceOf(moment),
    defaultTime:PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object
};

export default MomentInput;
