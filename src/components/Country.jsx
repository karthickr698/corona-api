import React, { Component } from 'react';
import style from './nav.module.css';
import { Icon, Up, Down } from './Icon'


export default class Country extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bt1: true,
            bt3: false,
            bt4: true,
            bt5: true,

        }
    }


    handle = (e) => {
        let datas = this.props.data;
        const { bt1, bt3, bt4, bt5 } = this.state;
        switch (e.target.name) {
            case 'bu1':
                if (bt1) {
                    datas.sort((a, b) => { return a.Country < b.Country ? 1 : -1 })
                }
                else {
                    datas.sort((a, b) => { return a.Country > b.Country ? 1 : -1 })
                }
                this.setState({ data: datas, bt1: !this.state.bt1 })
                break;
            case 'bu3':
                if (bt3) {
                    datas.sort((a, b) => { return b.TotalConfirmed - a.TotalConfirmed });
                }
                else {
                    datas.sort((a, b) => { return a.TotalConfirmed - b.TotalConfirmed })
                }
                this.setState({ data: datas, bt3: !this.state.bt3 })
                break;
            case 'bu4':
                if (bt4) {
                    datas.sort((a, b) => { return a.TotalDeaths - b.TotalDeaths })
                }
                else {
                    datas.sort((a, b) => { return b.TotalDeaths - a.TotalDeaths })
                }
                this.setState({ data: datas, bt4: !this.state.bt4 })
                break;
            case 'bu5':
                if (bt5) {
                    datas.sort((a, b) => { return a.TotalRecovered - b.TotalRecovered })
                }
                else {
                    datas.sort((a, b) => { return b.TotalRecovered - a.TotalRecovered })
                }
                this.setState({ data: datas, bt5: !this.state.bt5 })
                break;
            default:
                return this.state;

        }
    }


    render() {
        let { data } = this.props;

        return (
            <main>
                <table className={style.tablec}>
                    <thead >
                        <tr className={style.heading} >
                            <td><button name='bu1' onClick={this.handle} style={{ outline: 'none', border: 'none', background: 'none' }}>State <spam>{this.state.bt1 ? <Up /> : <Down />}</spam></button></td>
                            <td><button name='bu3' onClick={this.handle} style={{ outline: 'none', border: 'none', background: 'none' }}>Confirmed <spam>{this.state.bt3 ? <Up /> : <Down />}</spam></button></td>
                            <td><button name='bu4' onClick={this.handle} style={{ outline: 'none', border: 'none', background: 'none' }} >Death <spam>{this.state.bt4 ? <Up /> : <Down />}</spam></button></td>
                            <td><button name='bu5' onClick={this.handle} style={{ outline: 'none', border: 'none', background: 'none' }}>Recovered <spam>{this.state.bt5 ? <Up /> : <Down />}</spam></button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id} className={style.row}>
                                <td className={style.col2}>{item.Country}</td>
                                <td className={style.col}>
                                    {Number(item.NewConfirmed) > 0 ?
                                        <spam className={style.up}><Icon />{item.NewConfirmed}</spam> : ""} {item.TotalConfirmed}</td>
                                <td className={style.col}>
                                    {Number(item.NewDeaths) > 0 ? <sapm className={style.up}> <Icon />{item.NewDeaths}</sapm> : ""}  {item.TotalDeaths}</td>
                                <td className={style.col}>
                                    {Number(item.NewRecovered) > 0 ? <spam className={style.ups}><Icon />{item.NewRecovered}</spam> : ""}  {item.TotalRecovered}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main >
        )
    }
}