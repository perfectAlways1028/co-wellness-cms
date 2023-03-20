import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.scss"
import { CMenuItem, CMenuSectionItem } from '../../atoms'

class CMSideMenu extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          selectedID: 0,
          data: []
        };
    }
    onItemClick = (item, id) => {
       if(this.props.onItemClick) this.props.onItemClick(item, id);
       this.setState({selectedID: id})
    }
    generateMenuItems = (data) => {

    }
    findItemByID = (id, items) => {
        const data = items || this.props.data || [];
        const foundItem = data.find(element => element.id == id);
        return foundItem;
    }
    render () {
        const props = this.props;
        const data = props.data || [];
        return <div className="cw-sidemenu-container">
            <div className="header">
                <div className="title">{this.props.title || "MENU"}</div>
            </div>
            {
                data.map((item) => {
                 if(item.isGroup) {
                    return <CMenuSectionItem 
                        key={'menu-section'+item.id}
                        itemID={item.id} 
                        iconOn={item.iconOn} 
                        iconOff={item.iconOff} 
                        label={item.label}
                        selectedID={this.state.selectedID}
                        children={item.children}
                        onItemClick={(itemID)=>{ this.onItemClick(this.findItemByID(itemID, item.children), itemID)}} />
                 }
                 return <CMenuItem 
                            key={'menu-item'+item.id}
                            itemID={item.id} 
                            iconOn={item.iconOn} 
                            iconOff={item.iconOff} 
                            label={item.label} 
                            isSelected={this.state.selectedID == item.id}
                            onClick={(itemID)=>{ this.onItemClick(this.findItemByID(itemID), itemID)}} />
                })                    
            }
        </div>
    }
}

CMSideMenu.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};
  

export default CMSideMenu