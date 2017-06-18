import React from 'react';
import "../../css/search.css";

export default function SearchBar(props){
    let searchText = null;
    return (
        <div className="search float-l">
            <label>
                Search:
                <input type="text"
                       name="search"
                       id="search"
                       className="search__input"
                       data-state-category="search"
                       ref={input => (searchText = input)}
                       onChange = {(e) => props.onUserChange(searchText.value)}
                       value={props.value.search}/>
                <div className="search__icon">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
            </label>
        </div>
    )
};
