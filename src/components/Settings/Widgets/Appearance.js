import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { TwitterPicker } from 'react-color';
import WidgetPreview from './WidgetPreview';


@withRouter
@observer
export default class Appearance extends Component {

    state = {
        headerColor: '#ffffff',
        headerTextColor: '#888888',
        descriptionTextColor: '#888888',
        openAfterSeconds: 0,
        widgetDescription: '',
        widgetHeader: '',
        isPreviewModalOpen: false
    }

    onColorChange = (color, element) => {
        this.setState({
            ...this.state,
            [element]: color.hex
        });
    }

    onOpenAfterSeconds = e => {
        console.log(e.target.value);
        this.setState({
            ...this.state,
            openAfterSeconds: e.target.value
        });
    }

    onWidgetDescriptionChange = e => {

    }

    onValueChange = (e, name) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    openPreview = () => {
        this.setState({
            ...this.state,
            isPreviewModalOpen: true
        });
    }

    handleOpenPreview = () => {
        this.setState({
            ...this.state,
            isPreviewModalOpen: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Внешний вид виджета</h3>
                </div>

                <div className="row">
                    <div className="col-6">
                        <form className="pt-3">
                            <div className="form-group">
                                <label htmlFor="inputWidgetHeader">Заголовок</label>
                                <input
                                    type="text"
                                    placeholder="Заголовок"
                                    className="form-control form-control-lg"
                                    id="inputWidgetHeader"
                                    value={this.state.widgetHeader}
                                    onChange={e => { this.onValueChange(e, 'widgetHeader'); }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Фоновый цвет заголовка</label>
                                <TwitterPicker
                                    triangle='hide'
                                    width='100%'
                                    colors={[
                                        '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC',
                                        '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#FFFFFF',
                                        '#B66DFF'
                                    ]}
                                    color={this.state.color}
                                    onChangeComplete={color => { this.onColorChange(color, 'headerColor'); }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Цвет текста в заголовке</label>
                                <TwitterPicker
                                    triangle='hide'
                                    width='100%'
                                    colors={[
                                        '#FF6900', '#FCB900', '#333333', '#00D084', '#8ED1FC',
                                        '#0693E3', '#ABB8C3', '#EB144C', '#888888', '#FFFFFF',
                                        '#B66DFF'
                                    ]}
                                    color={this.state.color}
                                    onChangeComplete={color => { this.onColorChange(color, 'headerTextColor'); }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputWidgetDescription">Описание</label>
                                <textarea
                                    type="text"
                                    placeholder="Описание..."
                                    className="form-control form-control-lg"
                                    id="inputWidgetDescription"
                                    spellCheck={false}
                                    rows={4}
                                    value={this.state.widgetDescription}
                                    onChange={e => { this.onValueChange(e, 'widgetDescription'); }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Цвет текста в описании</label>
                                <TwitterPicker
                                    triangle='hide'
                                    width='100%'
                                    colors={[
                                        '#FF6900', '#FCB900', '#333333', '#00D084', '#8ED1FC',
                                        '#0693E3', '#ABB8C3', '#EB144C', '#888888', '#FFFFFF',
                                        '#B66DFF'
                                    ]}
                                    color={this.state.color}
                                    onChangeComplete={color => { this.onColorChange(color, 'descriptionTextColor'); }}
                                />
                            </div>
                            {/*
                            <div className="form-group">
                                <select id="inputCountry" className="form-control form-control-lg">
                                    <option>Выбрать страну</option>
                                    <option>Россия</option>
                                    <option>Украина</option>
                                    <option>Казахстан</option>
                                    <option>Беларусь</option>
                                    <option>Китай</option>
                                </select>
                            </div>
                            */}
                            <div className="form-group">
                                <label htmlFor="inputWidgetOpenAfterMillis">Показывать через {parseInt(this.state.openAfterSeconds, 10) || 0} секунд</label>
                                <input
                                    type="number"
                                    placeholder="Показывать через..."
                                    className="form-control form-control-lg"
                                    id="inputWidgetOpenAfterMillis"
                                    min="0"
                                    step="1"
                                    value={this.state.openAfterSeconds}
                                    onInput={e => { this.onValueChange(e, 'openAfterSeconds'); }}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="col-6">
                        <button
                            className="btn btn-light mb-3 d-flex mx-auto"
                            onClick={this.openPreview}
                        >
                            Предпросмотр
                        </button>
                        <br/>
                        <WidgetPreview
                            {...this.state}
                            links={this.props.links ? this.props.links : []}
                            openPreview={this.handleOpenPreview}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
