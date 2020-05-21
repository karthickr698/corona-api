import React from 'react';
import { slideDown, slideUp } from "./anim";
import style from './nav.module.css';
import { Icon } from './Icon'

export default class UserTableRow extends React.Component {
    state = { expanded: false, sort: false };

    toggleExpander = e => {
        if (!this.props.item.dist)
            alert("No disitricts available")
        if (e.target.type === "checkbox") return;

        if (!this.state.expanded) {
            this.setState({ expanded: true }, () => {
                if (this.refs.expanderBody) {
                    slideDown(this.refs.expanderBody);
                    this.setState({ sort: true });
                }
            });
        } else {
            slideUp(this.refs.expanderBody, {
                onComplete: () => {
                    this.setState({ expanded: false });
                    this.setState({ sort: false });
                }
            });
        }
    };

    render() {
        const { item } = this.props;
        return [
            <tr key="main" onClick={this.toggleExpander} className={this.state.sort ? style.rows : style.row}>
                <td className={style.col2}>{item.state}</td>
                <td className={style.col}>{item.active}</td>
                <td className={style.col}>
                    {Number(item.deltaconfirmed) > 0 ?

                        <spam className={style.up}><Icon />{item.deltaconfirmed}</spam> : ""} {item.confirmed}</td>
                <td className={style.col}>
                    {Number(item.deltadeaths) > 0 ? <sapm className={style.up}> <Icon />{item.deltadeaths}</sapm> : ""}  {item.deaths}</td>
                <td className={style.col}>
                    {Number(item.deltarecovered) > 0 ? <spam className={style.ups}><Icon />{item.deltarecovered}</spam> : ""}  {item.recovered}</td>
            </tr>,
            this.state.expanded && item.dist && (
                <table className={style.table1}>
                    <tr key="tr-expander" >
                        <td >
                            <div ref="expanderBody" >
                                <div className={style.distupdate}>{item.update}</div>
                                <tr className={style.row6} >
                                    <td style={{ width: '500px', visibility: 'hidden' }}></td>
                                    <td className={style.row6}>District</td>
                                    <td className={style.row6}>
                                        Confirmed
                                    </td>
                                </tr >
                                {item.dist.map(item => (
                                    <tr className={style.row5} key={item[0]}>
                                        <td style={{ width: '500px', visibility: 'hidden' }}></td>
                                        <td className={style.col5}>{item[1]}</td>
                                        <td className={style.col6}>{Number(item[2].delta.confirmed) > 0 ? <spam className={style.up}><Icon />{item[2].delta.confirmed}</spam> : ""} {item[2].confirmed}</td>
                                    </tr>
                                ))}
                            </div>
                        </td>
                    </tr>
                </table>


            )
        ];
    }
}