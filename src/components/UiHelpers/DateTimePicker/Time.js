import React from 'react';
import InputSlider from 'react-input-slider';


export default ({selected, onSetTime, translations, isAM}) => (
    <div className="r-time tab-m is-active" style={{paddingBottom:"10px"}}>
        <div className="showtime">
            <span className="time">{selected.format(isAM ? "hh" :"HH")}</span>
            <span className="separater">:</span>
            <span className="time">{selected.format("mm")}</span>
            { isAM && (<span className="separater"></span>) }
            { isAM && (<span className="time">{Number(selected.format("HH"))>= 12 ? "PM" : "AM"}</span>) }

        </div>
        <div className="sliders">
            <div className="time-text">
                {translations.HOURS || "Часы"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('HH'))}
                xmax={23}
                onChange={onSetTime('hours')}
            />
            <div className="time-text">
                {translations.MINUTES || "Минуты"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('mm'))}
                xmax={59}
                onChange={onSetTime('minutes')}
            />
        </div>
    </div>
);
