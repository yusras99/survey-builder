import React, { Component } from 'react';
import './HistSlider.css';

class Tradeoff extends Component {

    constructor(props) {
        super(props);
        this.sliderRef = React.createRef();
        this.slider2Ref = React.createRef();
        this.threeGraphRef = React.createRef();
        this.rectRef = React.createRef();
        this.svgRef = React.createRef();
        this.graphColRef=React.createRef();
        this.refLine1Ref = React.createRef();
        this.refLine2Ref = React.createRef();
        this.changeJSON = this.changeJSON.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.questionRef = React.createRef();
        this.sliderQuestionRef = React.createRef();
        this.titleRef = React.createRef();

        this.refLine4Ref = React.createRef();
        this.refLine3Ref = React.createRef();
        this.refLine6Ref = React.createRef();
        this.onUpdateShapes = this.onUpdateShapes.bind(this);
        this.arg1ref = React.createRef();
        this.arg2ref = React.createRef();
        this.arg3ref = React.createRef();
        this.arg4ref = React.createRef();
        this.arg5ref = React.createRef();
        this.arg6ref = React.createRef();
        this.arg7ref = React.createRef();
        this.arg8ref = React.createRef();
        this.arg9ref = React.createRef();
        this.arg10ref = React.createRef();
        this.arg11ref = React.createRef();
        this.arg12ref = React.createRef();

        this.refLine5Ref = React.createRef();
        this.refLine7Ref = React.createRef();
        this.refLine8Ref = React.createRef();

        this.stroke1Ref = React.createRef();
        this.areaRef = React.createRef();
        this.onChange2 = this.onChange2.bind(this);
        this.rectReturn1 = this.rectReturn1.bind(this);
        this.rectReturn2 = this.rectReturn2.bind(this);
        this.rectReturn3 = this.rectReturn3.bind(this);
        this.rectReturn4 = this.rectReturn4.bind(this);
        this.rectReturn5 = this.rectReturn5.bind(this);
        this.rectReturn6 = this.rectReturn6.bind(this);
        this.textReturn1 = this.textReturn1.bind(this);
        this.changeGraphColNumber = this.changeGraphColNumber.bind(this);
        this.line1 = this.line1.bind(this);
        this.changeGraphNumber = this.changeGraphNumber.bind(this);
        this.changeStroke1=this.changeStroke1.bind(this);

        this.establishStateData = this.establishStateData.bind(this);
        this.state = this.establishStateData(this.props.data);
        this.onChange1 = this.onChange1.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSliderQuestion = this.onChangeSliderQuestion.bind(this);
    }

    
    establishStateData(data){

      if(this.props.imported){
        return{
          stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            stroke3: "#ffc40c",
            rectWidth : 40,
            sliderPos:1,
            sliderPos2:1,
            questionText:"",
            rect1Arr: data["metric1_0"],
            rect1Height: 200*data["metric1_0"][0],
            rect2Arr: data["metric1_1"],
            rect2Height: 200*data["metric1_1"][0],
            rect3Arr: data["metric2_0"],
            rect3Height: 200*data["metric2_0"][0],
            rect4Arr: data["metric2_1"],
            rect4Height: 200*data["metric2_1"][0],
            rect5Arr: data["metric3_0"],
            rect5Height: 200*data["metric3_0"][0],
            rect6Arr: data["metric3_1"],
            rect6Height: 200*data["metric3_1"][0],
            rect7Arr: data["metric4_0"],
            rect7Height: 200*data["metric4_0"][0],
            rect8Arr: data["metric4_1"],
            rect8Height: 200*data["metric4_1"][0],
            line1Height:0.4,
            line2Height:0.5,
            line3Height:0.4,
            line4Height:0.2,
            line5Height:0.4,
            line6Height:0.3,
            line7Height:0.2,
            line8Height:0.1,
            threeGraphs: true,
            threeGraphOne: true,
            fourGraphOne: true,
            graphOneLabel: data["graphOnelabel"],
            graphTwoLabel:data["graphTwoLabel"],
            graphThreeLabel:data["graphThreeLabel"],
            graphFourlabel:data["graphFourLabel"],
            sliderLabelLeft:data["sliderLabelLeft"],
            sliderLabelRight:data["sliderLabelRight"],
            jsonData: data,
            label_1_1: 0,
            label_1_2:20,
            label_1_3: 40,
            label_1_4:60,
            label_1_5: 80,
            label_1_6: 100,
            label_2_1: 0,
            label_2_2: 20,
            label_2_3: 40,
            label_2_4: 60,
            label_2_5: 80,
            label_2_6: 100,

            label_3_1: 0,
            label_3_2: 20,
            label_3_3: 40,
            label_3_4:60,
            label_3_5:80,
            label_3_6:100,

            label_4_1: 0,
            label_4_2: 20,
            label_4_3: 40,
            label_4_4:60,
            label_4_5: 80,
            label_4_6: 100

        }
      }  
      if(data["label_1_1"] == ""){
           return{
            stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            stroke3: "#ffc40c",
            rectWidth : 40,
            sliderPos:1,
            sliderPos2:1,
            questionText:"",
            rect1Arr: data["metric1_0"],
            rect1Height: 200*data["metric1_0"][0],
            rect2Arr: data["metric1_1"],
            rect2Height: 200*data["metric1_1"][0],
            rect3Arr: data["metric2_0"],
            rect3Height: 200*data["metric2_0"][0],
            rect4Arr: data["metric2_1"],
            rect4Height: 200*data["metric2_1"][0],
            rect5Arr: data["metric3_0"],
            rect5Height: 200*data["metric3_0"][0],
            rect6Arr: data["metric3_1"],
            rect6Height: 200*data["metric3_1"][0],
            rect7Arr: data["metric4_0"],
            rect7Height: 200*data["metric4_0"][0],
            rect8Arr: data["metric4_1"],
            rect8Height: 200*data["metric4_1"][0],
            line1Height:0.4,
            line2Height:0.5,
            line3Height:0.4,
            line4Height:0.2,
            line5Height:0.4,
            line6Height:0.3,
            line7Height:0.2,
            line8Height:0.1,
            threeGraphs: true,
            threeGraphOne: true,
            fourGraphOne: true,
            graphOneLabel:"",
            graphTwoLabel:"",
            graphThreeLabel:"",
            graphFourlabel:"",
            sliderLabelLeft:"",
            sliderLabelRight:"",
            jsonData: data,
            label_1_1: 0,
            label_1_2:20,
            label_1_3: 40,
            label_1_4:60,
            label_1_5: 80,
            label_1_6: 100,
            label_2_1: 0,
            label_2_2: 20,
            label_2_3: 40,
            label_2_4: 60,
            label_2_5: 80,
            label_2_6: 100,

            label_3_1: 0,
            label_3_2: 20,
            label_3_3: 40,
            label_3_4:60,
            label_3_5:80,
            label_3_6:100,

            label_4_1: 0,
            label_4_2: 20,
            label_4_3: 40,
            label_4_4:60,
            label_4_5: 80,
            label_4_6: 100

         }
        }
        else{
          return{
            stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            stroke3: "#ffc40c",
            rect2Height : 100,
            rect3Height : 100,
            rect4Height: 100,
            rect5Height:100,
            rect6Height:100,
            rect7Height:100,
            rect8Height:100,
            rectWidth : 40,
            sliderPos:1,
            sliderPos2:1,
            questionText:"",
            rect1Arr: data["metric1_0"],
            rect1Height: 200*data["metric1_0"][0],
            rect2Arr: data["metric1_1"],
            rect3Arr: data["metric2_0"],
            rect4Arr: data["metric2_1"],
            rect5Arr: data["metric3_0"],
            rect6Arr: data["metric3_1"],
            rect7Arr: data["metric4_0"],
            rect8Arr: data["metric4_1"],
            line1Height:0.4,
            line2Height:0.5,
            line3Height:0.4,
            line4Height:0.2,
            line5Height:0.4,
            line6Height:0.3,
            line7Height:0.2,
            line8Height:0.1,
            threeGraphs: true,
            threeGraphOne: true,
            fourGraphOne: true,
            graphOneLabel:"",
            graphTwoLabel:"",
            graphThreeLabel:"",
            graphFourlabel:"",
            sliderLabelLeft:"",
            sliderLabelRight:"",
            jsonData: data,
            
            label_1_1: data["label_1_1"],
            label_1_2: data["label_1_2"],
            label_1_3: data["label_1_3"],
            label_1_4: data["label_1_4"],
            label_1_5: data["label_1_5"],
            label_1_6: data["label_1_6"],

            label_2_1: data["label_2_1"],
            label_2_2: data["label_2_2"],
            label_2_3: data["label_2_3"],
            label_2_4: data["label_2_4"],
            label_2_5: data["label_2_5"],
            label_2_6: data["label_2_6"],

            label_3_1: data["label_3_1"],
            label_3_2: data["label_3_2"],
            label_3_3: data["label_3_3"],
            label_3_4: data["label_3_4"],
            label_3_5: data["label_3_5"],
            label_3_6: data["label_3_6"],

            label_4_1: data["label_4_1"],
            label_4_2: data["label_4_2"],
            label_4_3: data["label_4_3"],
            label_4_4: data["label_4_4"],
            label_4_5: data["label_4_5"],
            label_4_6: data["label_4_6"],

            graphLabel1: data["graphLabel1"],
            graphLabel1: data["graphLabel2"],
            graphLabel1: data["graphLabel3"],
            graphLabel1: data["graphLabel4"],
            graphLabel1: data["graphLabel5"],
            graphLabel1: data["graphLabel6"]
          }
        }
    }
    //method to update the JSON file sent to participant side
    changeJSON(key, value, data) {
      // var data = this.state.jsonData;
      data[key] = value;
      this.handleChange('FileContent', this.jsonData, this.props.count);

    }

    //inherited method, common to all questions
    handleChange(key, value, count) {
      this.props.handleChange(key, value, count);
    }

    twographLine(xPos1,xPos2,height){
      var hard = <line x1 = {300 + xPos1} x2 = {300 + xPos2} y1 = {450 + 200*height - 200*0.01} y2 = {450 + 200*height - 200*0.01} stroke = "#000000"></line>;
      return hard;
    }
    bottomGraphLine(xPos1, xPos2, height){
      var hard = <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {150 + 200*height + 200*0.05} y2 = {150 + 200*height + 200*0.05} stroke = "#000000"></line>;
      return hard;
    }

    //method to update the number of bars on the lower two graphs
    changeGraphColNumber(){
      const newColor = this.graphColRef.current.value;
      if (newColor === "1 and 1"){
          this.setState({fourGraphOne: true});
          this.setState({threeGraphOne: true});
          this.handleChange("fourGraphOne", "true", this.props.count);
          this.handleChange("threeGraphOne", "true", this.props.count);
      }
      if (newColor === "1 and 2"){
          this.setState({fourGraphOne: false});
          this.setState({threeGraphOne: true});
          this.handleChange("fourGraphOne", "false", this.props.count);
          this.handleChange("threeGraphOne", "true", this.props.count);
      }
      if (newColor === "2 and 1"){
          this.setState({fourGraphOne: true});
          this.setState({threeGraphOne: false});
          this.handleChange("fourGraphOne", "true", this.props.count);
          this.handleChange("threeGraphOne", "false", this.props.count);
      }
      if (newColor === "2 and 2"){
          this.setState({fourGraphOne: false});
          this.setState({threeGraphOne: false});
          this.handleChange("fourGraphOne", "false", this.props.count);
          this.handleChange("threeGraphOne", "false", this.props.count);
      }
  }

  //method to update the question text
  onChangeQuestion(e){
    console.log(this.questionRef.current.value);
    this.setState({questionText:this.questionRef.current.value});
    this.handleChange('Question',this.questionRef.current.value,this.props.count);
}

//method to update the text directly above the slider
 onChangeSliderQuestion(e){
   this.setState({sliderQuestionText: this.sliderQuestionRef.current.value});
   this.handleChange('sliderQuestion', this.sliderQuestionRef.current.value, this.props.count);
 }

 //method to update the "Title" field
    onChangeTitle(e){
      console.log(this.titleRef.current.value);
      this.setState({title:this.titleRef.current.value});
      this.handleChange('Title',this.titleRef.current.value,this.props.count);
  }

  //method to update every label (including legend, graph Labels and slider Labels)
    onUpdateShapes(){
      this.setState({graphOneLabel : this.arg1ref.current.value})
      this.setState({graphTwoLabel : this.arg2ref.current.value})
      this.setState({sliderLabelLeft : this.arg3ref.current.value})
      this.setState({sliderLabelRight : this.arg4ref.current.value})
      this.setState({graphThreeLabel : this.arg6ref.current.value})
      this.setState({graphFourlabel : this.arg7ref.current.value})
      this.setState({legend1 : this.arg8ref.current.value})
      this.setState({legend2 : this.arg9ref.current.value})
      this.setState({legend3 : this.arg10ref.current.value})
      this.setState({legend4 : this.arg11ref.current.value})
      this.changeJSON("graphOneLabel", this.state.graphOneLabel, this.state.jsonData)
      this.changeJSON("graphTwoLabel", this.state.graphTwoLabel, this.state.jsonData)
      this.changeJSON("sliderLabelLeft", this.state.sliderLabelLeft, this.state.jsonData)
      this.changeJSON("sliderLabelRight", this.state.sliderLabelRight, this.state.jsonData)
      this.changeJSON("graphThreeLabel", this.state.graphThreeLabel, this.state.jsonData)
      this.changeJSON("graphFourLabel", this.state.graphFourlabel, this.state.jsonData)
      this.changeJSON("legend2", this.state.legend2, this.state.jsonData)
      this.changeJSON("legend1", this.state.legend1, this.state.jsonData)
      this.changeJSON("legend3", this.state.legend3, this.state.jsonData)
      this.changeJSON("legend4", this.state.legend4, this.state.jsonData)


      this.handleChange('FileContent', this.state.jsonData, this.props.count)


    }

    //method to update bar heights with slider movement. 
    onChange1(e){
        this.setState({ [e.target.name]: e.target.value })
        this.setState({rect1Height :200*this.state.rect1Arr[e.target.value]})
        this.setState({rect2Height :200*this.state.rect2Arr[e.target.value]})
        this.setState({rect3Height :200*this.state.rect3Arr[e.target.value]})
        this.setState({rect4Height :200*this.state.rect4Arr[e.target.value]})
        this.setState({rect5Height :200*this.state.rect5Arr[e.target.value]})
        this.setState({rect6Height :200*this.state.rect6Arr[e.target.value]})
        if(this.state.threeGraphs == false){
          this.setState({rect7Height :200*this.state.rect7Arr[e.target.value]})
          this.setState({rect8Height :200*this.state.rect8Arr[e.target.value]})
        }
    }

    //method to update first guide line
    onChange10(e){
      this.setState({line1Height:e})
      this.changeJSON("line1height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)

    }
    
    //method to update second guide line
    onChange2(e){
      this.setState({line2Height:e})
      this.changeJSON("line2height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)


    }

    //method to update third guide line
    onChange3(e){
      this.setState({line3Height:e})
      this.changeJSON("line3height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)


    }

    //method to update fourth guide line
    onChange4(e){
      this.setState({line4Height:e})
      this.changeJSON("line4height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)


    }

    //method to update fifth guide line
    onChange5(e){
      this.setState({line5Height:e})
      this.changeJSON("line5height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)


    }

    //method to update sixth guide line
    onChange6(e){
      this.setState({line6Height:e})
      this.changeJSON("line6height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)

    }

    //method to update seventh guide line
    onChange7(e){
      this.setState({line7Height:e})
      this.changeJSON("line7height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)

    }

    //method to update eight guide line
    onChange8(e){
      this.setState({line8Height:e})
      this.changeJSON("line8height", e, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, this.props.count)

    }

    //method to change the colors of the bars (within pre-set possibilities)
    changeStroke1() {
      const newColor = this.stroke1Ref.current.value;
      if (newColor === "RBY"){
        this.setState({stroke1:"#FF0000"}); //Red
        this.setState({stroke2:"#0000FF"}); //Blue
        this.setState({stroke3:"#ffc40c"}); //Yellow
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "RYB"){      
        this.setState({stroke1: "#FF0000"}); //Red
        this.setState({stroke2:"#ffc40c"}); //Yellow
        this.setState({stroke3:"#0000FF"}); //Blue
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)
      }
      if (newColor === "BYR"){
        this.setState({stroke1:"#0000FF"}); //Blue
        this.setState({stroke2:"#ffc40c"}); //Yellow
        this.setState({stroke3:"#FF0000"}); //Red
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }      
      if (newColor === "BRY"){
        this.setState({stroke1:"#0000FF"}); //Blue
        this.setState({stroke2:"#FF0000"}); //Red
        this.setState({stroke3:"#ffc40c"}); //Yellow
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "YRB"){
        this.setState({stroke1:"#ffc40c"}); //Yellow
        this.setState({stroke2:"#FF0000"}); //Red
        this.setState({stroke3:"0000FF"}); //Blue
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "YBR"){
        this.setState({stroke1:"#ffc40c"}); //Yellow
        this.setState({stroke2:"#0000FF"}); //Blue
        this.setState({stroke3:"#FF0000"}); //Red
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }

      this.handleChange('FileContent', this.state.jsonData, this.props.count)

    }

    //method to change the number of graphs (toggles between three and four graphs)
    changeGraphNumber(){
      const newGraph = this.threeGraphRef.current.value;
      console.log(this.threeGraphRef.current.value);
      if (newGraph === "True"){
        this.setState({threeGraphs: true});
        this.changeJSON("threeGraphs", this.state.threeGraphs, this.state.jsonData);
        this.handleChange('threeGaphs', this.threeGraphRef.current.value, this.props.count);

      }

      else{
        this.setState({threeGraphs: false});
        this.changeJSON("threeGraphs", this.state.threeGraphs, this.state.jsonData);
        this.handleChange('threeGaphs', this.threeGraphRef.current.value, this.props.count);

      }
  }


    //rectReturn 1-10 are methods to draw and update the bars on the graphs. 
    // 1-4 are for the top two graphs. 
    // 5 and 6 are used if there are two bars on the bottom left graph. 
    // 7 and 8 are used if there are two bars on the bottom right graph.
    // 9 is used if there is one bar on the bottom left graph; 10 if there is one bar on the bottom right. 
    rectReturn1(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect1Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn2(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect2Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn3(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect3Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn4(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect4Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn5(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn6(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn7(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect7Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn8(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect8Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn9(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke3} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn10(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke3} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }

      //method to draw black lines given x, y coords. 
      line1(xPos1,xPos2,yPos1,yPos2){
        var hard = 
        <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#000000" ></line>;
        return hard;
      }

      //method to draw grey lines given x, y coords. 
      line2(xPos1,xPos2,yPos1,yPos2){
        var hard = 
        <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"></line>;
        return hard;
      }
      //method to place text given x, y coords + string. 
      textReturn1(xPos, yPos, tedxt){
        var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
        return hard;
      }

    render(){
      const threeGraphs = this.state.threeGraphs;
        return (
            <div>
              
              <div class = "column">
              < text>{this.state.questionText}</text>
                <h1 ref={this.titleRef}>{this.state.title}</h1>
              </div>
                <svg width = {1400} height = {1000} style={{}} class = "b"> 
                    {/*               */}
                    {this.line1(173,187,648,648)}
                    {this.line1(173,187,488,488)}
                    {this.line1(173,187,528,528)}
                    {this.line1(173,187,568,568)}
                    {this.line1(173,187,608,608)}

                    {this.line2(180,358,648,648)}
                    {this.line2(180,358,488,488)}
                    {this.line2(180,358,528,528)}
                    {this.line2(180,358,568,568)}
                    {this.line2(180,358,608,608)}

                    {this.line1(176,184,628,628)}
                    {this.line1(176,184,468,468)}
                    {this.line1(176,184,508,508)}
                    {this.line1(176,184,548,548)}
                    {this.line1(176,184,588,588)}

                    {this.line2(180,358,628,628)}
                    {this.line2(180,358,468,468)}
                    {this.line2(180,358,508,508)}
                    {this.line2(180,358,548,548)}
                    {this.line2(180,358,588,588)}

                    {this.line2(580,760,648,648)}
                    {this.line2(580,760,488,488)}
                    {this.line2(580,760,528,528)}
                    {this.line2(580,760,568,568)}
                    {this.line2(580,760,608,608)}

                    {this.line2(580,760,628,628)}
                    {this.line2(580,760,468,468)}
                    {this.line2(580,760,508,508)}
                    {this.line2(580,760,548,548)}
                    {this.line2(580,760,588,588)}

                    {this.line1(173,187,488,488)}
                    {this.line1(173,187,528,528)}
                    {this.line1(173,187,568,568)}
                    {this.line1(173,187,608,608)}
                    
                    {this.line1(176,184,628,628)}
                    {this.line1(176,184,468,468)}
                    {this.line1(176,184,508,508)}
                    {this.line1(176,184,548,548)}
                    {this.line1(176,184,588,588)}

                    {
                    threeGraphs
                    ?  this.line2(330,510,238,238)
                    :  this.line2(580,760,240,240)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,198,198)

                    :  this.line2(580,760,200,200)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,278,278)

                    :  this.line2(580,760,280,280)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,318,318)

                    :  this.line2(580,760,320,320)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,358,358)

                    :  this.line2(580,760,358,358)
                  }

{
                    threeGraphs
                    ?  this.line2(330,510,238,238)
                    :  this.line2(180,358,240,240)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,198,198)

                    :  this.line2(180,358,200,200)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,278,278)

                    :  this.line2(180,358,280,280)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,318,318)

                    :  this.line2(180,358,320,320)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,358,358)

                    :  this.line2(180,358,358,358)
                  }

{
                    threeGraphs
                    ?  this.line2(330,510,218,218)
                    :  this.line2(180,358,220,220)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,178,178)

                    :  this.line2(180,358,180,180)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,258,258)

                    :  this.line2(180,358,260,260)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,298,298)

                    :  this.line2(180,358,300,300)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,338,338)

                    :  this.line2(180,358,340,340)
                  }

{
                    threeGraphs
                    ?  this.line2(330,510,218,218)
                    :  this.line2(580,760,220,220)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,178,178)

                    :  this.line2(580,760,180,180)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,258,258)

                    :  this.line2(580,760,260,260)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,298,298)

                    :  this.line2(580,760,300,300)
                  }
                                      {
                    threeGraphs
                    ?  this.line2(330,510,338,338)

                    :  this.line2(580,760,340,340)
                  }

                    {this.twographLine(195,245,this.state.line1Height)}
                    {this.twographLine(195,245,this.state.line1Height + 0.001)}
                    {this.twographLine(195,245,this.state.line1Height - 0.001)}

                    {this.twographLine(275,325,this.state.line2Height)}
                    {this.twographLine(275,325,this.state.line2Height + 0.001)}
                    {this.twographLine(275,325,this.state.line2Height - 0.001)}

                    {this.twographLine(595,645,this.state.line3Height)}
                    {this.twographLine(595,645,this.state.line3Height + 0.001)}
                    {this.twographLine(595,645,this.state.line3Height - 0.001)}

                    {this.twographLine(675,725,this.state.line4Height)}
                    {this.twographLine(675,725,this.state.line4Height + 0.001)}
                    {this.twographLine(675,725,this.state.line4Height - 0.001)}

                    {
                    threeGraphs
                    ? this.bottomGraphLine(480,430,this.state.line6Height)

                    : [(
                      this.state.fourGraphOne
                      ?this.bottomGraphLine(230,280,this.state.line6Height)
                      : this.bottomGraphLine(595,645,this.state.line7Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(355,405,this.state.line5Height)

                    : [(
                      this.state.fourGraphOne
                      ? this.bottomGraphLine(635,685,this.state.line6Height)
                      : this.bottomGraphLine(675,725,this.state.line8Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(480,430,this.state.line6Height)

                    : [(
                      this.state.threeGraphOne
                      ? <text></text>
                      : this.bottomGraphLine(275,325,this.state.line6Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(355,405,this.state.line5Height)

                    : [(
                      this.state.threeGraphOne
                      ? <text></text>
                      : this.bottomGraphLine(195,245,this.state.line5Height)
                    )]
                  }

                    {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(576,584,218,218)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,258,258)


                    : this.line1(576,584,298,298)
                  }
                  {
                    threeGraphs
                    ? this.line1(326,334,298,298)


                    : this.line1(576,584,337,337)
                  }
                  {
                    threeGraphs
                    ? this.line1(326,334,338,338)


                    : this.line1(573,587,358,358)
                  }

                  {
                    threeGraphs
                    ? this.line1(326,334,218,218)


                    : this.line1(176,184,218,218)
                  }
                  
                  {
                    threeGraphs
                    ? this.line1(326,334,258,258)


                    : this.line1(176,184,258,258)
                  }

                  {
                    threeGraphs
                    ? this.line1(326,334,178,178)


                    : this.line1(576,584,258,258)
                  }




                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(573,587,198,198)
                  }
                  {
                    threeGraphs
                    ? this.line1(323,337,238,238)


                    : this.line1(573,587,238,238)
                  }
                  {
                    threeGraphs
                    ? this.line1(323,337,278,278)


                    : this.line1(573,587,278,278)
                  }
                  {
                    threeGraphs
                    ? this.line1(323,337,318,318)


                    : this.line1(573,587,318,318)
                  }

                  {
                    threeGraphs
                    ? this.line1(323,337,358,358)


                    : this.line1(176,184,218,218)
                  }


                   {
                    threeGraphs
                    ? this.line1(323,337,198,198)


                    : this.line1(173,187,198,198)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,258,258)


                    : this.line1(173,187,238,238)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(173,187,278,278)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(173,187,318,318)
                  }

                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(176,184,218,218)
                  }











                  {
                    threeGraphs
                    ? this.line1(330,330,255,258)


                    : this.line1(176,184,298,298)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(176,184,337,337)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(173,187,358,358)
                  }


                  {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(576,584,218,218)
                  }
                                    {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(576,584,178,178)

                  }
                                    {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(176,184,178,178)
                  }

                    {this.line1(573,587,648,648)}
                    {this.line1(573,587,488,488)}
                    {this.line1(573,587,528,528)}
                    {this.line1(573,587,568,568)}
                    {this.line1(573,587,608,608)}

                    {this.line1(576,584,628,628)}
                    {this.line1(576,584,468,468)}
                    {this.line1(576,584,508,508)}
                    {this.line1(576,584,548,548)}
                    {this.line1(576,584,588,588)}

                    {this.rectReturn1(500,450)}
                    {this.rectReturn2(580,450)}
                    {this.rectReturn3(900,450)}
                    {this.rectReturn4(980,450)}
                    {
                      this.state.threeGraphs
                      ? this.rectReturn5(660,160)             
                      : [
                          (this.state.threeGraphOne
                          ? this.rectReturn9(535,160)
                          : this.rectReturn5(500,160)
                          )
                        ]
                    }
                    {
                      this.state.threeGraphs
                      ? this.rectReturn6(735,160)         
                      : [
                        (this.state.threeGraphOne
                        ? <text></text>
                        : this.rectReturn6(580,160)
                        )
                      ]     
                    }
                    {
                      this.state.threeGraphs
                      ? <text> </text>        
                      : [
                          (this.state.fourGraphOne
                          ? this.rectReturn10(940,160)  
                          : this.rectReturn7(900,160)   
                          )
                      ] 
                    }
                   {
                      this.state.threeGraphs
                      ? <text> </text>        
                      : [
                          (this.state.fourGraphOne
                          ? <text></text>
                          : this.rectReturn8(980,160)   
                          )
                      ] 
                    }
                    {this.line1(180,180,450,648)}
                    {this.line1(180,358,450,450)}
                    {this.line1(580,580,450,648)}
                    {this.line1(580,760,450,450)}
                    {
                    threeGraphs
                    ? this.line1(330,330,160,358)


                    : this.line1(180,180,160,358)

                  }
                
                  {
                    threeGraphs
                    ? this.line1(330,510,160,160)

                    : this.line1(180,358,160,160)
                  }
                  {
                    threeGraphs
                    ? this.line1(0,0,0,0)


                    : this.line1(580,580,160,358)

                  }
                  {
                    threeGraphs
                    ? this.line1(0,0,0,0)

                    : this.line1(580 ,760,160,160)
                  }
                    {this.twographLine(195,245,this.state.line1Height)}
                    {this.twographLine(275,325,this.state.line2Height)}
                    {this.twographLine(595,645,this.state.line3Height)}
                    {this.twographLine(675,725,this.state.line4Height)}
                    {
                    threeGraphs
                    ? this.bottomGraphLine(480,430,this.state.line6Height)

                    : [(
                      this.state.fourGraphOne
                      ?this.bottomGraphLine(230,280,this.state.line6Height)
                      : this.bottomGraphLine(595,645,this.state.line7Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(355,405,this.state.line5Height)

                    : [(
                      this.state.fourGraphOne
                      ? this.bottomGraphLine(635,685,this.state.line6Height)
                      : this.bottomGraphLine(675,725,this.state.line8Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(480,430,this.state.line6Height)

                    : [(
                      this.state.threeGraphOne
                      ? <text></text>
                      : this.bottomGraphLine(275,325,this.state.line6Height)
                    )]
                  }
                  {
                    threeGraphs
                    ? this.bottomGraphLine(355,405,this.state.line5Height)

                    : [(
                      this.state.threeGraphOne
                      ? <text></text>
                      : this.bottomGraphLine(195,245,this.state.line5Height)
                    )]
                  }
                                    </svg>
                  <svg class = "e" width = {1400} height = {800}>
                  <text x = {230} y = {265}>Legend:</text>
                  <text x = {305} y = {265}>{this.state.legend1}</text>
                  <rect x = {290} y = {255} height = {10} width = {10} stroke = {this.state.stroke1} fill = {this.state.stroke1}></rect>
                  <text x = {415} y = {265}>{this.state.legend2}</text>
                  <rect x = {510} y = {255} height = {10} width = {10} stroke = {this.state.stroke3} fill = {this.state.stroke3}></rect>
                  <text x = {525} y = {265}>{this.state.legend3}</text>
                  <text x = {675} y = {265}>{this.state.legend4}</text>
                  <rect x = {400} y = {255} height = {10} width = {10} stroke = {this.state.stroke2} fill = {this.state.stroke2}></rect>
                  {this.line1(330,365,265,265)}


                  <text x = {150} y = {200}>{this.state.sliderLabelLeft}</text>
                  <text x = {450} y = {200}>{this.state.sliderLabelRight}</text>
                  <text x = {55} y = {510}>{this.state.label_1_1}</text>
                  <text x = {50} y = {470}>{this.state.label_1_2}</text>
                  <text x = {50} y = {430}>{this.state.label_1_3}</text>
                  <text x = {50} y = {390}>{this.state.label_1_4}</text>
                  <text x = {50} y = {350}>{this.state.label_1_5}</text>
                  <text x = {45} y = {310}>{this.state.label_1_6}</text>
                  <text x = {450} y = {510}>{this.state.label_2_1}</text>
                  <text x = {445} y = {470}>{this.state.label_2_2}</text>
                  <text x = {445} y = {430}>{this.state.label_2_3}</text>
                  <text x = {445} y = {390}>{this.state.label_2_4}</text>
                  <text x = {445} y = {350}>{this.state.label_2_5}</text>
                  <text style = {{size:8}} x = {440} y = {310}>{this.state.label_2_6}</text>
                  {
                    threeGraphs
                    ? <text x = {185} y = {600}>{this.state.label_3_6}</text>

                    : <text x = {45} y = {600}>{this.state.label_3_6}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {640}>{this.state.label_3_5}</text>

                    : <text x = {50} y = {640}>{this.state.label_3_5}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {680}>{this.state.label_3_4}</text>

                    : <text x = {50} y = {680}>{this.state.label_3_4}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {720}>{this.state.label_3_3}</text>

                    : <text x = {50} y = {720}>{this.state.label_3_3}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {760}>{this.state.label_3_2}</text>

                    : <text x = {50} y = {760}>{this.state.label_3_2}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {790}>{this.state.label_3_1}</text>
                    : <text x = {50} y = {800}>{this.state.label_3_1}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {790}> </text>
                    : <text x = {445} y = {600}>{this.state.label_4_6}</text>
                  }
                   {
                    threeGraphs
                    ? <text x = {190} y = {640}></text>

                    : <text x = {452} y = {640}>{this.state.label_4_5}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {680}></text>

                    : <text x = {452} y = {680}>{this.state.label_4_4}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {720}></text>

                    : <text x = {452} y = {720}>{this.state.label_4_3}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {760}></text>

                    : <text x = {452} y = {760}>{this.state.label_4_2}</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {160} y = {790}> </text>
                    : <text x = {460} y = {800}>{this.state.label_4_1}</text>
                  }
                  <text x = {200} y = {310}>{this.state.graphOneLabel}</text>
                  <text x = {625} y = {310}>{this.state.graphTwoLabel}</text>
                  {
                    threeGraphs
                    ? <text x = {380} y = {610}>{this.state.graphThreeLabel}</text>
                    : <text x = {200} y = {610}></text>
                  }
                  {
                    threeGraphs
                    ? <text> </text>
                    : <text x = {625} y = {610}>{this.state.graphFourlabel}</text>
                  }
                  <text x = {200} y = {310}></text>
                  <text x = {625} y = {310}></text>
                  {
                    threeGraphs
                    ? <text x = {380} y = {610}>{this.state.graphThreeLabel}</text>
                    : <text x = {200} y = {610}>{this.state.graphThreeLabel}</text>
                  }
                  {
                    threeGraphs
                    ? <text> </text>
                    : <text x = {625} y = {610}>{this.state.graphFourLabel}</text>
                  }

          </svg>
              
                <input type="range" min={0} max={(this.state.rect1Arr.length)-1} 
              className="hist-slider" onChange={this.onChange1}
              name="sliderPos" value={this.state.sliderPos} ref={this.sliderRef} list = "tickmarks"
              style={{left: -610, top: -1600, width: 200}}/>
                  <br></br>
                <div className = "f">
                  <select name = "threeGraphs" id = "threeGraphs" ref = {this.threeGraphRef}>
                    <option value = "False">Four graphs</option>
                    <option value = "True">Three graphs</option>                   
                  </select>
                  <input onClick = {() => this.changeGraphNumber()} type = "submit" value = "Submit"></input>
                  <br></br>
                  <select name = "graphCol" id = "graphCol" ref = {this.graphColRef}>
                    <option value = "1 and 1">1 and 1</option>
                    <option value = "1 and 2">2 and 1</option>
                    <option value = "2 and 1">1 and 2</option>
                    <option value = "2 and 2">2 and 2</option>
                  </select>
                  <input onClick = {() => this.changeGraphColNumber()} type = "submit" value = "Submit"></input>
                  <div class = "box">
                    Edit question text for above the graphs:
                    <input name = "question" id = "question" ref = {this.questionRef}></input>
                    <input onClick = {() => this.onChangeQuestion()} type = "submit" value = "Submit"></input>
                </div>
                <div class = "box">
                    Edit question text for directly above the slider:
                    <input name = "sliderQuestion" id = "sliderQuestion" ref = {this.sliderQuestionRef}></input>
                    <input onClick = {() => this.onChangeSliderQuestion()} type = "submit" value = "Submit"></input>
                </div>
                <div class="box">
                    Edit title:
                    <input name = "title" id = "title" ref = {this.titleRef}></input>
                  <input onClick = {() => this.onChangeTitle()} type = "submit" value = "Submit"></input> 
                </div>
                  <br></br>
                  <label>Choose a color combination (starting from top left): </label>
                  <select name="stroke1" id="stroke1" ref={this.stroke1Ref}
                    defaultValue={this.state.stroke1}>
                    <option value="RBY">Red Blue Yellow</option>
                    <option value="BRY">Blue Red Yellow</option>
                    <option value="YBR">Yellow Blue Red</option>
                    <option value="YRB">Yellow Red Blue</option>
                    <option value = "RYB">Red Yellow Blue</option>
                    <option value = "BYR">Blue Yellow Red</option>
                  </select>
                  <input onClick={() => this.changeStroke1()} type="submit" value="Submit"></input>
                  <br></br>
                  Enter the graph one label here
                  <br/>
                  <input type="text" id = "question" ref={this.arg1ref}
                    defaultValue={""}/>
                    <br></br>
                  Enter the graph two here
                  <br/>
                  <input type="text" id = "question" ref={this.arg2ref}
                    defaultValue={""}/>
                    <br></br>
                    Enter the graph three label
                  <br/>
                  <input type="text" id = "question" ref={this.arg6ref}
                    defaultValue={""}/>
                    <br></br>
                  Enter the graph four label (if applicable)
                  <br/>
                  <input type="text" id = "question" ref={this.arg7ref}
                    defaultValue={""}/>
                    <br/>
                  Enter the left hand label of the slider here
                  <br/>
                  <input type="text" id = "question" ref={this.arg3ref}
                    defaultValue={""}/>
                    <br></br>
                  Enter the right hand label of the slider here
                  <br/>
                  <input type="text" id = "question" ref={this.arg4ref}
                    defaultValue={""}/>
                    <br></br>
                  
                                     Enter the first legend entry
                  <br/>
                  <input type="text" id = "question" ref={this.arg8ref}
                    defaultValue={""}/>
                    <br></br>
                    Enter the second legend entry
                  <br/>
                  <input type="text" id = "question" ref={this.arg9ref}
                    defaultValue={""}/>
                    <br></br>
                    Enter the third legend entry
                  <br/>
                  <input type="text" id = "question" ref={this.arg10ref}
                    defaultValue={""}/>
                    <br></br>
                    Enter the fourth legend entry
                  <br/>
                  <input type="text" id = "question" ref={this.arg11ref}
                    defaultValue={""}/>
                  <button onClick={() => this.onUpdateShapes()}>
                  Update 
                   </button> <br/>
                   <br></br>
                   Enter the guide line heights from the top left (please input values between 0 and 1; input 0 for no guide line to show)
                  <br/>
                  <input name = "refLine1" id = "refLine1" ref = {this.refLine1Ref}></input>
                  <input onClick = {() => this.onChange10(this.refLine1Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine2" id = "refLine2" ref = {this.refLine2Ref}></input>
                  <input onClick = {() => this.onChange2(this.refLine2Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine3" id = "refLine3" ref = {this.refLine3Ref}></input>
                  <input onClick = {() => this.onChange3(this.refLine3Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine4" id = "refLine4" ref = {this.refLine4Ref}></input>
                  <input onClick = {() => this.onChange4(this.refLine4Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine5" id = "refLine5" ref = {this.refLine5Ref}></input>
                  <input onClick = {() => this.onChange5(this.refLine5Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine6" id = "refLine6" ref = {this.refLine6Ref}></input>
                  <input onClick = {() => this.onChange6(this.refLine6Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine7" id = "refLine7" ref = {this.refLine7Ref}></input>
                  <input onClick = {() => this.onChange7(this.refLine7Ref.current.value)} type = "submit" value = "Submit"></input> 
                  <br></br>
                  <input name = "refLine8" id = "refLine8" ref = {this.refLine8Ref}></input>
                  <input onClick = {() => this.onChange8(this.refLine8Ref.current.value)} type = "submit" value = "Submit"></input> 
                  </div>
                </div>
        );
    }

}

export default Tradeoff;
