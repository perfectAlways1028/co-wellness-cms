import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CRadioButton} from '../../atoms';

import "./style.scss"

class CMRadioGroup extends Component {
    constructor(props) {
        super(props);
        let selectedItem = null
        if(props.selectedItemID != null && props.data) {
            props.data.forEach(item => {
                if(item.id === props.selectedItemID)
                selectedItem = item;
            })
        }
        console.log("selectedItemID", props.selectedItemID);
        console.log("dasta", props.data);
        this.state = {
            selectedItem
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.selectedItemID!==this.props.selectedItemID){
            let selectedItem = null
            this.props.data.forEach(item => {
                if(item.id === this.props.selectedItemID)
                selectedItem = item;
            })
            this.setState({selectedItem});
        }
    }

    checkSelected = (itemData) => {

        if(this.state.selectedItem) 
        return this.state.selectedItem.id == itemData.id;
        return false;

    }
    onItemSelect = (touchedItem) => {

        this.setState({selectedItem: touchedItem})
        if(this.props.onItemSelect) {
            this.props.onItemSelect(touchedItem)
        }
    }
    renderItem = ( itemData, index) => {
        return <CRadioButton
            key={'item'+index}
            disable={this.props.disable}
            checked={this.checkSelected(itemData)}  
            onChange={()=>{this.onItemSelect(itemData)}}
            containerStyle={this.props.customItemStyle? this.props.customItemStyle : {flex: 1}}
            label={itemData.name}
        />
    }
    renderLines = (data, lineCount ) => {
        let lines = [];
        for(let i=0; i< lineCount; i++) {
            lines.push(this.renderLine(data, lineCount, i))
        }
        return lines;
    }
    renderLine = (data, lineCount, index) => {


        const totalCount = data.length;
        const numPerLine = this.props.countPerLine || Math.floor(totalCount / lineCount) + 1;
        if(data.length <= numPerLine * index)
        return null;
        const direction = this.props.direction || 'col';
        const subClass = direction == 'col' ? 'cw-column' : 'cw-row';
        const startItemIndex = index * numPerLine;
        
        var endItemIndex = (index + 1) * numPerLine -1;
        if(endItemIndex > data.length -1 ) {
            endItemIndex = data.length -1;
        }
        let items = [];
        for(let j=startItemIndex; j<= endItemIndex; j++){
            items.push(this.renderItem(data[j], j))
        }
      
        return <div className={subClass} key={'line'+index} style={{flex: 1}}>
            {items}
        </div>
    }
    
    render () {
        const props = this.props;
        if(!props.data) return null;
     
        const lineCount = props.lineCount || 3;

        const direction = props.direction || 'col';
        const topClass = direction == 'col' ? 'cw-row' : 'cw-column';

        return <div className={topClass}>
            {this.renderLines(props.data, lineCount)}
        </div>
    }
}

CMRadioGroup.propTypes = {
    lineCount: PropTypes.number,
    countPerLine: PropTypes.number,
    direction: PropTypes.string,
    data: PropTypes.array,
    onItemSelect: PropTypes.func,
    selectedItemID: PropTypes.array,
    disable: PropTypes.bool
};
  

export default CMRadioGroup