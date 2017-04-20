import React from 'react';
import ReactDOM from 'react-dom';
import {contacts} from "./data";
import CreateList from "./list";
import "../css/style.css";

class SearchBar extends React.Component {
    render(){
        return (
            <div className="search">
                <label>
                    Search:
                    <input type="text" name="search" id="search"
                           className="search__input"
                           ref={(input) => this.searchText = input}
                           onChange = {(e) => this.props.onUserChange('search', this.searchText.value)}
                           value={this.props.value.search}/>
                </label>
            </div>
        )
    }
}

class Filter extends React.Component {
    render(){
        console.log();
        return (
            <div className="filter">
                <div className="filterBtn" data-category="filter" onClick = {(e) =>  this.props.onUserClick(!this.props.value)}>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                </div>
                <div className={this.props.value ? "active" : "hidden"}>
                    <h3>Sort By:</h3>
                    <div className="filterCategory">
                        <span className="ageCategory">
                            <i className="fa fa-sort-numeric-asc" aria-hidden="true"></i> Age
                        </span>
                        <span className="alphabetCategory">
                            <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i> Alphabet
                        </span>
                    </div>
                    <SubFilterList />
                </div>
            </div>
        )
    }
}

class SubFilterList extends React.Component {
    render(){
        return (
            <div></div>
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            search: '',
            people: [],
            visibilityFilter: false
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    sortData(value){
        this.state.people = [];
        let groups = [],
            search = value.toLowerCase();
        for (let key of contacts) {
            let currentGroup = key.group,
                groupIndex = groups.indexOf(key.group);

            search
                ?key.name.slice(0, search.length).toLowerCase() === search
                || key.surname.slice(0, search.length).toLowerCase() === search
                    ? groupIndex === -1
                        ? (this.state.people.push([key]), groups.push(currentGroup))
                        : (this.state.people[groupIndex].push(key))
                    : false
                : groupIndex === -1
                ? (this.state.people.push([key]), groups.push(currentGroup))
                : this.state.people[groupIndex].push(key);
        }
        if(!search){
            this.sortByAlphabet();
        }
    }

    sortByAlphabet(){
        this.state.people.sort(function(prev, next){
            return prev[0].group > next[0].group ? 1 : prev[0].group < next[0].group ? -1 : 0;
        })
    }

    handleSearch(value){
        this.setState({search: value});
    }

    toggleFilter(value){
        this.setState({visibility: value});
    }

    render(){
        this.sortData(this.state.search);
        return (
            <div>
                <header>
                    <div className="container">
                        <SearchBar onUserChange={this.handleSearch} value={this.state}/>
                        <Filter onUserClick={this.toggleFilter} value={this.state.visibilityFilter}/>
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        {this.state.people.map((value, index) =>
                            <CreateList key={"list-" + index} value={value}/>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}


{
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

