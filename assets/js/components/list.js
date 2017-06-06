import React from 'react';
import "../../css/list.css"

export default class CreateList extends React.Component {
    constructor(props){
        super(props);
    }

    generateGroupLists(){
        let groupList = this.people.map((value, item) =>
                <div className="group_item" key={value[0].group}>
                    <h2 className="group_heading">{value[0].group}</h2>
                    {this.getList(value, item)}
                </div>
        );
        return (
            <div className="group_list">
                {groupList}
            </div>
        )
    }

    activateItem(e){
        let targetElement = e.target.tagName.toLowerCase() === 'li' ? e.target : e.target.parentElement,
            currentTarget = e.currentTarget,
            activeClass = 'list_item-active',
            activeListElement = document.getElementsByClassName(activeClass)[0];

        if(targetElement !== currentTarget && activeListElement){
            activeListElement.classList.remove(activeClass);
            targetElement.classList.add(activeClass);
        }
    }

    getList(list, groupItem){
        let currentList = list ? list : this.props.people,
            listItems = currentList.map((value, item) => {
                let curItem = groupItem ? groupItem : item;
                return <li key={`list-${item}`} className={'list_item ' + (curItem === 0 ? 'list_item-active' : false)}>
                        <img className="list_image" src={`/contact_notes/assets/img/people/${value.picture}`} alt=""/>
                    <span>
                        {value.name + ' ' + value.surname + ': ' + value.country + ' - ' + value.group + ' - ' + value.age}
                    </span>
                    </li>
                }
        );

        return (

            <ul onClick={this.activateItem}>
                {listItems}
            </ul>
        )
    }

    render(){
        let [data, groups, list] = [this.props, [], []],
            filterByGroup = data.method.indexOf('group') !== -1;

        if(filterByGroup){
            for(let key of data.people) {
                let currentGroup = key.group,
                    groupIndex = groups.indexOf(currentGroup);

                groupIndex === -1
                    ? (groups.push(currentGroup), list.push([key]))
                    : list[groupIndex].push(key);
            }
            this.people = list;
        }
        return (
            <div className="list_container">
                {
                    filterByGroup
                        ? this.generateGroupLists()
                        : this.getList()
                }
            </div>
        )
    }
}
