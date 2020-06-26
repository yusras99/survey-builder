import React, { Component } from 'react';
import './TabList.css';
import '../TabBuilder/TabBuilder'
import TabBuilder from '../TabBuilder/TabBuilder';
import SliderTab from '../SliderTab/SliderTab';

const axios = require('axios');

class TabList extends Component {
    constructor(props){
        super(props);
        this.state = {
            children : [],
            count : 0,
            output : {},
            deleted : [],
            complete : false
        }
        this.myRef = React.createRef();
        this.submitRef = React.createRef();
        this.nameRef = React.createRef();

        this.builderFunction = this.builderFunction.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.delete = this.delete.bind(this);
        this.getCount = this.getCount.bind(this);
        this.outputCreate = this.outputCreate.bind(this);
        this.checkOutput = this.checkOutput.bind(this);
        this.getTest = this.getTest.bind(this);
    }

    builderFunction = (tabDefine) => {
        var arr = this.state.children;

        switch (tabDefine) {
            case "slider":
            arr.push({id : this.state.count, tab : <SliderTab getCount={this.getCount} delete={this.delete} count={this.state.count} handleChange={this.handleChange} key={this.state.count.toString()} />})
                break;
            default:
                arr = <div>Unknown Element</div>
        }

        var curOutput = this.state.output;
        curOutput[this.state.count.toString()] = {"Type" : tabDefine};
        var newCount = this.state.count + 1;
        this.setState({children : arr, count : newCount, output : curOutput, complete : false});
        console.log(this.state.output);
    }

    // handleSubmit() {
    //     var listElem = this.props.children;
    //     console.log(listElem);
    // }

    handleChange(pos, newVal, count) {
        console.log(count);
        var curOutput = this.state.output;
        curOutput[count.toString()][pos] = newVal;
        this.setState({output : curOutput});

        console.log(this.state.output);
    }

    delete(id){
        // this.state.children.map(el => console.log(el.count));
        // this.setState(prevState => ({
        //     output: prevState.children.filter(el => el.count !== id )
        // }));
        var newDelete = this.state.deleted;
        newDelete.push(id);
        this.setState({ deleted: newDelete });
        console.log(this.state.deleted);
        console.log(this.state.deleted.indexOf(id));
    }

    getCount(count) {
        return count;
    }

    checkOutput(obj) {
        var int = 0;
        var complete = true;
        while ((int.toString()) in obj) {
            var elem = obj[int.toString()];
            switch (elem["Type"]) {
                case "slider":
                    var lowIs = "lowRange" in elem;
                    var highIs = "highRange" in elem;
                    var qIs = "Question" in elem;
                    if (lowIs && highIs && qIs){
                        var lowNum = !isNaN(elem["lowRange"]);
                        var highNum = !isNaN(elem["highRange"]);
                        var highLow = parseInt(elem["highRange"]) > parseInt(elem["lowRange"]);
                        if (highLow && lowNum && highNum) {
                            complete = complete && true;
                        }
                        else {
                            complete = false;
                        }
                        // console.log("Within", complete);
                        // console.log(int);
                        // console.log(lowIs, highIs, qIs, lowNum, highNum, highLow);
                    }
                    else {
                        complete = false;
                    }
                    break;
                default:
                    complete = false;
            }

            int++;
        }
        console.log(complete);
        return complete;
    }

    outputCreate() {
        var obj = {};
        this.state.children
        .filter(item => this.state.deleted.indexOf(item.id) === -1)
        .map((item) => {obj[item.id.toString()] = this.state.output[item.id.toString()]});
        console.log(typeof(obj));
        var validName = this.nameRef.current.value.length > 0;
        if (!(0 in obj) || !this.checkOutput(obj) || !validName) {
            console.log(!(0 in obj), !this.checkOutput(obj));
            alert("You have not filled out all fields, or have entered an invalid value!");
        }
        else {
            var finalObj = {"userID" : new Date().toString()};
            finalObj["name"] = this.nameRef.current.value;
            var int = 0;
            while ((int.toString()) in obj) {
                finalObj["q" + int.toString()] = obj[int.toString()];
                int++;
            }
            finalObj["count"] = int;
            axios({
                type: "POST",
                url: 'https://test-api-615.herokuapp.com/api/feedback/surveys/',
                data:finalObj,
                async:true,
                crossDomain:true,
                dataType : 'json',
                contentType: 'application/json'
            }).then(response => {console.log(response)});
            console.log(finalObj);
        }
    }

    getTest() {
        
        axios.get('https://test-api-615.herokuapp.com/api/feedback/surveys').then(resp => {

            console.log(resp.data);
        });
    }

    render() {
        return(
            <div className="list" ref={this.myRef}>
                <form action="/submit" method="POST" className="unit">
                    <p>Enter a name for this survey</p>
                    <input ref={this.nameRef} type="text" id="userid" name="userid" /><br /><br />
                </form>
                {
                    this.state.children
                    .filter(item => this.state.deleted.indexOf(item.id) === -1)
                    .map((item) => {
                        return item.tab;
                    })
                }
                <TabBuilder build={this.builderFunction} />
                <div className="extraPad">
                    <button onClick={this.outputCreate} ref={this.submitRef} type="submit" value="Submit" className="btn">Submit</button>
                    <button onClick={this.getTest}>GET Test</button>
                </div>
            </div>
        )
    }
}

export default TabList;