import React from 'react';
import ReactDOM from 'react-dom';
import {contacts} from "./data";
import CreateList from "./list";

class SearchBar extends React.Component {
    render(){
        return (
            <label>
                Search:
                <input type="text" name="search"
                       ref={(input) => this.searchText = input}
                       onChange = {(e) => this.props.onUserChange(this.searchText.value)}
                       value={this.props.value.search}/>
            </label>
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            search: '',
            people: []
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

    render(){
        this.sortData(this.state.search);
        return (
            <div>
                <SearchBar onUserChange={this.handleSearch} value={this.state}/>
                {this.state.people.map((value, index) =>
                    <CreateList key={"list-" + index} value={value}/>
                )}
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

