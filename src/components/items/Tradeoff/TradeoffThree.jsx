import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './HistSlider.css';

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";



class Tradeoff extends Component {
    constructor(props) {
        // putting super() here so that we can use this.blahblah
        super(props);
        this.sliderRef = React.createRef();
        this.slider2Ref = React.createRef();
        this.threeGraphRef = React.createRef();
        this.rectRef = React.createRef();
        this.svgRef = React.createRef();
        this.graphColRef=React.createRef();
        this.refLine1Ref = React.createRef();
        this.refLine2Ref = React.createRef();
  
        this.refLine4Ref = React.createRef();
        this.refLine3Ref = React.createRef();
        this.refLine6Ref = React.createRef();
        this.refLine5Ref = React.createRef();
        this.refLine7Ref = React.createRef();
        this.refLine8Ref = React.createRef();
  
        this.stroke1Ref = React.createRef();
        this.areaRef = React.createRef();
        this.rectReturn1 = this.rectReturn1.bind(this);
        this.rectReturn2 = this.rectReturn2.bind(this);
        this.rectReturn3 = this.rectReturn3.bind(this);
        this.rectReturn4 = this.rectReturn4.bind(this);
        this.rectReturn5 = this.rectReturn5.bind(this);
        this.rectReturn6 = this.rectReturn6.bind(this);
        this.textReturn1 = this.textReturn1.bind(this);
        this.line1 = this.line1.bind(this);
        this.line2 = this.line2.bind(this);
        this.state = this.establishStateData(this.props.jsonData);



        this.onChange1 = this.onChange1.bind(this);
  
    
        this.resetState = this.resetState.bind(this);
        //this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.noAnswer = this.noAnswer.bind(this);
      }

  
// setting the initial state of this component 
    establishStateData(data) {
      if(data["label_1_1"] == ""){
        console.log(this.props.threeGraphOne);
        console.log(data);

        return{
          submitted: false,
          stroke1 : "#FF0000",
          stroke2 : "#0000FF",
          stroke3: "#ffc40c",
          rectWidth : 40,
          sliderPos:0,
          rect1Arr: data["metric1_0"],
          rect2Arr: data["metric1_1"],
          rect3Arr: data["metric2_0"],
          rect4Arr: data["metric2_1"],
          rect5Arr: data["metric3_0"],
          rect6Arr: data["metric3_1"],
          questionText: this.props.question,
          line1Height: data["line1height"],
          line2Height: data["line2height"],
          line3Height:data["line3height"],
          line4Height:data["line4height"],
          line5Height:data["line5height"],
          line6Height:data["line6height"],
          line7Height:data["line7height"],
          line8Height:data["line8height"],
          threeGaphs: data["threeGraphs"],
          threeGraphOne: this.props.threeGraphOne,
          fourGraphOne: this.props.fourGraphOne,
          sliderQuestion: this.props.sliderQuestion,
          graphOneLabel: data["graphOneLabel"],
          graphTwoLabel:data["graphTwoLabel"],
          graphThreeLabel:data["graphThreeLabel"],
          graphFourlabel:data["graphFourLabel"],
          sliderLabelLeft:data["sliderLabelLeft"],
          sliderLabelRight:data["sliderLabelRight"],
          legend1 : data["legend1"],
          legend2 : data["legend2"],
          legend3 : data["legend3"],
          legend4 : data["legend4"],
          jsonData: data,
          label_1_1: 0,
            label_1_2:20,
            label_1_3: 40,
            label_1_4:60,
            label_1_5: 80,
            label_1_6: 100,
        }
      }
      else{
        console.log(data["threeGraphOne"]);
        console.log(data);
        return{
            submitted: false,
            stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            stroke3: "#ffc40c",
            rectWidth : 40,
            sliderPos:0,
            rect1Arr: data["metric1_0"],
            rect2Arr: data["metric1_1"],
            rect3Arr: data["metric2_0"],
            rect4Arr: data["metric2_1"],
            rect5Arr: data["metric3_0"],
            rect6Arr: data["metric3_1"],
            questionText: this.props.question,
            line1Height: data["line1height"],
            line2Height:0.85,
            line3Height:data["line3height"],
            line4Height:data["line4height"],
            line5Height:data["line5height"],
            line6Height:data["line6height"],
            line7Height:data["line7height"],
            line8Height:data["line8height"],
            threeGaphs: data["threeGraphs"],
            threeGraphOne: this.props.threeGraphOne,
            fourGraphOne: this.props.fourGraphOne,
            sliderQuestion: this.props.sliderQuestion,
            graphOneLabel: data["graphOneLabel"],
            graphTwoLabel:data["graphTwoLabel"],
            graphThreeLabel:data["graphThreeLabel"],
            graphFourlabel:data["graphFourLabel"],
            sliderLabelLeft:data["sliderLabelLeft"],
            sliderLabelRight:data["sliderLabelRight"],
            legend1 : data["legend1"],
            legend2 : data["legend2"],
            legend3 : data["legend3"],
            legend4 : data["legend4"],
            jsonData: data,
            label_1_1: data["label_1_1"],
            label_1_2: data["label_1_2"],
            label_1_3: data["label_1_3"],
            label_1_4: data["label_1_4"],
            label_1_5: data["label_1_5"],
            label_1_6: data["label_1_6"],
            label_2_1: data["label_1_1"],
            label_2_2: data["label_1_2"],
            label_2_3: data["label_1_3"],
            label_2_4: data["label_1_4"],
            label_2_5: data["label_1_5"],
            label_2_6: data["label_1_6"],
            label_3_1: data["label_1_1"],
            label_3_2: data["label_1_2"],
            label_3_3: data["label_1_3"],
            label_3_4: data["label_1_4"],
            label_3_5: data["label_1_5"],
            label_3_6: data["label_1_6"],
            label_4_1: data["label_1_1"],
            label_4_2: data["label_1_2"],
            label_4_3: data["label_1_3"],
            label_4_4: data["label_1_4"],
            label_4_5: data["label_1_5"],
            label_4_6: data["label_1_6"]

        }
        }


    };
    
    
    resetState() {
        this.setState(this.initialState);
      }
      
      twographLine(xPos1,xPos2,height){
        var hard = <line x1 = {xPos1 - 150} x2 = {xPos2-150} y1 = {350 - 200*height - 200*0.01} y2 = {350 - 200*height - 200*0.01} stroke = "#000000" height = {5}></line>;
        return hard;
      }
      bottomGraphLine(xPos1, xPos2, height){
        var hard = <line x1 = {xPos1 - 150} x2 = {xPos2-150} y1 = {650 - 200*height + 200*0.05} y2 = {650 - 200*height + 200*0.05} stroke = "#000000" width = {5}></line>;
        return hard;
      }

    // additional setup to communicate with Experiment.js
    componentDidMount() {
      const { childRef } = this.props;
      childRef(this);
      this.getData();
      this.props.setWhichItem("trade-off-three");
    }
    // additional setup to communicate with Experiment.js
    componentWillUnmount() {
      const { childRef } = this.props;
      childRef(undefined);
   }
  // get experiment data from the database 
    getData() {
        const db = this.props.expt.dbInfo.db;
        const studyName = this.props.expt.dbInfo.col.split("-")[0];
        const exptName = this.props.expt.dbInfo.col.split("-")[1];
        this.props.getExpt(db, studyName, exptName);
    }
    onSubmit() {
      const question = this.state.questionText;
      const answer = {
        [question]: this.state.sliderPos,
      }
      this.props.storeAnswer(question, answer);
      this.setState({ submitted: true });
    }
        
    noAnswer() {
        const questionTO = this.props.questionTOKey;
        const sliderPos = "Prefer Not to Answer";
        this.props.storeAnswer(questionTO,sliderPos);
        this.setState({ submitted: true });
    }

      onChange1(e){
          this.setState({ [e.target.name]: e.target.value })
      }
  
    rectReturn1(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 200 - 200*this.state.rect1Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke1} height = {200*this.state.rect1Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn2(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 200 - 200 *this.state.rect2Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke2} height = {200*this.state.rect2Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn3(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 200 - 200 *this.state.rect3Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke1} height = {200*this.state.rect3Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn4(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 200 - 200 *this.state.rect4Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke2} height = {200*this.state.rect4Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn5(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 *this.state.rect5Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke1} height = {200*this.state.rect5Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn6(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 *this.state.rect6Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke2} height = {200*this.state.rect6Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn7(xPos, yPos){
        console.log(this.props.threeGaphs);
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 *this.state.rect3Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke1} height = {200*this.state.rect7Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn8(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 *this.state.rect4Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {this.state.stroke2} height = {200*this.state.rect8Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn9(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 * this.state.rect5Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {"#ffa500"} height = {200*this.state.rect5Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn10(xPos, yPos){
        var hard = 
        <rect
        x = {xPos - 450} y = {yPos + 198 - 200 * this.state.rect6Arr[this.state.sliderPos]} stroke = {"#000000"} fill = {"#ffa500"} height = {200*this.state.rect6Arr[this.state.sliderPos]} width = {this.state.rectWidth} fillOpacity = "1" strokeOpacity = "0.7"></rect>;
        return hard;
      }
        line1(xPos1,xPos2,yPos1,yPos2){
          var hard = 
          <line x1 = {xPos1 - 150} x2 = {xPos2 - 150} y1 = {yPos1} y2 = {yPos2} stroke = "#000000"></line>;
          return hard;
        }
        line2(xPos1,xPos2,yPos1,yPos2){
          var hard = 
          <line x1 = {xPos1 - 150} x2 = {xPos2 - 150} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"></line>;
          return hard;
        }

        textReturn1(xPos, yPos, tedxt){
          var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
          return hard;
        }
  
    render(){
        const threeGaphs = this.state.threeGaphs;
        return (
          <div>
            <div class = "column">
                    <text>{this.state.questionText}</text>
                    <h1 ref = {this.titleRef}>{this.state.title}</h1>
                    {console.log(this.state.threeGraphOne)}
                </div>
              
                


                                 
                <div>
                  <svg width = {1400} height = {750} style={{}} class = "b">
                    
                    <svg class = "b">
                      <text x = {600} y = {25}>Legend:</text>
                      <text x = {640} y = {60}>{this.state.legend1}</text>
                      <rect x = {620} y = {50} height = {10} width = {10} stroke = {this.state.stroke1} fill = {this.state.stroke1}></rect>
                      <text x = {640} y = {85}>{this.state.legend2}</text>
                      <rect x = {620} y = {75} height = {10} width = {10} stroke = {this.state.stroke2} fill = {this.state.stroke2}></rect>
                      {
                        this.state.threeGaphs
                        ? <text></text>
                        :<rect x = {620} y = {100} height = {10} width = {10} stroke = {this.state.stroke3} fill = {this.state.stroke3}></rect>
                      }
                      {
                        this.state.threeGaphs
                        ? <text></text>
                        : <text x = {640} y = {110}>{this.state.legend3}</text>
                      }
                      {
                        this.state.line1Height == 0
                        ? <text x = {650} y = {175}></text>
                        : <text x = {650} y = {135}>{this.state.legend4}</text>
                      }

                      {this.state.line1Height == 0
                        ?<text></text>
                        : this.line1(770,795,125,125)
                        }


                      <text x = {30} y = {115}>{this.state.graphOneLabel}</text>
                      <text x = {450} y = {115}>{this.state.graphTwoLabel}</text>
                      <text x = {10} y = {350}>{this.state.label_1_1}</text>
                      <text x = {0} y = {310}>{this.state.label_1_2}</text>
                      <text x = {0} y = {270}>{this.state.label_1_3}</text>
                      <text x = {0} y = {230}>{this.state.label_1_4}</text>
                      <text x = {0} y = {190}>{this.state.label_1_5}</text>
                      <text x = {-3} y = {150}>{this.state.label_1_6}</text>
                      <text x = {403} y = {350}>{this.state.label_1_1}</text>
                      <text x = {400} y = {310}>{this.state.label_1_2}</text>
                      <text x = {400} y = {270}>{this.state.label_1_3}</text>
                      <text x = {400} y = {230}>{this.state.label_1_4}</text>
                      <text x = {400} y = {190}>{this.state.label_1_5}</text>
                      <text x = {397} y = {150}>{this.state.label_1_6}</text>
                      {
                        threeGaphs
                        ? <text x = {145} y = {460}>{this.state.label_1_6}</text>

                        : <text x = {-3} y = {460}>{this.state.label_1_6}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {150} y = {505}>{this.state.label_1_5}</text>

                        : <text x = {0} y = {505}>{this.state.label_1_5}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {150} y = {545}>{this.state.label_1_4}</text>

                        : <text x = {0} y = {545}>{this.state.label_1_4}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {150} y = {585}>{this.state.label_1_3}</text>

                        : <text x = {0} y = {585}>{this.state.label_1_3}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {150} y = {625}>{this.state.label_1_2}</text>

                        : <text x = {0} y = {625}>{this.state.label_1_2}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {150} y = {665}>{this.state.label_1_1}</text>
                        : <text x = {0} y = {665}>{this.state.label_1_1}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {238} y = {790}> </text>
                        : <text x = {400} y = {465}>{this.state.label_1_6}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {190} y = {640}></text>

                        : <text x = {400} y = {505}>{this.state.label_1_5}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {190} y = {680}></text>

                        : <text x = {400} y = {545}>{this.state.label_1_4}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {190} y = {720}></text>

                        : <text x = {400} y = {585}>{this.state.label_1_3}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {190} y = {760}></text>

                        : <text x = {400} y = {625}>{this.state.label_1_2}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {160} y = {790}> </text>
                        : <text x = {400} y = {665}>{this.state.label_1_1}</text>
                      }

                      {
                        threeGaphs
                        ? <text x = {200} y = {450}>{this.state.graphThreeLabel}</text>
                        : <text x = {200} y = {610}></text>
                      }
                      {
                        threeGaphs
                        ? <text> </text>
                        : <text x = {450} y = {450}>{this.state.graphFourlabel}</text>
                      }
                      {
                        threeGaphs
                        ? <text x = {200} y = {450}>{this.state.graphThreeLabel}</text>
                        : <text x = {30} y = {450}>{this.state.graphThreeLabel}</text>
                      }
                      {
                        threeGaphs
                        ? <text> </text>
                        : <text x = {625} y = {760}>{this.state.graphFourLabel}</text>
                      }
                      </svg>
                  {this.line1(173,187,350,350)}
                  {this.line2(180, 360, 350, 350)}
                  {this.line1(173,187,188,188)}
                  {this.line1(173,187,228,228)}
                  {this.line1(173,187,268,268)}
                  {this.line1(173,187,308,308)}


                  {this.line1(176,184,328,328)}
                  {this.line1(176,184,168,168)}
                  {this.line1(176,184,208,208)}
                  {this.line1(176,184,248,248)}
                  {this.line1(176,184,288,288)}
                  {this.line1(173,187,188,188)}
                  {this.line1(173,187,228,228)}
                  {this.line1(173,187,268,268)}
                  {this.line1(173,187,308,308)}

                  {this.line1(176,184,328,328)}
                  {this.line1(176,184,168,168)}
                  {this.line1(176,184,208,208)}
                  {this.line1(176,184,248,248)}
                  {this.line1(176,184,288,288)}
                  {
                    this.state.line1Height == 0
                    ? <text></text>
                    : this.twographLine(195,245,this.state.line1Height)
                  }
                  {
                    this.state.line2Height == 0
                    ? <text></text>
                    : this.twographLine(275,325,this.state.line2Height)
                  }
                  {
                    this.state.line3Height == 0
                    ? <text></text>
                    : this.twographLine(595,645,this.state.line3Height)
                  }
                  {
                    this.state.line4Height == 0
                    ? <text></text>
                    : this.twographLine(675,725,this.state.line4Height)
                  }

                    {this.line2(180,358,188,188)}
                    {this.line2(180,358,228,228)}
                    {this.line2(180,358,268,268)}
                    {this.line2(180,358,308,308)}
                    {this.line2(180,358,328,328)}
                    {this.line2(180,358,168,168)}
                    {this.line2(180,358,208,208)}
                    {this.line2(180,358,248,248)}
                    {this.line2(180,358,288,288)}

                    {this.line2(580,760,350,350)}
                    {this.line2(580,760,188,188)}
                    {this.line2(580,760,228,228)}
                    {this.line2(580,760,268,268)}
                    {this.line2(580,760,308,308)}

                    {this.line2(580,760,328,328)}
                    {this.line2(580,760,168,168)}
                    {this.line2(580,760,208,208)}
                    {this.line2(580,760,248,248)}
                    {this.line2(580,760,288,288)}
                    {
                    threeGaphs
                    ?  this.line2(330,510,538,538)
                    :  this.line2(580,760,538,538)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,498,498)

                    :  this.line2(580,760,498,498)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,578,578)

                    :  this.line2(580,760,578,578)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,618,618)

                    :  this.line2(580,760,618,618)
                  }
                                      {
                    threeGaphs
                    ?  this.line1(330,510,658,658)

                    :  this.line1(580,760,658,658)
                  }

{
                    threeGaphs
                    ?  this.line2(330,510,538,538)
                    :  this.line2(180,358,538,538)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,498,498)

                    :  this.line2(180,358,498,498)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,578,578)

                    :  this.line2(180,358,578,578)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,618,618)

                    :  this.line2(180,358,618,618)
                  }
                                      {
                    threeGaphs
                    ?  this.line1(330,510,658,658)

                    :  this.line1(180,358,658,658)
                  }

{
                    threeGaphs
                    ?  this.line2(330,510,518,518)
                    :  this.line2(180,358,518,518)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,478,478)

                    :  this.line2(180,358,478,478)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,558,558)

                    :  this.line2(180,358,558,558)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,598,598)

                    :  this.line2(180,358,598,598)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,638,638)

                    :  this.line2(180,358,638,638)
                  }

{
                    threeGaphs
                    ?  this.line2(330,510,518,518)
                    :  this.line2(580,760,518,518)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,478,478)

                    :  this.line2(580,760,478,478)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,558,558)

                    :  this.line2(580,760,558,558)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,598,598)

                    :  this.line2(580,760,598,598)
                  }
                                      {
                    threeGaphs
                    ?  this.line2(330,510,638,638)

                    :  this.line2(580,760,638,638)
                  }
                  {
                  threeGaphs
                  ? [(
                    this.state.line6Height == 0
                    ? <text></text>
                    : this.bottomGraphLine(480,430,this.state.line6Height)
                  )]
                  : [(
                    this.state.fourGraphOne
                    ? [(
                      this.state.line6Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(230,280,this.state.line6Height)
                    )]
                    : [(
                      this.state.line7Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(595,645,this.state.line7Height)
                  )])]
                }
                {
                threeGaphs
                  ? [(
                    this.state.line5Height == 0
                    ? <text></text>
                    : this.bottomGraphLine(355,405,this.state.line5Height)
                  )]
                  : [(
                    this.state.fourGraphOne
                    ? [(
                      this.state.line6Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(355,405,this.state.line6Height)
                    )]
                    : [(
                      this.state.line8Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(675,725,this.state.line8Height)
                  )])]
                }
                {
                threeGaphs
                  ? [(
                    this.state.line6Height == 0
                    ? <text></text>
                    : this.bottomGraphLine(480,430,this.state.line6Height)
                  )]
                  : [(
                    this.state.threeGraphOne
                    ? <text></text>
                    : [(
                      this.state.line8Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(275,325,this.state.line6Height)
                  )])]
                }
                {
                threeGaphs
                  ? [(
                    this.state.line5Height == 0
                    ? <text></text>
                    : this.bottomGraphLine(355,405,this.state.line5Height)
                  )]
                  : [(
                    this.state.threeGraphOne
                    ? <text></text>
                    : [(
                      this.state.line5Height == 0
                      ? <text></text>
                      : this.bottomGraphLine(195,245,this.state.line5Height)
                  )])]
                }

                  {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(576,584,518,518)
                }
                {
                  threeGaphs
                  ? this.line2(330,510,460,460)


                  : this.line1(576,584,518,518)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,558,558)


                  : this.line1(576,584,598,598)
                }
                {
                  threeGaphs
                  ? this.line1(326,334,598,598)


                  : this.line1(576,584,637,637)
                }
                {
                  threeGaphs
                  ? this.line1(326,334,638,638)


                  : this.line1(573,587,658,658)
                }

                {
                  threeGaphs
                  ? this.line1(326,334,518,518)


                  : this.line1(176,184,518,518)
                }
                
                {
                  threeGaphs
                  ? this.line1(326,334,558,558)


                  : this.line1(176,184,558,558)
                }

                {
                  threeGaphs
                  ? this.line1(326,334,478,478)


                  : this.line1(576,584,558,558)
                }




                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(573,587,498,498)
                }
                {
                  threeGaphs
                  ? this.line1(323,337,538,538)


                  : this.line1(573,587,538,538)
                }
                {
                  threeGaphs
                  ? this.line1(323,337,578,578)


                  : this.line1(573,587,578,578)
                }
                {
                  threeGaphs
                  ? this.line1(323,337,618,618)


                  : this.line1(573,587,618,618)
                }

                {
                  threeGaphs
                  ? this.line1(323,337,658,658)


                  : this.line1(176,184,518,518)
                }


                 {
                  threeGaphs
                  ? this.line1(323,337,498,498)


                  : this.line1(173,187,498,498)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,558,558)


                  : this.line1(173,187,538,538)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(173,187,578,578)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(173,187,618,618)
                }

                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(176,184,518,518)
                }

                {
                  threeGaphs
                  ? this.line1(330,330,555,558)


                  : this.line1(176,184,598,598)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(176,184,637,637)
                }
                {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(173,187,658,658)
                }


                {
                  threeGaphs
                  ? this.line1(330,330,460,658)

                  : this.line1(576,584,518,518)
                }
                                  {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(576,584,478,478)

                }
                                  {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(176,184,478,478)
                }

                  {this.line1(573,587,248,248)}
                  {this.line1(573,587,208,208)}
                  {this.line1(576,584,188,188)}
                  {this.line1(576,584,228,228)}
                  {this.line1(576,584,268,268)}
                  {this.line1(576,584,308,308)}


                  {this.line1(573,587,208,208)}
                  {this.line1(573,587,208,208)}
                  {this.line1(573,587,208,208)}

                  {this.line1(573,587,150,150)}
                  {this.line1(173,187,150,150)}
                  {this.line2(580,760,150,150)}
                  {this.line2(180,358,150,150)}


                  {this.line1(573,587,168,168)}
                  {this.line1(573,587,208,208)}

                  {this.line1(576,584,328,328)}
                  {this.line1(576,584,168,168)}
                  {this.line1(576,584,208,208)}
                  {this.line1(576,584,248,248)}
                  {this.line1(576,584,288,288)}


                
                  {this.line1(178,178,150,350)}
                  {this.line1(180,358,350,350)}
                  {this.line1(580,580,150,350)}
                  {this.line1(580,760,350,350)}
                  {
                  threeGaphs
                  ? this.line1(330,330,460,658)


                  : this.line1(178,178,460,658)

                }
              
                {
                  threeGaphs
                  ? this.line1(330,510,658,658)

                  : this.line2(180,360,460,460)
                }
                {
                  threeGaphs
                  ? this.line1(0,0,0,0)


                  : this.line1(580,580,460,658)

                }
                {
                  threeGaphs
                  ? this.line1(0,0,0,0)

                  : this.line2(580,760,460,460)
                }
                  {this.rectReturn1(500,150)}
                  {this.rectReturn2(580,150)}
                  {this.rectReturn3(900,150)}
                  {this.rectReturn4(980,150)}
                  {
                    this.state.threeGaphs
                    ? this.rectReturn5(660,460)             
                    : [
                        (this.state.threeGraphOne
                        ? this.rectReturn9(535,460)
                        : this.rectReturn5(500,460)
                        )
                      ]
                  }
                  {
                    this.state.threeGaphs
                    ? this.rectReturn6(735,460)         
                    : [
                      (this.state.threeGraphOne
                      ? <text></text>
                      : this.rectReturn6(580,460)
                      )
                    ]     
                  }     
                                    {
                    this.state.threeGaphs
                    ? <text> </text>        
                    : [
                        (this.state.threeGraphOne
                        ? this.rectReturn10(940,460)  
                        : this.rectReturn7(900,160)   
                        )
                        ] 
                      }
                 {
                    this.state.threeGaphs
                    ? <text> </text>        
                    : [
                        (this.state.fourGraphOne
                        ? <text></text>
                        : this.rectReturn8(980,160)   
                        )
                    ] 
                  } 
                                <text x = {200} y = {700}>{this.state.sliderQuestion}</text>


                  </svg>
              </div>

              <text x = {180} y = {760}>{this.state.sliderLabelLeft}</text>

                  <input type="range" min={0} max={(this.state.rect1Arr.length)-1} defaultValue={20}
                  className="hist-slider" onChange={this.onChange1}
                  name="sliderPos" ref={this.sliderRef} list = "tickmarks"
                  style={{ width:300}}/>
                      <text x = {600} y = {760}>{this.state.sliderLabelRight}</text>
          {
            !this.state.submitted && 
            <div>
                <input type="submit" className="extraPadding" value="I Confirm My Answer"
              onClick={this.onSubmit}/> <br/>
                <p style={{ color: "grey", width: "40%", margin: "auto" }}>
                 Reminder: Once you click "I Confirm My Answer", your response to this question 
                will be recorded, and you won't be able to change your answer. 
                </p> <br/>
                <input type="submit" className="btn" value="I Prefer Not to Answer"
                onClick={this.noAnswer}/>
                
          </div>
          
             }
            </div>
      )
  }

}







// Listing required functions / data
Tradeoff.propTypes = {
    getExpt: PropTypes.func.isRequired,
    expt: PropTypes.object.isRequired,
    storeAnswer: PropTypes.func.isRequired
  }

// mapping Redux state to props that we can use in our component
// expt contains all info from a given experiment 
const mapStateToProps = state => ({
   expt: state.expt
 })

export default connect(
   mapStateToProps,
   { getExpt, storeAnswer }
 )(Tradeoff); 

