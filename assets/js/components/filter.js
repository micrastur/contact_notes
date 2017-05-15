import React from 'react';
import "../../css/filter.css";

export const Filter = (props) => {
    return (
        <div className="filter float-l">
            <div className="filter_btn"
                 data-category="filter"
                 data-option="visibility"
                 onClick = {(e) => props.onUserClick.btn(e.currentTarget, !props.value)}>
                <i className="icon fa fa-filter" aria-hidden="true"></i>
            </div>
            <div className={"filter_type " + (props.value ? "active" : "hidden")}>
                <h3>Sort By:</h3>
                <div className="filter_category" onClick={(e) => props.onUserClick.sort(e)}>
                    <span className="filter_item filter_item-active filter_alphabet" data-category="filter" data-option="sort" data-filter-type="alphabet">
                        <i className="icon fa fa-sort-alpha-asc" aria-hidden="true"></i> Alphabet
                    </span>
                    <span className="filter_item filter_age"  data-category="filter" data-option="sort" data-filter-type="age">
                        <i className="icon fa fa-sort-numeric-asc" aria-hidden="true"></i> Age
                    </span>
                    <span className="filter_item filter_group"  data-category="filter" data-option="sort" data-filter-type="group">
                        <i className="icon fa fa-users" aria-hidden="true"></i> Group
                    </span>
                    <span className="filter_item filter_country"  data-category="filter" data-option="sort" data-filter-type="country">
                        <i className="icon fa fa fa-globe" aria-hidden="true"></i> Country
                    </span>
                </div>
                <SubFilterList />
            </div>
        </div>
    )
};

class SubFilterList extends React.Component {
    render(){
        return (
            <div></div>
        )
    }
}
