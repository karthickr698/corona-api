import React, { Component } from 'react';
import style from './nav.module.css';
import UserTableRow from './UserTableRow'
import { Up, Down } from './Icon'
export default class State extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            state_name: "",
            bt1: true,
            bt2: false,
            bt3: true,
            bt4: true,
            bt5: true,
        }
    }

    handle = (e) => {
        let datas = this.props.data;
        const { bt1, bt2, bt3, bt4, bt5 } = this.state;
        switch (e.target.name) {
            case 'bu1':
                if (bt1) {
                    datas.sort((a, b) => { return a.state < b.state ? 1 : -1 })
                }
                else {
                    datas.sort((a, b) => { return a.state > b.state ? 1 : -1 })
                }
                this.setState({ data: datas, bt1: !this.state.bt1 })
                break;
            case 'bu2':
                if (bt2) {
                    datas.sort((a, b) => { return a.active - b.active; })
                }
                else {
                    datas.sort((a, b) => { return b.active - a.active; })
                }
                this.setState({ data: datas, bt2: !this.state.bt2 })
                break;
            case 'bu3':
                if (bt3) {
                    datas.sort((a, b) => { return a.confirmed - b.confirmed; });
                }
                else {
                    datas.sort((a, b) => { return b.confirmed - a.confirmed; })
                }
                this.setState({ data: datas, bt3: !this.state.bt3 })
                break;
            case 'bu4':
                if (bt4) {
                    datas.sort((a, b) => { return a.deaths - b.deaths; })
                }
                else {
                    datas.sort((a, b) => { return b.deaths - a.deaths; })
                }
                this.setState({ data: datas, bt4: !this.state.bt4 })
                break;
            case 'bu5':
                if (bt5) {
                    datas.sort((a, b) => { return a.recovered - b.recovered })
                }
                else {
                    datas.sort((a, b) => { return b.recovered - a.recovered })
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
                <table className={style.table}>
                    <thead onClick={this.handle} >
                        <tr className={style.heading}>
                            <td >
                                <button name='bu1' style={{ outline: 'none', border: 'none', background: 'none' }}>State
                                    <spam>
                                        {this.state.bt1 ? <Up /> : <Down />}
                                    </spam>
                                </button>
                            </td>
                            <td ><button name='bu2' style={{ outline: 'none', border: 'none', background: 'none' }}>Active <spam>{this.state.bt2 ? <Up /> : <Down />}</spam></button></td>
                            <td ><button name='bu3' style={{ outline: 'none', border: 'none', background: 'none' }}>Confirmed <spam>{this.state.bt3 ? <Up /> : <Down />}</spam></button></td>
                            <td ><button name='bu4' style={{ outline: 'none', border: 'none', background: 'none' }} >Death <spam>{this.state.bt4 ? <Up /> : <Down />}</spam></button></td>
                            <td ><button name='bu5' style={{ outline: 'none', border: 'none', background: 'none' }}>Recovered <spam>{this.state.bt5 ? <Up /> : <Down />}</spam></button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <UserTableRow key={index} item={user} />
                        ))}
                    </tbody>
                </table>
            </main >
        )
    }
}