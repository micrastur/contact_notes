import React from 'react';
import ReactDOM from 'react-dom';

import {contacts} from "./data";

import CreateList from "./list";
import {SearchBar} from "./components/search";
import {Filter} from "./components/filter";

import "../css/common.css";



const Header = (props) => {
    return (
        <div className="search_section float-r cf">
            {props.children}
        </div>
    )
};

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            search: '',
            people: [],
            filter:  {
                sort: "alphabet",
                visibility: false
            }
        };
        this.handleState = this.handleState.bind(this);
        this.selectSortType = this.selectSortType.bind(this);
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

    getProperties(key, value, options){
        options = options ? options : [];
        key ? options.push(key) : false;
        return typeof value === "object"
            ? value[0]
                ? this.getProperties(value[0], value[1], options)
                : value[2] ? [options, {[value[1]] : value[2]}] : [options, value[1]]
            : [options, value];
    }

    generateStateObj(data){
        let obj = {}, currentObj = {};

        for(var i = 0; i < data.length - 1; i++){
            currentObj = {};

            let dataItem = data[i], properties,
                j = typeof dataItem !== "object" ? data : dataItem,
                dataKey = j[0],
                dataValue = j[1];

            properties = this.getProperties(dataKey, dataValue);
            let keys = properties[0],
                value = properties[1];

            for(let keyOptLen = keys.length - 1, k = keyOptLen; k >= 0; k--){
                let o = {};
                o[keys[k]] = Object.keys(currentObj).length ? currentObj : value;
                currentObj = o;
            }
            Object.assign(obj, currentObj);
        }
        return obj;

    }

    handleState(element, value) {
        let elementData = element.dataset,
            [category, option] = [elementData.category, elementData.option],
            obj = this.generateStateObj([category, [option, value]]);

        this.setState(obj);
    }

    selectSortType(e){
        let targetElement = e.target,
            currentTarget = e.currentTarget;

        if(targetElement !== currentTarget){
            let filterType = targetElement.getAttribute("data-filter-type"),
                currentFilterElement = filterType ? targetElement : targetElement.parentElement,
                childElements = currentTarget.children,
                activeClass = "filter_item-active";

            [...childElements].filter(function(elem, index){
                if(elem.classList.contains(activeClass)){
                    elem.classList.remove(activeClass);
                    currentFilterElement.classList.add(activeClass);
                }
            });
            this.handleState(targetElement, filterType);
        }
    }

    render(){
        this.sortData(this.state.search);
        return (
            <div>
                <header>
                    <div className="container cf">
                        <Header>
                            <SearchBar onUserChange={this.handleState} value={this.state}/>
                            <Filter onUserClick={{btn: this.handleState, sort: this.selectSortType}} value={this.state.filter.visibility}/>
                        </Header>
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

