import React from 'react';

function replaceMonths(value, translation) {
    const values = value.split(" ");
    const tValue = translation["MONTHS_" + values[0].toUpperCase()];
    return tValue ? tValue + (values[1] ? (" " + values[1]) : "")  : value;
}

function replaceDays(value, translation) {
    return translation["DAYS_" + value.toUpperCase()] || value;
}

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
                'Июнь', 'Июль', 'Август', 'Сентябрь',
                'Октябрь', 'Ноябрь', 'Декабрь'
];
export default ({defaults, add, onActiveTab, onClick, isDisabled, translations}) => (
    <div className="r-calendar tab-m is-active">
        <div className="toolbar">
            <button className="prev-month" onClick={add(-1, 'month')}>
                <i className="mdi mdi-chevron-left"></i>
            </button>
            <span className="current-date react-textselect" style={{marginRight:"-5px"}}>
                {replaceMonths(defaults.selected.format("MMMM YYYY"), translations)}
                {defaults.monthSelect && (<select className='react-textselect-input'
                        onChange={({target})=>{ onClick(defaults.selected.clone().month(target.value))}}
                        value={Number(defaults.selected.format("MM")) -1 }>
                {MONTHS.map((x, index)=> (<option value={index}
                                                  disabled={isDisabled(defaults.min, defaults.max, defaults.selected.clone().month(x), defaults.date, x)}
                                                  key={index}>{replaceMonths(x, translations)}
                                                  </option>))}
                </select>)}
            </span>
            <button className="next-month" onClick={add(1, 'month')}>
                <i className="mdi mdi-chevron-right"></i>
            </button>
            <button className="next-month" style={{marginRight:"5px"}} onClick={(e)=> {onActiveTab(2); e.stopPropagation();}}>
                <i className="mdi mdi-chevron-down" aria-hidden="true"></i>
            </button>
        </div>
        <table>
            <thead>
            <tr>
                {defaults.months.map((x, i)=> (
                    <td key={i}>{replaceDays(x, translations)}</td>
                ))}
            </tr>
            </thead>
            <tbody>
            {defaults.days.map((items, index) => (<tr key={index}>
                {items.map((x, iIndex)=> (<td key={index + "" + iIndex}
                                              className={isDisabled(defaults.min, defaults.max, defaults.selected.clone().date(x), defaults.date, x)}
                                              onClick={()=> x!=="" && onClick(defaults.selected.clone().date(x))}>{x}</td>))}
            </tr>))}
            </tbody>
        </table>
    </div>
);
