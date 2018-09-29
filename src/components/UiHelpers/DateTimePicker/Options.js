import React from 'react';

export default ({activeTab, onActiveTab, translations}) => (<div className="options">
        <button
            className={"btn btn-info ion-ios-calendar im-btn" + ((activeTab===0 || activeTab===2) ? " is-active" : "")}
            onClick={()=> {onActiveTab(0)}}
        >
        <i className="mdi mdi-calendar-blank mr-2" />
            {translations.DATE || "Дата"}
        </button>
        <button
            className={"btn btn-info btn-icon-text im-btn" + (activeTab===1 ? " is-active" : "")}
            onClick={()=> {onActiveTab(1)}}
        >
            <i className="mdi mdi-clock mr-2" />
            {translations.TIME || "Время"}
        </button>
    </div>
);
