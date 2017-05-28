import React from 'react';
import "../../css/filter.css";

export const Filter = (props) => {
    return (
        <div className="filter float-l">
            <div className="filter_btn"
                 data-state-category="filter-visibility"
                 onClick = {(e) => props.onUserClick.btn(e.currentTarget, !props.value)}>
                <i className="icon fa fa-filter" aria-hidden="true"></i>
            </div>
            <div className={"filter_type " + (props.value ? "active" : "hidden")}>
                <h3>Sort By:</h3>
                <div className="filter_category" onClick={(e) => props.onUserClick.sort(e)}>
                    <label className="filter_item filter_alphabet filter_item-active" data-state-category="filter-method" data-status="main" data-type="alphabet">
                        <i className="icon fa fa-sort-alpha-asc" aria-hidden="true"></i> Alphabet
                    </label>
                    <label className="filter_item filter_group"  data-state-category="filter-method" data-status="main" data-type="group">
                        <i className="icon fa fa-users" aria-hidden="true"></i> Group
                    </label>
                    <label className="filter_item filter_age"  data-state-category="filter-method" data-status="additional" data-type="age">
                        <i className="icon fa fa-sort-numeric-asc" aria-hidden="true"></i> Age
                    </label>
                    <label className="filter_item filter_country"  data-state-category="filter-method" data-status="additional" data-type="country">
                        <i className="icon fa fa fa-globe" aria-hidden="true"></i> Country
                    </label>
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
