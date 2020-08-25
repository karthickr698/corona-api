import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import style from './nav.module.css';
import Country from './country_total';
import Total from './total';

export default class Navi extends Component {
    render() {
        return (
            <>
                <div className={style.dt}>
                    <div className={style.link}>
                        <Link style={{ textDecoration: "none", color: "yellow" }} to="/">Home</Link>
                    </div>
                    <div className={style.link}>
                        <Link style={{ textDecoration: "none", color: "yellow" }} to='/state'>state</Link>
                    </div>
                </div>
                <Route path="/" exact component={Total} />
                <Route path="/state" component={Country} />
            </>
        )
    }
}