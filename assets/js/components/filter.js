import React from 'react';
import "../../css/filter.css";

export const Filter = (props) => {
    return (
        <div className="filter float-l">
            <div className="filter_btn"
                 data-category="filter"
                 data-option="visibility"
                 onClick = {(e) => props.onUserClick(e, !props.value)}>
                <i className="fa fa-filter" aria-hidden="true"></i>
            </div>
            <div className={"filter_type " + (props.value ? "active" : "hidden")}>
                <h3>Sort By:</h3>
                <div className="filter_category">
                    <span className="filter_alphabet">
                        <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i> Alphabet
                    </span>
                    <span className="filter_age">
                        <i className="fa fa-sort-numeric-asc" aria-hidden="true"></i> Age
                    </span>
                    <span className="filter_group">
                        <i className="fa fa-users" aria-hidden="true"></i> Group
                    </span>
                    <span className="filter_country">
                        <i className="fa fa fa-globe" aria-hidden="true"></i> Country
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