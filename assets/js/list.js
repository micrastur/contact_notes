import React from 'react';

export default function CreateList(props) {
    return (
    //<div>
    //    <h2>{this.props.value[0].group}</h2>
    //    <ul>
    //        {this.props.value.map((value, index) =>
    //                <li key={"item-" + index}>{value.name + ' ' + value.surname}</li>
    //        )}
    //    </ul>
    //</div>
    <li>{props.value.name + ' ' + props.value.surname + ': ' + props.value.country + ' - ' + props.value.group + ' - ' + props.value.age}</li>
    )
}
