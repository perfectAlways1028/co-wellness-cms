import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CMenuItem from '../CMenuItem';
import "./style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

class CMenuSectionItem extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isCollapsed: true
        }
    }
    onClick = () => {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }
    onItemClick = (id) => {
        if(this.props.onItemClick) this.props.onItemClick(id);
    }
    render () {
        let data = this.props.children;
        return <div className="cw-menusectionitem-container">
            <a className="container" onClick={(e)=>{this.onClick()}}>
                <img className="icon" src={ this.props.iconOff }/>
                <div className="label">{this.props.label}</div>
                <div className="arrow" >
                    <FontAwesomeIcon icon={this.state.isCollapsed ? faAngleUp : faAngleDown} color="#353957" />    
                </div>
            </a>
            {
                this.state.isCollapsed && 
                data.map((item) => {
                    return <CMenuItem 
                                key={'menu-sub-item'+item.id}
                                itemID={item.id} 
                                iconOn={item.iconOn} 
                                iconOff={item.iconOff} 
                                label={item.label} 
                                isSelected={item.id == this.props.selectedID}
                                isSubItem={true}
                                onClick={(itemID)=>{ this.onItemClick(itemID)}} />
                })   
            }
        </div>

    }
}

CMenuSectionItem.propTypes = {
    id: PropTypes.number,
    iconOn: PropTypes.string,
    iconOff: PropTypes.string,
    label: PropTypes.string,
    selectedID: PropTypes.number,
    children: PropTypes.array
};
  

export default CMenuSectionItem