import React, { Component } from 'react';
import { IconLocationTurqoise, IconHoursTurqoise, IconEditPink} from '../Icons.js';
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";

class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sidebar">
                <div className="image-setup">
                    <div className="image-wrapper">
                        <div className="image" style={{backgroundImage:`url(${this.props.image})`}}></div>
                    </div>
                </div>
                <h4 className="title">{this.props.name}</h4>
                <div className="part">
                    <IconLocationTurqoise/>
                    <ul>
                        <li>{this.props.street}</li>
                        <li>{this.props.city}, {this.props.country}</li>
                    </ul>
                </div>
                <div className="part">
                    <IconHoursTurqoise/>
                    <ul>
                        <li><span>Monday:</span> 12 - 15, 19 - 23</li>
                        <li><span>Tuesday:</span> 12 - 15, 19 - 23</li>
                        <li><span>Wednesday:</span> 19 - 23</li>
                        <li><span>Thursday:</span> 12 - 15, 19 - 23</li>
                        <li><span>Friday:</span> 19 - 01</li>
                        <li><span>Saturday:</span> 19 - 02</li>
                        <li><span>Sunday:</span> 12 - 15, 19 - 00</li>
                    </ul>
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_RESTAURANT_INFORMATION}><IconEditPink/> Edit informations</FilterLink>
                </div>
            </div>
        );
    }
}

export default Sidebar;