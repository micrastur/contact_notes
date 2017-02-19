/**
 * Created by micrastur on 19.02.2017.
 */
import React from 'react';

export default class CreateList extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.value[0].group}</h2>
                <ul>
                    {this.props.value.map((value, index) =>
                        <li key={"item-" + index}>{value.name + ' ' + value.surname}</li>
                    )}
                </ul>
            </div>
        )
    }
}