import React from 'react';

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
        <div>
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
        <div key={value[0].group}>
            <h2>{value[0].group}</h2>
            <GetList value={value}/>
        </div>
    );
    return (
        <div>
            {groupList}
        </div>
    )
}

function GetList(list){
    let listItems = list.value.map((value, item) =>
        <li key={`list-${item}`}>
            {value.name + ' ' + value.surname + ': ' + value.country + ' - ' + value.group + ' - ' + value.age}
        </li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}
