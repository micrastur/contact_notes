import React from 'react';
import "../../css/list.css"

export default class CreateList extends React.Component {
    constructor(props){
        super(props);
        this.listInfo = [
            {
                title: 'Personal Information',
                labels: ['Name', 'Surname', 'Birth Date', 'Age', 'Gender', 'Group']
            },
            {
                title: 'Contacts',
                labels: ['Address', 'Country', 'E-mail', 'Phone']
            }
        ]
    }

    generateGroupLists(){
        let groupList = this.people.map((value, item) =>
            <div className={`group_item` + ` group_${value[0].group}`} key={value[0].group}>
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
        let targetElement = e.target.tagName.toLowerCase() === 'li' ? e.target : e.target.closest('li'),
            currentTarget = e.currentTarget,
            activeClass = 'list_item-active',
            activeListElement = document.getElementsByClassName(activeClass)[0];

        if(targetElement !== currentTarget){
            activeListElement ? activeListElement.classList.remove(activeClass) : false;
            targetElement.classList.add(activeClass);
        }
    }

    listHead(info){
        console.log();
        return (
            <div className="list_item_head">
                <img className="list_image" src={`/assets/img/people/${info.picture}`} alt=""/>
                <span className="list_title">
                    {info.name + ' ' + info.surname}
                    <span className="list_filter">
                        {this.props.method[2] ? info[this.props.method[2]] : ''}
                    </span>
                </span>
            </div>
        )
    }

    listBody(info){
        let labelList = (labels) => {
                let lists = labels.map((name, item) => {
                    return (
                        <p key={`label_${item}`}>
                            <span className="label_name">{`${name}:`}</span>
                            {info[name.toLowerCase().split(/\s+|-/).join('_')]}
                        </p>
                    )
                });
                return (
                    <div className="label_wrap">
                        {lists}
                    </div>
                )
            },
            bodyInfo = this.listInfo.map((value, item) => {
                let title = value.title,
                    labels = value.labels;

                return (
                    <div className="item_info_type" key={`info_type-${item}`}>
                        <h2 className="info_type_title">{title}</h2>
                        {labelList(labels)}
                    </div>
                )
            });
        return (
            <div className="list_item_body">
                <div className="cf">
                    <div className="item_info">
                        <img className="item_image" src={`/assets/img/people/${info.picture}`} alt=""/>
                    </div>
                    <div className="item_info personal_info cf">
                        {bodyInfo}
                    </div>
                </div>
                <div className="item_info_detail">
                    <h2 className="info_type_title">About person</h2>
                    <p>
                        {info.about}
                    </p>
                </div>
            </div>
        )
    }

    getList(list, groupItem){
        let currentList = list ? list : this.props.people,
            listItems = currentList.map((value, item) => {
                    let curItem = groupItem ? groupItem : item;
                    return (
                        <li key={`list-${item}`} className={'list_item ' + (curItem === 0 ? 'list_item-active' : false)}>
                            {this.listHead(value)}
                            {this.listBody(value)}
                        </li>
                    )
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
