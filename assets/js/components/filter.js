import React from 'react';
import "../../css/filter.css";

export default function Filter(props){
    return (
        <div className="filter float-l">
            <div className="filter_btn"
                 data-state-category="filter-visibility"
                 onClick = {(e) => props.onUserClick.btn(e.currentTarget, !props.value)}>
                <i className="icon fa fa-filter" aria-hidden="true"></i>
            </div>
            <div className={"filter_type " + (props.value ? "active" : "hidden")}>
                <h3>Sort By:</h3>
                <GetFilterList onItemClick={props.onUserClick.sort}/>
            </div>
        </div>
    )
};

function GetFilterList(props) {
    let filterType = {
            "alphabet": {icon: "fa-sort-alpha-asc", name: "Alphabet"},
            "group": {icon: "fa-users", name: "Group"},
            "age": {icon: "fa-sort-numeric-asc", name: "Age"},
            "country": {icon: "fa-globe", name: "Country"}
        },
        filterList = Object.keys(filterType).map(function(key){
            let filterTypeItem = filterType[key];
            return (
                <label key={`filter_${key}`}
                       className={`filter_item filter_${key} ${key === "alphabet" ? "filter_item-active" : ""}`}
                       data-state-category="list-activeId"
                       data-type={key}>
                    <i className={`icon fa ${filterTypeItem.icon}`} aria-hidden="true"></i>{filterTypeItem.name}
                </label>
            )
        });
    return (
        <div className="filter_category" onClick={(e) => {e.target !== e.currentTarget ? props.onItemClick(e.target) : false}}>
            {filterList}
        </div>
    );
}
