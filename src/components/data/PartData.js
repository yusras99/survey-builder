import React, { Component } from "react";
import { Link } from "react-router-dom";

class PartData extends Component {
    // an action to fetch userData from APi for componentWillMount

    render () {
        console.log(this.props);
        const exptName = this.props.match.params.expt;
        return (
            <div className="container">
                <br/>
                Show expt data
                <br /><br />
            </div>
        )
    }
}

export default PartData;