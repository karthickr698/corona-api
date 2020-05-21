import React, { Component } from 'react';
import axios from 'axios';
import styles from './nav.module.css'
import Country from './Country'
import getTime from './getTime'

export default class CountryTotal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: [],
            update: "",
            data: []
        }
    }

    componentDidMount() {
        axios.get('https://api.covid19api.com/summary')
            .then(res => {
                console.log(res.data)
                this.setState({ total: res.data.Global })

                let id = 1;
                let datas = res.data.Countries;
                datas.map((item) => { return item.id = id++ })
                datas.sort((a, b) => {
                    return b.TotalConfirmed - a.TotalConfirmed;
                })

                this.setState({ data: datas });
                let date = res.data.Date
                var time = getTime(date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 5) + " 00:00:00");
                console.log(time)
                let seconds = parseInt((time / 1000) % 60)
                let minutes = parseInt((time / (1000 * 60)) % 60)
                let hours = parseInt((time / (1000 * 60 * 60)) % 24);

                if (hours < 1 && minutes < 1) {
                    this.setState({ update: `Last updated ${seconds} seconds ago` })
                }

                else if (hours < 1) {
                    this.setState({ update: `Last updated ${minutes} minutes ago` })
                }

                else if (hours > 0) {
                    this.setState({ update: `Last updated ${hours} hours ago` })
                }
            })
    }

    render() {
        let { total } = this.state;
        return (
            <div>
                <div>
                    <h1 >Country Wise Corona Details</h1>
                    <div className={styles.counupdate}>{this.state.update}</div>
                </div>
                <div className={styles.cont}>
                    <div className={styles.container1} style={{ color: 'red' }}>
                        <p>Confirmed</p>
                        <p className={styles.text1}>[+{total.NewConfirmed}]</p>
                        <p className={styles.text}>{total.TotalConfirmed}</p>
                    </div>
                    <div className={styles.container1} style={{ color: 'blue' }}>
                        <p>Deaths</p>
                        <p className={styles.text1}>[+{total.NewDeaths}]</p>
                        <p className={styles.text}>{total.TotalDeaths}</p>
                    </div>
                    <div className={styles.container1} style={{ color: 'green' }}>
                        <p>Recovered</p>
                        <p className={styles.text1}>[+{total.NewRecovered}]</p>
                        <p className={styles.text}>{total.TotalRecovered}</p>
                    </div>
                </div>
                <Country data={this.state.data} />
            </div >
        )
    }
}