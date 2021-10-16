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
    }

    establishStateData(data){
        return{
            stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            stroke3: "#ffc40c",
            rect1Height : 100,
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
            rect1Arr: data["acc_0"],
            rect2Arr: data["npv_0"],
            rect3Arr: data["acc_1"],
            rect4Arr: data["npv_1"],
            rect5Arr: data["acc_total"],
            rect6Arr: data["npv_total"],
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
            jsonData: data

        }
    }
    
    changeJSON(key, value, data) {
      // var data = this.state.jsonData;
      data[key] = value;
    }

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
    changeGraphColNumber(){
      const newColor = this.graphColRef.current.value;
      if (newColor === "1 and 1"){
          this.setState({fourGraphOne: true});
          this.setState({threeGraphOne: true});
      }
      if (newColor === "1 and 2"){
          this.setState({fourGraphOne: true});
          this.setState({threeGraphOne: false});
      }
      if (newColor === "2 and 1"){
          this.setState({fourGraphOne: false});
          this.setState({threeGraphOne: true});
      }
      if (newColor === "2 and 2"){
          this.setState({fourGraphOne: false});
          this.setState({threeGraphOne: false});
      }
  }
  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }
   changeJSON(key, value, data) {
      // var data = this.state.jsonData;
      data[key] = value;
      this.handleChange("FileContent", data, this.props.count);
    }
    onUpdateShapes(){
      this.setState({questionText : this.arg5ref.current.value})
      this.setState({boldQuestionText : this.arg12ref.current.value})
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
      this.changeJSON("questionText", this.state.questionText, this.state.jsonData)
      this.changeJSON("boldQuestionText", this.state.boldQuestionText, this.state.jsonData)
      this.changeJSON("graphOneLabel", this.state.graphOneLabel, this.state.jsonData)
      this.changeJSON("graphTwoLabel", this.state.graphTwoLabel, this.state.jsonData)
      this.changeJSON("sliderLabelLeft", this.state.sliderLabelLeft, this.state.jsonData)
      this.changeJSON("sliderLabelRight", this.state.sliderLabelRight, this.state.jsonData)
      this.changeJSON("graphThreeLabel", this.state.questionText, this.state.jsonData)
      this.changeJSON("graphFourLabel", this.state.questionText, this.state.jsonData)
      this.changeJSON("legend2", this.state.questionText, this.state.jsonData)
      this.changeJSON("legend1", this.state.questionText, this.state.jsonData)
      this.changeJSON("legend3", this.state.questionText, this.state.jsonData)
      this.changeJSON("legend4", this.state.questionText, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)


    }
    onChange1(e){
         console.log(this.state.rect1Arr.length);
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


    onChange10(e){
      this.setState({line1Height:e})
      this.changeJSON("line1height", this.state.line1Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)

    }
    onChange2(e){
      this.setState({line2Height:e})
      this.changeJSON("line2height", this.state.line2Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)


    }
    onChange3(e){
      this.setState({line3Height:e})
      this.changeJSON("line3height", this.state.line3Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)


    }
    onChange4(e){
      this.setState({line4Height:e})
      this.changeJSON("line4height", this.state.line4Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)


    }
    onChange5(e){
      this.setState({line5Height:e})
      this.changeJSON("line5height", this.state.line5Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)


    }
    onChange6(e){
      this.setState({line6Height:e})
      this.changeJSON("line6height", this.state.line6Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)

    }
    onChange7(e){
      this.setState({line7Height:e})
      this.changeJSON("line7height", this.state.line7Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)

    }
    onChange8(e){
      this.setState({line8Height:e})
      this.changeJSON("line8height", this.state.line8Height, this.state.jsonData)
      this.handleChange('FileContent', this.state.jsonData, 0)

    }

    changeStroke1() {
      const newColor = this.stroke1Ref.current.value;
      if (newColor === "RBY"){
        this.setState({stroke1:"#FF0000"});
        this.setState({stroke2:"#0000FF"});
        this.setState({stroke3:"#ffc40c"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "RYB"){      
        this.setState({stroke1: "#FF0000"});
        this.setState({stroke2:"#ffc40c"});
        this.setState({stroke3:"#0000FF"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)
      }
      if (newColor === "BYR"){
        this.setState({stroke1:"#0000FF"});
        this.setState({stroke2:"#ffc40c"});
        this.setState({stroke3:"#FF0000"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }      
      if (newColor === "BRY"){
        this.setState({stroke1:"#0000FF"});
        this.setState({stroke2:"#FF0000"});
        this.setState({stroke3:"#ffc40c"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "YRB"){
        this.setState({stroke1:"#ffc40c"});
        this.setState({stroke2:"#FF0000"});
        this.setState({stroke3:"0000FF"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }
      if (newColor === "YBR"){
        this.setState({stroke1:"#ffc40c"});
        this.setState({stroke2:"#0000FF"});
        this.setState({stroke3:"#FF0000"});
        this.changeJSON("stroke1", this.state.stroke1, this.state.jsonData);
        this.changeJSON("stroke2", this.state.stroke2, this.state.jsonData);
        this.changeJSON("stroke3", this.state.stroke3, this.state.jsonData)

      }

      this.handleChange('FileContent', this.state.jsonData, 0)

    }
    changeGraphNumber(){
      const newGraph = this.threeGraphRef.current.value;
      if (newGraph === "True"){
        this.setState({threeGraphs: true});
        this.changeJSON("threeGraphs", this.state.threeGraphs, this.state.jsonData);
        this.handleChange('FileContent', this.state.jsonData, 0)

      }
      else{
        this.setState({threeGraphs: false});
        this.changeJSON("threeGraphs", this.state.threeGraphs, this.state.jsonData);
        this.handleChange('FileContent', this.state.jsonData, 0)

      }
  }

    rectReturn1(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect1Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn2(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect2Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn3(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect3Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn4(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect4Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn5(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn6(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn7(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect7Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn8(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect8Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn9(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke3} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      rectReturn10(xPos, yPos){
        var hard = 
        <rect
        x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke3} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
        return hard;
      }
      line1(xPos1,xPos2,yPos1,yPos2){
        var hard = 
        <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#000000"></line>;
        return hard;
      }
      line2(xPos1,xPos2,yPos1,yPos2){
        var hard = 
        <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"></line>;
        return hard;
      }
      textReturn1(xPos, yPos, tedxt){
        var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
        return hard;
      }
    render(){
      const threeGraphs = this.state.threeGraphs;
        return (
            <div>
                <svg width = {1400} height = {1000} style={{}} class = "b"> 
                    {this.rectReturn1(500,450)}
                    {this.rectReturn2(580,450)}
                    {this.rectReturn3(900,450)}
                    {this.rectReturn4(980,450)}
                    {this.line1(173,187,650,650)}
                    {this.line1(173,187,488,488)}
                    {this.line1(173,187,528,528)}
                    {this.line1(173,187,568,568)}
                    {this.line1(173,187,608,608)}

                    {this.line1(176,184,633,633)}
                    {this.line1(176,184,468,468)}
                    {this.line1(176,184,508,508)}
                    {this.line1(176,184,548,548)}
                    {this.line1(176,184,588,588)}
                    {this.line1(173,187,488,488)}
                    {this.line1(173,187,528,528)}
                    {this.line1(173,187,568,568)}
                    {this.line1(173,187,608,608)}

                    {this.line1(176,184,633,633)}
                    {this.line1(176,184,468,468)}
                    {this.line1(176,184,508,508)}
                    {this.line1(176,184,548,548)}
                    {this.line1(176,184,588,588)}
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

                    {
                    threeGraphs
                    ? this.line1(330,330,160,360)


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


                    : this.line1(573,587,360,360)
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
                    ? this.line1(330,330,160,360)


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
                    ? this.line1(323,337,360,360)


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
                    ? this.line1(330,330,160,360)


                    : this.line1(173,187,278,278)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(173,187,318,318)
                  }

                  {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(176,184,218,218)
                  }











                  {
                    threeGraphs
                    ? this.line1(330,330,255,258)


                    : this.line1(176,184,298,298)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(176,184,337,337)
                  }
                  {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(173,187,360,360)
                  }


                  {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(576,584,218,218)
                  }
                                    {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(576,584,178,178)

                  }
                                    {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(176,184,178,178)
                  }

                    {this.line1(573,587,650,650)}
                    {this.line1(573,587,488,488)}
                    {this.line1(573,587,528,528)}
                    {this.line1(573,587,568,568)}
                    {this.line1(573,587,608,608)}

                    {this.line1(576,584,633,633)}
                    {this.line1(576,584,468,468)}
                    {this.line1(576,584,508,508)}
                    {this.line1(576,584,548,548)}
                    {this.line1(576,584,588,588)}


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
                    {this.line1(180,180,450,650)}
                    {this.line1(180,360,450,450)}
                    {this.line1(580,580,450,650)}
                    {this.line1(580,760,450,450)}
                    {
                    threeGraphs
                    ? this.line1(330,330,160,360)


                    : this.line1(180,180,160,360)

                  }
                
                  {
                    threeGraphs
                    ? this.line1(330,510,160,160)

                    : this.line1(180,390,160,160)
                  }
                  {
                    threeGraphs
                    ? this.line1(0,0,0,0)


                    : this.line1(580,580,160,360)

                  }
                  {
                    threeGraphs
                    ? this.line1(0,0,0,0)

                    : this.line1(580 ,780,160,160)
                  }
                                    </svg>
                  <svg class = "e" width = {1400} height = {800}>
                  <text x = {200} y = {15}>{this.state.questionText}</text>
                  <text x = {200} y = {115} font-weight = "bold">{this.state.boldQuestionText}</text>
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
                  <text x = {55} y = {510}>0</text>
                  <text x = {50} y = {470}>20</text>
                  <text x = {50} y = {430}>40</text>
                  <text x = {50} y = {390}>60</text>
                  <text x = {50} y = {350}>80</text>
                  <text x = {45} y = {310}>100</text>
                  <text x = {450} y = {510}>0</text>
                  <text x = {445} y = {470}>20</text>
                  <text x = {445} y = {430}>40</text>
                  <text x = {445} y = {390}>60</text>
                  <text x = {445} y = {350}>80</text>
                  <text style = {{size:8}} x = {440} y = {310}>100</text>
                  {
                    threeGraphs
                    ? <text x = {185} y = {600}>100</text>

                    : <text x = {45} y = {600}>100</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {640}>80</text>

                    : <text x = {50} y = {640}>80</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {680}>60</text>

                    : <text x = {50} y = {680}>60</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {720}>40</text>

                    : <text x = {50} y = {720}>40</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {760}>20</text>

                    : <text x = {50} y = {760}>20</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {790}>0</text>
                    : <text x = {50} y = {800}>0</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {790}> </text>
                    : <text x = {445} y = {600}>100</text>
                  }
                   {
                    threeGraphs
                    ? <text x = {190} y = {640}></text>

                    : <text x = {452} y = {640}>80</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {680}></text>

                    : <text x = {452} y = {680}>60</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {720}></text>

                    : <text x = {452} y = {720}>40</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {190} y = {760}></text>

                    : <text x = {452} y = {760}>20</text>
                  }
                  {
                    threeGraphs
                    ? <text x = {160} y = {790}> </text>
                    : <text x = {460} y = {800}>0</text>
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
              style={{ width:300, left:635, top:590}}/>
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
                  Enter the question text here
                  <br/>
                  <input type="text" id = "question" ref={this.arg5ref}
                    defaultValue={""}/>
                    <br></br>
                    Enter the bold question text here (displayed below the question)
                  <br/>
                  <input type="text" id = "question" ref={this.arg12ref}
                    defaultValue={""}/>
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