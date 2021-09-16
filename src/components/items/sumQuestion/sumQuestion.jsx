import React, { Component } from 'react';

class SumQuestion extends Component{
    constructor(props) {
        super(props);
        this.qRef = React.createRef();
        this.q1Ref = React.createRef();
        this.q2Ref = React.createRef();
        this.q3Ref = React.createRef();
        this.q4Ref = React.createRef();
        this.q5Ref = React.createRef();
        this.q6Ref = React.createRef();
        this.q7Ref = React.createRef();
        this.q8Ref = React.createRef();
        this.q9Ref = React.createRef();
        this.q10Ref = React.createRef();
        this.svgRef = React.createRef();
        this.textReturn2 = this.textReturn2.bind(this);
        this.val1Ref = React.createRef();
        this.val2Ref = React.createRef();
        this.val3Ref = React.createRef();
        this.val4Ref = React.createRef();
        this.val5Ref = React.createRef();
        this.val6Ref = React.createRef();
        this.val7Ref = React.createRef();
        this.val8Ref = React.createRef();
        this.val9Ref = React.createRef();
        this.val10Ref = React.createRef();
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.questionTextRef = React.createRef();
        this.num1Ref = React.createRef();
        this.num2Ref = React.createRef();
        this.num3Ref = React.createRef();
        this.num4Ref = React.createRef();
        this.num5Ref = React.createRef();
        this.num6Ref = React.createRef();
        this.num7Ref = React.createRef();
        this.num8Ref = React.createRef();
        this.num9Ref = React.createRef();
        this.num10Ref = React.createRef();
        this.numRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.changeJSON = this.changeJSON.bind(this);
        this.jsonData = this.props.data;
        this.establishStateData = this.establishStateData.bind(this);
        this.state = this.establishStateData(this.props.data);
    }
    establishStateData(data){
        return{
            questionText: "",
            item11: "test",
            item22: "",
            item33: "",
            item44: "",
            item55: "",
            item66: "",
            item77: "",
            item88: "",
            item99: "",
            item1010: "",
            jsonData: data,
            num1 : 0,
            maxVal : 0,
            question : ""

        }
    }
    onChangeQuestion(){
        this.setState({questionText: this.questionTextRef.current.value});
        this.changeJSON(this.state.questionText, this.questionTextRef.current.value, this.jsonData);
    }
    
    onChangeItems(){
        console.log("hello");
        this.setState({item11: this.q1Ref.current.value});
        this.changeJSON("item11", this.q1Ref.current.value, this.jsonData);
        this.setState({item22: this.q2Ref.current.value});
        this.changeJSON("item22", this.q2Ref.current.value, this.jsonData);
        this.setState({item33: this.q3Ref.current.value});
        this.changeJSON("item33", this.q3Ref.current.value, this.jsonData);
        this.setState({item44: this.q4Ref.current.value});
        this.changeJSON("item44", this.q4Ref.current.value, this.jsonData);
        this.setState({item55: this.q5Ref.current.value});
        this.changeJSON("item55", this.q5Ref.current.value, this.jsonData);
        this.setState({item66: this.q6Ref.current.value});
        this.changeJSON("item66", this.q6Ref.current.value, this.jsonData);
        this.setState({item77: this.q7Ref.current.value});
        this.changeJSON("item77", this.q7Ref.current.value, this.jsonData);
        this.setState({item88: this.q8Ref.current.value});
        this.changeJSON("item88", this.q8Ref.current.value, this.jsonData);
        this.setState({item99: this.q1Ref.current.value});
        this.changeJSON("item99", this.q9Ref.current.value, this.jsonData);
        this.setState({item1010: this.q10Ref.current.value});
        this.changeJSON("item1010", this.q10Ref.current.value, this.jsonData);
        this.changeJSON("question", this.qRef.current.value, this.jsonData);
        this.setState({"question": this.qRef.current.value})
        console.log(this.state.jsonData);
        this.changeJSON("maxVal", this.num1Ref.current.value, this.jsonData);
        this.changeJSON("number", this.numRef.current.value, this.state.jsonData);
        this.handleChange('FileContent', this.state.jsonData, 0);
    }

    changeJSON(key, value, data) {
        // var data = this.state.jsonData;
        data[key] = value;
      }
      textReturn2(xPos, yPos, tedxt){
        var hard = <text x = {xPos} y = {yPos} fontSize = "12" color = "grey">{tedxt}</text>;
        return hard;
      }
    handleChange(key, value, count) {
        this.props.handleChange(key, value, count);
    }

    render() {
        return (
            <div height = {1000} width = {1000} ref={this.svgRef}>
                    {this.textReturn2(300, 100, this.state.questionText)}
                    {this.textReturn2(300, 150, this.state.item1)}
                    {this.textReturn2(300, 200, this.state.item2)}
                    {this.textReturn2(300, 250, this.state.item3)}
                    {this.textReturn2(300, 300, this.state.total)}



                <div>
                Question:                   <br></br>

<input name = "refLine" id = "refLine" ref = {this.qRef}></input>
   <br></br>
                    Question 1:                   <br></br>

                <input name = "refLine1" id = "refLine1" ref = {this.q1Ref}></input>
                   <br></br>
                   Question 2:                   <br></br>

                   <input name = "refLine2" id = "refLine2" ref = {this.q2Ref}></input>
                   <br></br>
                   Question 3:                   <br></br>

                   <input name = "refLine3" id = "refLine3" ref = {this.q3Ref}></input>
                   <br></br>
                   Question 4:                    <br></br>

                   <input name = "refLine4" id = "refLine4" ref = {this.q4Ref}></input>
                   <br></br>
                   Question 5:                    <br></br>

                   <input name = "refLine5" id = "refLine5" ref = {this.q5Ref}></input>
                   <br></br>
                   Question 6:                    <br></br>

                   <input name = "refLine6" id = "refLine6" ref = {this.q6Ref}></input>
                   <br></br>
                   Question 7:                    <br></br>

                   <input name = "refLine7" id = "refLine7" ref = {this.q7Ref}></input>
                   <br></br>
                   Question 8:                    <br></br>

                   <input name = "refLine8" id = "refLine8" ref = {this.q8Ref}></input>
                   <br></br>
                   Question 9:                    <br></br>

                   <input name = "refLine9" id = "refLine9" ref = {this.q9Ref}></input>
                   <br></br>
                   Question 10:                    <br></br>

                   <input name = "refLine10" id = "refLine10" ref = {this.q10Ref}></input>
                   <br></br>
                   Enter the sum maximum value 
                   <br></br>

                   <input name = "refLine11" id = "refLine11" ref = {this.num1Ref}></input>
                   <br></br>
                   Enter the number of boxes you wish to display (2-10)
                   <br></br>
                   <input name = "refLine12" id = "refLine12" ref = {this.numRef}></input>
                  <input onClick = {() => this.onChangeItems()} type = "submit" value = "Submit"></input> 
                   <br></br>
                  </div>
            </div>
        )
    }
}

export default SumQuestion;