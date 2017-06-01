import React from 'react';
import "../../css/list.css";

export default function CreateList(props) {
    let [methods, people, groups, list] = [props.method, props.people, [], []],
        filterByGroup = methods.indexOf('group') !== -1;

    if(filterByGroup){
        for(let key of people) {
            let currentGroup = key.group,
                groupIndex = groups.indexOf(currentGroup);

            groupIndex === -1
                ? (groups.push(currentGroup), list.push([key]))
                : list[groupIndex].push(key);
        }
    }
    return (
        <div className="list_container">
            {
                filterByGroup
                    ? (<GenerateGroupLists value={list} />)
                    : (<GetList value={people} />)
            }
        </div>
    )


}

function GenerateGroupLists(list){
    let groupList = list.value.map((value, item) =>
        <div className="group_item" key={value[0].group}>
            <h2 className="group_heading">{value[0].group}</h2>
            <GetList value={value}/>
        </div>
    );
    return (
        <div className="group_list">
            {groupList}
        </div>
    )
}

function GetList(list){
    let listItems = list.value.map((value, item) =>
        <li key={`list-${item}`} className={`list_item ${item === 0 ? 'list_item_active' : false}`}>
            <img className="list_image" src={`/assets/img/people/${value.picture}`} alt=""/>
            <span>
                {value.name + ' ' + value.surname + ': ' + value.country + ' - ' + value.group + ' - ' + value.age}
            </span>
        </li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}
