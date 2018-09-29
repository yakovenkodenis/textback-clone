import React from 'react';

export default ({defaults, add, onActiveTab, onClick, isDisabled, translations}) => (
    <div className="r-calendar tab-m is-active">
        <div className="toolbar">
            <button className="prev-month" onClick={add(-12,'year')}>
                <i className="mdi mdi-chevron-left"></i>
            </button>
            <span className="current-date" style={{marginRight:"-5px"}}>
                {translations.YEARS || "Год"}
                        </span>
            <button className="next-month" onClick={add(12,'year')}>
                <i className="mdi mdi-chevron-right"></i>
            </button>
            <button className="next-month" style={{marginRight:"5px"}} onClick={(e)=> {onActiveTab(0); e.stopPropagation();}}>
                <i className="mdi mdi-chevron-up"></i>
            </button>
        </div>
        <table>
            <tbody>
            {defaults.years.map((items, index) => (<tr key={index}>
                {items.map((x, iIndex)=> (<td key={index + "" + iIndex}
                                              className={isDisabled(defaults.min, defaults.max, defaults.selected.clone().year(x), defaults.date, x, false)}
                                              onClick={()=> onClick(defaults.selected.clone().year(x))}
                >{x}</td>))}
            </tr>))}
            </tbody>
        </table>
    </div>
);
