import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            states: ""
        }
    }

    handleChange = (e) => {
        //console.log(this.state)
        const { searchData } = this.props
        this.setState({ states: e.target.value });
        searchData(e.target.value)
    }
    render() {
        //console.log(this.state)

        return (
            <>

            </>
        )
    }
}