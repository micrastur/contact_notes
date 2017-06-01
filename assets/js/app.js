import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

import {contacts} from "./data";

import CreateList from "./components/list";
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
    constructor() {
        super();
        this.state = {
            search: '',
            people: [],
            filter: {
                method: ['alphabet'],
                visibility: false
            },

        };
        this.handleState = this.handleState.bind(this);
        this.selectSortType = this.selectSortType.bind(this);
        this.getData = this.getData.bind(this);
    }

    filterByMethods(actualMethods){
        let currentMethods = actualMethods ? actualMethods : this.state.filter.method,
            addFilter = currentMethods.indexOf('age') !== -1
                ? 'age'
                : currentMethods.indexOf('country') !== -1
                ? 'country'
                : false;

        this.people.sort(function(prev, next){
            let prevFullName = prev.name + ' ' + prev.surname,
                nextFullName = next.name + ' ' + next.surname;

            return (currentMethods.indexOf('group') !== -1 ? (prev.group>next.group) - (next.group>prev.group) : false)
                || (currentMethods.indexOf(addFilter) !== -1 ? (prev[addFilter]>next[addFilter]) - (next[addFilter]>prev[addFilter]) : false)
                || (currentMethods.indexOf('alphabet') !== -1 ? (prevFullName>nextFullName) - (nextFullName>prevFullName) : false);
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

    selectSortType(e){
        e.stopPropagation();
        e.preventDefault();
        let [targetElement, currentTarget] = [e.target, e.currentTarget];

        if(targetElement !== currentTarget){
            let filterElem = targetElement.getAttribute("data-type")
                    ? targetElement
                    : targetElement.parentElement,
                [filterType, filterStatus, activeItem] = [filterElem.dataset.type, filterElem.dataset.status, 'filter_item-active'],
                activeAddElem = document.querySelectorAll('.filter_item-active[data-status="additional"]')[0],
                currentSortMethods = [].concat(this.state.filter.method),
                activatingItem = {
                    main: function(){

                        currentSortMethods.indexOf(filterType) !== -1
                            ? currentSortMethods.splice(currentSortMethods.indexOf(filterType), 1)
                            : currentSortMethods.push(filterType);

                        filterElem.classList.contains(activeItem)
                            ? filterElem.classList.remove(activeItem)
                            : filterElem.classList.add(activeItem);

                    },
                    additional: function(){
                        let typeElems = document.querySelectorAll(`[data-status='${filterStatus}']`),
                            typeElemsValue = [];

                        for(let key of typeElems){
                            key.dataset.type !== filterType ? typeElemsValue.push(key.dataset.type) : false;
                        }

                        for(let key of typeElemsValue){
                            if(currentSortMethods.indexOf(key) !== -1){
                                currentSortMethods.splice(currentSortMethods.indexOf(key), 1)
                            }
                        }

                        activeAddElem === filterElem
                            ?  currentSortMethods.splice(currentSortMethods.indexOf(filterType), 1)
                            :  currentSortMethods.push(filterType);

                        activeAddElem ? activeAddElem.classList.remove(activeItem) : false;

                        filterElem === activeAddElem
                            ? filterElem.classList.remove(activeItem)
                            : filterElem.classList.add(activeItem);
                    }
                };


            activatingItem[filterStatus].call(this);
            this.filterByMethods(currentSortMethods);
            this.handleState(null, {
                filter: {method: {$set: currentSortMethods}},
                people: {$set: this.people}
            });


        }
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
                        <CreateList people={this.state.people} method={this.state.filter.method}/>
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

