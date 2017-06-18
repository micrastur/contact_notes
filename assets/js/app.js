import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

import {contacts} from "./data";

import CreateList from "./components/list";
import SearchBar from "./components/search";
import Filter from "./components/filter";

import "../css/common.css";



const Header = (props) => {
    return (
        <div className="search_section float-r cf">
            {props.children}
        </div>
    )
};

class App extends React.Component {
    constructor() {
        super();
        this.filterInfo = {
            major: {
                type: ['alphabet', 'group'],
                getActiveTypes: function(info){
                    let selectedTypeLength = [],
                        currentMethods = info.currentMethods,
                        order = info.order,
                        clickedMethod = info.clickedMethod;

                    for(let item in this.type){
                        currentMethods.indexOf(this.type[item]) !== -1 ? selectedTypeLength.push(this.type[item]) : false;
                    }

                    currentMethods[order] =
                    currentMethods.indexOf(clickedMethod) === -1
                    || (selectedTypeLength.length === 1 && selectedTypeLength[0] === clickedMethod)
                        ? clickedMethod
                        : '';

                    return currentMethods;
                }
            },
            minor: {
                type: ['country', 'age'],
                order: 2,
                getActiveTypes: function(info){
                    let currentMethods = info.currentMethods,
                        clickedMethod = info.clickedMethod;

                    currentMethods[info.order] = currentMethods.indexOf(clickedMethod) === -1
                        ? clickedMethod
                        : '';

                    return currentMethods;
                }
            }
        };
        this.state = {
            search: '',
            people: contacts,
            filter: {
                method: ['alphabet'],
                visibility: false
            },
            list: {
                active: null
            }
        };
        this.handleState = this.handleState.bind(this);
        this.selectSortType = this.selectSortType.bind(this);
        this.getData = this.getData.bind(this);
    }

    filterByMethods(actualMethods){
        let currentMethods = actualMethods ? actualMethods : this.state.filter.method,
            addFilter = currentMethods[2];

        this.people.sort(function(prev, next){
            let prevFullName = prev.name + ' ' + prev.surname,
                nextFullName = next.name + ' ' + next.surname;

            return (currentMethods[1] ? (prev.group>next.group) - (next.group>prev.group) : false)
                || (addFilter ? (prev[addFilter]>next[addFilter]) - (next[addFilter]>prev[addFilter]) : false)
                || (currentMethods[0] ? (prevFullName>nextFullName) - (nextFullName>prevFullName) : false);
        })
    }

    getData(search){
        this.people = contacts;
        let searchString = search.replace( /\s+/g, ' ');
        if(searchString){
            this.people = [];
            for (let key of contacts) {
                let fullName = (key.name + ' ' + key.surname).toLowerCase();
                fullName.slice(0, searchString.length) === searchString.toLowerCase()
                    ? this.people.push(key)
                    : false;
            }
        }

        this.filterByMethods();
        this.handleState(null, {
            search: {$set: searchString},
            people: {$set: this.people}
        });
    }

    generateStateObj(jobj, keys, value){
        let keysAmount = keys.length - 1;
        for(let i = 0; i < keysAmount; ++i){
            let currentKey = keys[i];
            if(!(currentKey in jobj)){
                jobj[currentKey] = {}
            }
            jobj = jobj[currentKey];
        }
        jobj[keys[keysAmount]] = {$set: value};

    }

    handleState(element, value) {
        let newState = value, obj = {};
        if(element){
            let keys = element.dataset.stateCategory;
            keys = keys.indexOf('-') !== -1 ? keys.split('-') : keys.split();
            this.generateStateObj(obj, keys, value);
            newState = obj;
        }



        this.setState(update(this.state, newState));

    }

    selectSortType(element){
        let filterInfo = this.filterInfo,
            filterElem = element.getAttribute("data-type")
                ? element
                : element.parentElement,
            [filterType, activeItem] = [filterElem.dataset.type, 'filter_item-active'],
            currentSortMethods,
            methodElems = element.closest('label').parentElement.children;

        for(let key in filterInfo){
            let methodsOption = filterInfo[key],
                selectedTypeIndex = methodsOption.type.indexOf(filterType),
                info = {
                    clickedMethod: filterType,
                    currentMethods: [].concat(this.state.filter.method),
                    order: methodsOption.order ? methodsOption.order : selectedTypeIndex
                };

            if(selectedTypeIndex !== -1){
                currentSortMethods = methodsOption.getActiveTypes.call(methodsOption, info);
            }
        }

        for(let element of methodElems){
            element.classList.remove(activeItem);
        }
        for(let item of currentSortMethods){
            for(let element of methodElems){
                if(element.dataset.type === item){
                    element.classList.add(activeItem)
                }
            }
        }

        console.log(currentSortMethods);

        this.filterByMethods(currentSortMethods);
        this.handleState(null, {
            filter: {method: {$set: currentSortMethods}},
            people: {$set: this.people}
        });
    }

    componentDidMount() {
        this.people = contacts;
        this.filterByMethods();
        this.handleState(null, {
            people: {$set: contacts}
        });
    }


    render(){
        return (
            <div>
                <header>
                    <div className="container cf">
                        <Header>
                            <SearchBar onUserChange={this.getData} value={this.state}/>
                            <Filter onUserClick={{btn: this.handleState, sort: this.selectSortType}} value={this.state.filter.visibility}/>
                        </Header>
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        <CreateList item={this.state.list.active} people={this.state.people} method={this.state.filter.method}/>
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

