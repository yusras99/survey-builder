import React, { Component } from 'react';
import './NormalCurve.css';

class NormalCurve extends Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef();
        this.rectRef = React.createRef();
        this.svgRef = React.createRef();
        this.areaRef = React.createRef();

        this.dotReturn = this.dotReturn.bind(this);
        this.curveArea = this.curveArea.bind(this);
        this.triMouseDown = this.triMouseDown.bind(this);
        this.triDrag = this.triDrag.bind(this);
        this.triUp = this.triUp.bind(this);
        this.curveArea = this.curveArea.bind(this);

        this.state = { 
            x: 0, y: 0, isDown: false,
            rectX: 12.5,
            down: false,
            svgWidth : 500,
            svgX : 6,
            len1: this.props.data["len1"],
            colValHeiS : this.props.data["colValHeiS"],
            len2: this.props.data["len2"],
            colValHeiS2 : this.props.data["colValHeiS2"],
            distancing : 7,
            distancing1 : (this.props.data["len2"] + 1) * 7,
            distancing2: (this.props.data["len1"] + this.props.data["len2"] + 4) * 7,
            triCent: Math.round((0.5 * this.props.data["len2"]) * 7) + 7,
            mousePointerRange: 0,
            triDown: false,
            col11: this.props.data["len2"] + 1,
            col12: this.props.data["len1"] + this.props.data["len2"],
            col21: 17,
            col22: 28,
            overlapVals : this.props.data["overlapVals"]
        };
    }

    dotReturn(xPos, yPos) {
        const xPosOrig = xPos;

        if (xPos > 7) {
            xPos = 15 - xPos;
        }

        const CX = this.state.distancing1 + this.state.distancing * xPosOrig + 10;
        const CY = 140 - this.state.distancing * yPos + 10;

        
        // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
        var hard;

        if (CX < this.state.rectX) {
            hard = <circle className="icon" stroke="#039" fill="#039" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
        }
        else {
            hard = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
        }

        return hard;
    }

    dotReturn2(xPos, yPos) {
        const xPosOrig = xPos;

        if (xPos > 7) {
            xPos = 15 - xPos;
        }

        const CX = this.state.distancing2 + this.state.distancing * xPosOrig + 10;
        const CY = 140 - this.state.distancing * yPos + 10;

        
        // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
        var hard;

        if (CX < this.state.rectX) {
            hard = <circle className="icon" stroke="#039" fill="#039" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
        }
        else {
            hard = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r="2"></circle>;
        }

        return hard;
    }

    triMouseDown(e) {
        if (e.type === "mousedown") {
            // console.log("MOUSEDOWN");
            e.preventDefault();
            var svgPre = this.svgRef.current;
            // Set mousePointerRange so that we know the distance
            // from the mouse tip to the x-value of the triangle
            // tip
            var ptPre = svgPre.createSVGPoint();
            ptPre.x = e.clientX;
            var svgPPre = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
            this.setState(prevState => ({ 
                // rectX : svgP.x,
                triDown : true,
                mousePointerRange: prevState.triCent + this.state.distancing2 - svgPPre.x
            }));
            // console.log(this.state);
        }
    }

    triDrag(e) {
        // Set mousePointerRange so that we know the distance
        // from the mouse tip to the x-value of the triangle
        // tip
        var svgPre = this.svgRef.current;
        var ptPre = svgPre.createSVGPoint();
        ptPre.x = e.clientX;
        var svgPPree = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
        this.setState({ x: e.screenX, y: e.screenY, svgX : svgPPree.x });
        if (this.state.triDown) {
            // console.log("DRAG CONT'D");
            var svg = this.svgRef.current;
            var pt = svg.createSVGPoint();
            pt.x = e.clientX;
            var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            e.preventDefault();
            var x = svgP.x - this.state.triCent + this.state.mousePointerRange;
            // if (x < 6) {
            //     this.setState({ rectX : 6, col : 0 })
            // }
            // else if (x > 250) {
            //     // this.setState({ rectX : this.state.svgWidth - this.state.cursorWidth})
            //     this.setState({ rectX : 250 - 187, col : 15});
            // }
            // else {
            //     var colValTemp = Math.round((svgP.x - 6) / 7);
            //     var newX = this.state.distancing * colValTemp + 6;
            //     this.setState({ rectX : newX, col : colValTemp });
            // }
            var col = Math.round((x - 6) / 7);
            if (col < 0) {
                this.setState({ distancing2 : 0, col21: 0, col22: this.state.len2 - 1 });
            }
            else if (col > 55) {
                this.setState({ distancing2 : this.state.distancing * 55, col21: 58, col22: 69 })
            }
            else {
                this.setState({ distancing2 : this.state.distancing * col, col21: col, col22: col + this.state.len2 - 1 });
            }
            this.curveArea(col);
            // this.setState({ distancing2 : x })
        }
    }

    triUp(e) {
        // console.log("UP");
        if (this.state.triDown) {
            this.setState({ triDown : false});
        }
    }

    curveArea(col) {
        if (this.state.col11 > this.state.col22 || this.state.col12 < this.state.col21) {
            this.areaRef.current.innerHTML = 0;
        }
        else {
            // console.log(this.state.col22, this.state.col11, Math.abs(this.state.col22 - this.state.col11));
            this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(this.state.col22 - this.state.col11)];
        }
    }

    render() {
        return(
            <div
            onMouseMove={e => this.triDrag(e)}
            onMouseUp={e => this.triUp(e)}>
                {/* <table>
                    <tbody>
                        {[...Array(20).keys()].map(
                            (row) =>
                                <tr>
                                    {[...Array(16).keys()].map(
                                        (col) => this.dotReturn(col, row)
                                    )}
                                </tr>
                        )}
                    </tbody>
                </table> */}
                <svg width={this.state.svgWidth} height="500" ref={this.svgRef}>
                    {[...Array(this.state.len1).keys()].map(
                        (col) =>
                        [...Array(this.state.colValHeiS[col]).keys()].map(
                            (row) => this.dotReturn(col, row)
                        )
                    )}
                    {[...Array(this.state.len2).keys()].map(
                        (col) =>
                        [...Array(this.state.colValHeiS2[col]).keys()].map(
                            (row) => this.dotReturn2(col, row)
                        )
                    )}
                    {/* <rect width={this.state.cursorWidth} fill="#000" x={this.state.rectX} y="5" height="150"
                    onMouseDown={e => this.dragMouseDown(e)}
                    
                    // onMouseMove={e => this.elementDrag(e)}
                    ref={this.rectRef}
                    ></rect> */}
                    <polygon
                    points={
                        [
                            [this.state.triCent + this.state.distancing2 - 15, 175],
                            [this.state.triCent + this.state.distancing2 + 15, 175],
                            [this.state.triCent + this.state.distancing2, 160]
                        ]
                    }
                    onMouseDown={e => this.triMouseDown(e)}
                    />
                    Sorry, please use a different browser.
                </svg>
                {/* <h1>Area Under Curve: {this.state.colVals[this.state.col]}</h1> */}
                {/* <h1>Mouse coordinates: { this.state.x } { this.state.y } {this.state.svgX} {Math.round((this.state.svgX - 6) / 7)} | Triangle Tip: {this.state.triCent + this.state.distancing2} | Tip-Mouse Distance: {this.state.mousePointerRange}</h1> */}
                <h1>Area Under Curve: <span ref={this.areaRef}></span></h1>
                {/* <input className="slider" type="range" min="1" max="15" defaultValue="8" className="slider" name="myRange" ref={this.sliderRef} /> */}
            </div>
        )
    }
}

export default NormalCurve;