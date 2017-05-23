import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

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
                method: [],
                visibility: false
            }
        };
        this.handleState = this.handleState.bind(this);
        this.selectSortType = this.selectSortType.bind(this);
    }

    //sortData(value){
    //    this.state.people = [];
    //    let groups = [],
    //        search = value.toLowerCase();
    //    for (let key of contacts) {
    //        let currentGroup = key.group,
    //            groupIndex = groups.indexOf(key.group);
    //
    //        search
    //            ?key.name.slice(0, search.length).toLowerCase() === search
    //            || key.surname.slice(0, search.length).toLowerCase() === search
    //            || (key.name + ' ' + key.surname).slice(0, search.length).toLowerCase() === search
    //                ? groupIndex === -1
    //                    ? (this.state.people.push([key]), groups.push(currentGroup))
    //                    : (this.state.people[groupIndex].push(key))
    //                : false
    //            : groupIndex === -1
    //                ? (this.state.people.push([key]), groups.push(currentGroup))
    //                : this.state.people[groupIndex].push(key);
    //    }
    //    if(!search){
    //        this.sortByAlphabet();
    //    }
    //}

    sortByAlphabet(){
        this.state.people.sort(function(prev, next){
            let prevFullName = prev.name + ' ' + prev.surname,
                nextFullName = next.name + ' ' + next.surname;
            return prevFullName > nextFullName ? 1 : prevFullName !== nextFullName ? -1 : 0;
        })
    }

    getData(search){
        let searchString = search.toLowerCase().trim().replace( /\s+/g, ' '), methods =  this.filterByMethods();
        this.state.people = [];
        if(searchString){
            for (let key of contacts) {
                let fullName = (key.name + ' ' + key.surname).toLowerCase();
                fullName.slice(0, searchString.length) === searchString
                    ? this.state.people.push(key)
                    : false;
            }
        } else {
            this.state.people = contacts;
        }

        if(!this.state.filter.method.length){
            methods.alphabet.call(this);
        }
    }

    filterByMethods(){
        let methods = {
            alphabet: function(){
                this.state.people.sort(function(prev, next){
                    let prevFullName = prev.name + ' ' + prev.surname,
                        nextFullName = next.name + ' ' + next.surname;
                    return prevFullName > nextFullName ? 1 : prevFullName !== nextFullName ? -1 : 0;
                })
            },
            age: function(){
                this.state.people.sort(function(prev, next){
                    let prevAge = prev.age,
                        nextAge = next.age;
                    return prevAge > nextAge ? 1 : prevAge !== nextAge ? -1 : 0;
                })
            },
            country: '',
            group: ''
        };
        return methods;
    }

    getProperties(key, value, options){
        options = options ? options : [];
        key ? options.push(key) : false;
        return typeof value === "object"
            ? !value.false
                ? this.getProperties(value[0], value[1], options)
                : [options, value.false]
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
                o[keys[k]] = Object.keys(currentObj).length ? currentObj : {$set: value};
                currentObj = o;
            }
            Object.assign(obj, currentObj);
        }
        return obj;

    }

    handleState(element, value) {
        let elementData = element.dataset.stateCategory;

        elementData = elementData.indexOf('-') !== -1 ? elementData.split('-') : elementData.split();

        let [category, option] = [elementData[0], elementData[1]],
            obj = this.generateStateObj([category, [option, value]]);

        var newState = update(this.state, obj);
        this.setState(newState);
    }

    extractValuesByType(){

    }

    selectSortType(e){
        e.stopPropagation();
        e.preventDefault();
        let [targetElement, currentTarget] = [e.target, e.currentTarget];

        function extractValuesByType(){
        }

        if(targetElement !== currentTarget){
            let filterElem = targetElement.getAttribute("data-type") ? targetElement : targetElement.parentElement,
                [filterType, filterStatus, activeItem] = [filterElem.dataset.type, filterElem.dataset.status, 'filter_item-active'],
                activeAddElem = document.querySelectorAll('.filter_item-active[data-status="additional"]')[0],
                valuesByType,
                currentSortMethods = {
                    false: this.state.filter.method
                };
                //activatingItem = {
                //    main: function(){
                //        valuesByType = extractValuesByType();
                //    },
                //    additional: function(){
                //        valuesByType = extractValuesByType();
                //    }
                //};

            //activatingItem[filterStatus].call(this);


            filterStatus === "main"
                ? filterElem.classList.contains(activeItem)
                ? filterElem.classList.remove(activeItem)
                : filterElem.classList.add(activeItem)
                : (activeAddElem ? activeAddElem.classList.remove(activeItem) : false, filterElem.classList.add(activeItem));

            //this.handleState(filterElem, currentSortMethods);
            //console.log(this.state.filter.method);

        }
    }

    render(){
        console.log(this.state.search);
        this.getData(this.state.search);
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
                        <ul>
                            {this.state.people.map((value, index) =>
                                <CreateList key={"list-" + index} value={value}/>
                            )}
                        </ul>
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

