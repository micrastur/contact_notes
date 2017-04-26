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
                    <input type="text"
                           name="search"
                           id="search"
                           className="search__input"
                           data-category="search"
                           ref={(input) => this.searchText = input}
                           onChange = {(e) => this.props.onUserChange(e, this.searchText.value)}
                           value={this.props.value.search}/>
                </label>
            </div>
        )
    }
}

class Filter extends React.Component {
    render(){
        return (
            <div className="filter">
                <div className="filterBtn"
                     data-category="filter"
                     data-option="visibility"
                     ref="filter"
                     onClick = {(e) =>  this.props.onUserClick(e, !this.props.value)}>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                </div>
                <div className={this.props.value ? "active" : "hidden"} ref="sort">
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
            filter:  {
                visibility: false
            }
        };
        this.handleState = this.handleState.bind(this);
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

    generateKeys(key, value, options){
        options = options ? options : [];
        key ? options.push(key) : false;
        typeof value === "object"
            ? value[0]
            ? this.generateKeys(value[0], value[1], options)
            : v = value[2] ? {[value[1]] : value[2]} : value[1]
            : v = value;

        return options;
    }

    formStateObj(data){
        let obj = {}, currentObj = {}, v;

        for(var i = 0; i <= data.length - 1; i++){
            currentObj = {};

            let dataItem = data[i], keysOptions,
                j = typeof dataItem !== "object" ? data : dataItem,
                dataKey = j[0],
                dataValue = j[1];

            keysOptions = generateKeys(dataKey, dataValue);

            function generateKeys(key, value, options){
                options = options ? options : [];
                key ? options.push(key) : false;
                typeof value === "object"
                    ? value[0]
                    ? generateKeys(value[0], value[1], options)
                    : v = value[2] ? {[value[1]] : value[2]} : value[1]
                    : v = value;

                return options;
            }

            for(let keyOptLen = keysOptions.length - 1, k = keyOptLen; k >= 0; k--){
                let o = {};
                o[keysOptions[k]] = Object.keys(currentObj).length ? currentObj : v;
                currentObj = o;
            }
            Object.assign(obj, currentObj);
        }
        return obj;

    }

    handleState(e, value){
        let element = e.currentTarget,
            elementData = element.dataset,
            [category, option] = [elementData.category, elementData.option],
            obj = this.formStateObj([category, [option, value]]);
            console.log(obj);

            this.setState(obj);
    }

    render(){
        this.sortData(this.state.search);
        return (
            <div>
                <header>
                    <div className="container">
                        <SearchBar onUserChange={this.handleState} value={this.state}/>
                        <Filter onUserClick={this.handleState} value={this.state.filter.visibility}/>
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

