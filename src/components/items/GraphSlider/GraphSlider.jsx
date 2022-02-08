import React, { Component } from 'react';
import "./GraphSlider.css";

class GraphSlider extends Component {
    constructor(props) {
        super(props);

        this.createSlider = this.createSlider.bind(this);
        this.svgRef = React.createRef();
        this.x1Ref = React.createRef();
        this.x2Ref = React.createRef();
        this.y1Ref = React.createRef();
        this.y2Ref = React.createRef();
        this.titleRef = React.createRef();
        this.createLine = this.createLine.bind(this);
        this.controlColor = this.controlColor.bind(this);
        this.controlLineName = this.controlLineName.bind(this);
        const Output = this.props.data;
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeX1 = this.onChangeX1.bind(this);
        this.onChangex2 = this.onChangex2.bind(this);
        this.onChangey1 = this.onChangey1.bind(this);
        this.onChangey2 = this.onChangey2.bind(this);
        this.changeJSON = this.changeJSON.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            minLoc: 50,
            svgWidth: 400,
            svgHeight: 400,
            graphWidth: 300,
            graphHeight: 300,
            tickNum: 4,
            lines: Object.keys(Output['pointsData']).length,
            slideDist: 150,
            ceilDist: 300,
            dragging: false,
            data: Output.pointsData,
            jsonData: {},
            x1: 0,
            x2: 300,
            y1: 0,
            y2: 300,
            title: Output.title,
        }
        // console.log(Output);
    }
    handleChange(key, value, count) {
        this.props.handleChange(key, value, count);
    }
    changeJSON(key, value, data) {
        // var data = this.state.jsonData;
        data[key] = value;
        console.log(this.state.data);
        this.handleChange('FileContent',this.state.data,0);
      }
    createSlider() {
        return (
            <polygon
                points={
                [
                    [this.state.slideDist - 15 + this.state.minLoc, this.state.ceilDist + 35 + this.state.minLoc],
                    [this.state.slideDist + 15 + this.state.minLoc, this.state.ceilDist + 35 + this.state.minLoc],
                    [this.state.slideDist + this.state.minLoc, this.state.ceilDist + 20 + this.state.minLoc]
                ]
                }
                onMouseDown={e => {
                    e.preventDefault();
                    this.setState({dragging: true})
                }}
            />
        )
    }

    createLine() {
        return (
            <rect
                x={this.state.slideDist + this.state.minLoc}
                y={this.state.ceilDist - 250}
                width="2"
                height="300"
                fill="black"
            />
        )
    }

    controlColor(lineNum, e) {
        const newColorObj = this.state.data;
        newColorObj[lineNum.toString()]["color"] = e.target.value;
        this.setState({ data: newColorObj });
        console.log(e.target.value);
        this.handleChange('pointsData', newColorObj, 0);
    }

    controlLineName(e, lineNum) {
        const pointsData = this.state.data;
        pointsData[lineNum.toString()]["name"] = e.target.value;
        this.setState({data: pointsData});
        this.handleChange('pointsData', pointsData, 0);

    }
    onChangeTitle(e){
        const pointsData = this.state.jsonData;
        console.log(pointsData);
        this.setState({title:this.titleRef.current.value});
        this.changeJSON(this.state.title, this.titleRef.current.value, pointsData);

    }
    onChangeX1(e){
        const pointsData = this.state.data;
        this.setState({x1:this.x1Ref.current.value})
        this.changeJSON(this.state.x1, this.x1Ref.current.value, pointsData);
        console.log(pointsData);
    }
    onChangex2(e){
        const pointsData = this.state.data;
        this.setState({x2:this.x2Ref.current.value})
        this.changeJSON(this.state.x2, this.x2Ref.current.value, pointsData);
    }
    onChangey1(e){
        const pointsData = this.state.data;
        this.setState({y1:this.y1Ref.current.value})
        this.changeJSON(this.state.y1, this.y1Ref.current.value, pointsData);
    }
    onChangey2(e){
        const pointsData = this.state.data;
        this.setState({y2:this.y2Ref.current.value})
        this.changeJSON(this.state.y2, this.y2Ref.current.value, pointsData);
        console.log(pointsData)
    }
    handleChange(key, value, count) {
        this.props.handleChange(key, value, count);
    }
    render() {
        console.log(this.state.lines);
        console.log(this.state.data);
        return (
            <div className="carrier">
                <div>
                    <h1 ref={this.titleRef}>{this.state.title}</h1>
                </div>
                <svg 
                width={this.state.svgWidth} 
                height={this.state.svgHeight} 
                ref={this.svgRef}
                // Handles Dragging
                onMouseMove={e => {
                    e.preventDefault();
                    if (this.state.dragging) {
                        var svg = this.svgRef.current;
                        var pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                        var newX = svgP.x - this.state.minLoc;
                        if ((newX > 0) && (newX < this.state.graphWidth)) {
                            this.setState({slideDist: newX});
                        }
                    }
                }}
                // Handles mouse being raised
                onMouseUp={e => {
                    e.preventDefault();
                    this.setState({dragging: false})
                }}>
                    <rect width="2" height={this.state.graphWidth} x={this.state.minLoc} y={this.state.minLoc} fill="black"/>
                    <rect width={this.state.graphHeight} height="2" x={this.state.minLoc} y={298 + this.state.minLoc} fill="black"/>
                    {[...Array(this.state.tickNum).keys()].map(
                        (tick) =>
                        <rect
                            width="2"
                            height="5"
                            fill="black"
                            x={(this.state.graphWidth / this.state.tickNum) * (tick + 1) + this.state.minLoc} 
                            y={295 + this.state.minLoc}
                        />
                    )}
                    {[...Array(this.state.tickNum).keys()].map(
                        (tick) =>
                        <rect
                            width="5"
                            height="2"
                            fill="black"
                            x={this.state.minLoc} 
                            y={(this.state.graphHeight / this.state.tickNum) * tick + this.state.minLoc}
                        />
                    )}

                    {[...Array(this.state.lines).keys()].map(
                        (line) =>
                            [...Array(this.state.data[line.toString()].points).keys()].map(
                                (point) =>
                                    <circle 
                                    cx={this.state.data[line.toString()][point.toString()].x + this.state.minLoc}
                                    cy={this.state.data[line.toString()][point.toString()].y + this.state.minLoc}
                                    r="3"
                                    fill={this.state.data[line.toString()].color}
                                    stroke={this.state.data[line.toString()].color}
                                    />
                            )
                    )}
                    {[...Array(this.state.lines).keys()].map(
                        (line) =>
                            [...Array(this.state.data[line.toString()].points - 1).keys()].map(
                                (point) =>
                                    <line
                                    x1={this.state.data[line.toString()][point.toString()].x + this.state.minLoc}
                                    y1={this.state.data[line.toString()][point.toString()].y + this.state.minLoc}
                                    x2={this.state.data[line.toString()][(point + 1).toString()].x + this.state.minLoc}
                                    y2={this.state.data[line.toString()][(point + 1).toString()].y + this.state.minLoc}
                                    stroke-width="2"
                                    stroke={this.state.data[line.toString()].color}
                                    />
                            )
                    )}
                    {this.createSlider()}
                    {this.createLine()}
                    <text x={this.state.minLoc - 5}
                        y={this.state.ceilDist + this.state.minLoc + 50}>{this.state.x1}</text>
                    <text x={300 + this.state.minLoc - 5}
                        y={this.state.ceilDist + this.state.minLoc + 50}>{this.state.x2}</text>
                    <text x={this.state.minLoc - 25}
                        y={this.state.minLoc}>{this.state.y2}</text>
                    <text x={this.state.minLoc - 25}
                        y={this.state.ceilDist + this.state.minLoc}>{this.state.y1}</text>
                </svg>
                <br />
                <div class="legend">
                    {[...Array(this.state.lines).keys()].map(
                        (line) => 
                            <div>
                                <div class="color-box" style={{ backgroundColor: this.state.data[line.toString()].color }}></div>
                                <span class="option">{this.state.data[line.toString()].name}</span>
                            </div>
                    )}
                </div>
                <br />
                <div class="box">
                    Edit title:
                    <input name = "title" id = "title" ref = {this.titleRef}></input>
                  <input onClick = {() => this.onChangeTitle()} type = "submit" value = "Submit"></input> 
                </div>
                <div class="box">
                    First x-coordinate: 
                    <input name = "x1" id = "x1" ref = {this.x1Ref}></input>
                  <input onClick = {() => this.onChangeX1()} type = "submit" value = "Submit"></input> 
                </div>
                <div class="box">
                    Second x-coordinate: 
                    <input name = "x2" id = "x2" ref = {this.x2Ref}></input>
                  <input onClick = {() => this.onChangeX2()} type = "submit" value = "Submit"></input> 
                </div>
                <div class="box">
                    First y-coordinate: 
                    <input name = "y1" id = "y1" ref = {this.y1Ref}></input>
                  <input onClick = {() => this.onChangey1()} type = "submit" value = "Submit"></input> 
                </div>
                <div class="box">
                    Second y-coordinate: 
                    <input name = "y2" id = "y2" ref = {this.y2Ref}></input>
                  <input onClick = {() => this.onChangey2()} type = "submit" value = "Submit"></input> 
                </div>
                {[...Array(this.state.lines).keys()].map(
                    (line) =>
                    <div class="box">
                        <span>Select color for line {line}</span>
                        <select 
                            value={this.state.data[line.toString()].color} 
                            onChange= {e => this.controlColor(line, e)} 
                            class="option"
                        >
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="teal">Teal</option>
                        </select>
                    </div>
                )}
                {[...Array(this.state.lines).keys()].map(
                        (line) => 
                            <div class="box">
                                Name for line {line}: 
                                <input type="text" onChange={e => this.controlLineName(e, line)}
                                class="option"/>
                            </div>
                    )}
            </div>
        )
    }
}

export default GraphSlider;
