import React, { Component } from 'react';
import axios from 'axios';
import styles from './nav.module.css'
import State from './state_wise';
import getTime from './getTime';
import Search from './Search'
export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: [],
            update: "",
            data: []
        }
    }

    searchData = (name) => {
        let datas = this.state.data;
        name = name.toLowerCase();
        console.log(name)
        for (let k = 0; k < datas.length; k++) {
            let str = datas[k].state.toLowerCase();
            if (!str.includes(name))
                delete datas[k]
            //console.log(datas[k].state + " " + n)
        }
        console.log(datas)

    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/data.json')
            .then(res => {
                this.setState({ total: res.data.statewise[0] })

                let arr = []
                let id = 1;
                let state_datas = res.data.statewise;
                state_datas.shift();
                state_datas.map((item) => { return item.id = id++ })
                arr.push(state_datas)

                //appnd district datas to state
                axios.get("https://api.covid19india.org/state_district_wise.json").then(res => {

                    let datas = arr[0];
                    for (let i = 0; i < state_datas.length; i++) {
                        let result = res.data[state_datas[i].state];
                        let id = 1;
                        if (result) {
                            result = Object.entries(result.districtData);
                            //appnd id to array
                            for (let i = 0; i < result.length; i++)
                                result[i].unshift(id++)
                            result.sort(function (a, b) {
                                return b[2].confirmed - a[2].confirmed;
                            });

                            var dist_time = getTime(datas[i].lastupdatedtime);
                            let dist_seconds = parseInt((dist_time / 1000) % 60)
                            let dist_minutes = parseInt((dist_time / (1000 * 60)) % 60)
                            let dist_hours = parseInt((dist_time / (1000 * 60 * 60)) % 24);

                            if (dist_hours < 1 && dist_minutes < 1) {
                                datas[i].update = `Last updated ${dist_seconds} seconds ago`
                            }
                            else if (dist_hours < 1) {
                                datas[i].update = `Last updated ${dist_minutes} minutes ago`
                            }
                            else if (dist_hours > 0) {
                                datas[i].update = `Last updated ${dist_hours} hours ago`
                            }
                            state_datas[i].dist = result;
                            id++;
                        }
                    }
                    this.setState({ data: state_datas });
                })

                var time = getTime(res.data.statewise[0].lastupdatedtime);
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
                    <h1>India Corona Details</h1>
                    <div className={styles.update}>{this.state.update}</div>
                </div>
                <div className={styles.cont}>
                    <div className={styles.container} style={{ color: 'brown' }}>
                        <p>Active</p>
                        <p style={{ visibility: 'hidden' }}>.</p>
                        <p className={styles.text}>{total.active}</p>
                    </div>
                    <div className={styles.container} style={{ color: 'red' }}>
                        <p>Confirmed</p>
                        <p className={styles.text1}>[+{total.deltaconfirmed}]</p>
                        <p className={styles.text}>{total.confirmed}</p>
                    </div>
                    <div className={styles.container} style={{ color: 'blue' }}>
                        <p>Deaths</p>
                        <p className={styles.text1}>[+{total.deltadeaths}]</p>
                        <p className={styles.text}>{total.deaths}</p>
                    </div>
                    <div className={styles.container} style={{ color: 'green' }}>
                        <p>Recovered</p>
                        <p className={styles.text1}>[+{total.deltarecovered}]</p>
                        <p className={styles.text}>{total.recovered}</p>
                    </div>
                </div>
                <Search searchData={this.searchData} />
                <State data={this.state.data} />
            </div >
        )
    }
}