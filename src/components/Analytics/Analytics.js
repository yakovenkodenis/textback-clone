import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Line, Bar, Scatter, Pie } from 'react-chartjs-2';


@withRouter
@observer
export default class Analytics extends Component {

    render() {

        const data = {
            labels: [
                'Январь', 'Февраль', 'Март',
                'Апрель', 'Май', 'Июнь', 'Июль',
                'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'
            ],
            datasets: [{
                label: 'Тестовый график',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40, 74, 91, 11, 41, 28]
            }]
        };


        const scatterData = {...data};
        scatterData.labels = ['Scatter']
        scatterData.datasets[0].data = [
            { x: 65, y: 75 },
            { x: 59, y: 49 },
            { x: 25, y: 34 },
            { x: 16, y: 55 },
            { x: 65, y: 87 },
            { x: 16, y: 95 },
            { x: 63, y: 12 },
            { x: 42, y: 75 },
            { x: 65, y: 65 },
            { x: 81, y: 15 },
            { x: 47, y: 14 },
            { x: 18, y: 85 }
        ];

        const pieData = {
            labels: ['Большинство', 'Меньшинство'],
            datasets: [{
                data: [76, 24],
                backgroundColor: [ '#ff6384', '#36a2eb' ],
                hoverBackgroundColor: [ '#ff6384', '36a2eb' ]
            }]
        };
        

        return (
            <React.Fragment>

                <div className="page-header">
                    <h3 className="page-title">Аналитика</h3>
                </div>

                <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">Линии</div>
                            <Line data={data} />
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">Столбики</div>
                            <Bar data={data} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">Точки</div>
                            <Scatter data={scatterData} />
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">Бублик</div>
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
