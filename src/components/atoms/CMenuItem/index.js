import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"

class CMenuItem extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isSelected: false
        };
    }
    onClick = () => {
        if(this.props.onClick) this.props.onClick(this.props.itemID); 
        console.log("on menu item click itemID:", this.props.itemID);
    }
    render () {
        return <a className="cw-menuitem-container" style={{ backgroundColor: this.props.isSelected ? '#3998E0' : 'transparent'} } onClick={(e)=>{this.onClick()}}>
            <img className="icon" src={ this.props.isSelected ? this.props.iconOff : this.props.iconOff} style={{marginLeft: this.props.isSubItem ? '25px': '13px'}}/>
            <div className="label" style={{color: this.props.isSelected? 'white' : '#353957'}}>{this.props.label}</div>
        </a>
    }
}

CMenuItem.propTypes = {
    itemID: PropTypes.number,
    iconOn: PropTypes.string,
    iconOff: PropTypes.string,
    label: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    isSubItem: PropTypes.bool,
};
  

export default CMenuItem