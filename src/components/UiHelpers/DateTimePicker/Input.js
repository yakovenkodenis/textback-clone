import React from 'react';
import InputMask from 'react-input-mask';


const setMask = (format, readOnly) => {
    if(readOnly)
        return "";

    const reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

export default ({defaults, onClick, onTextChange, className, style}) => (
    <div className={(!defaults.readOnly && !defaults.isValid) ? "r-input-group r-has-feedback r-has-error" : "r-input-group"}>
        <InputMask
            className={className}
            style={style}
            placeholder={defaults.format}
            value={defaults.value}
            onClick={!defaults.icon ? onClick: null}
            onChange={onTextChange}
            mask={setMask(defaults.format, defaults.readOnly)}
            readOnly={defaults.readOnly}/>
        {defaults.icon && <div style={{cursor:'pointer', width: 'auto', display: 'table-cell', position: 'relative'}} className="r-input-group-addon" onClick={onClick}><i className="fa fa-calendar" /></div>}
    </div>
);
