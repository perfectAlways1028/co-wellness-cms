import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CCheckbox} from '../../atoms';

import "./style.scss"

class CMCheckBoxGroup extends Component {
    constructor(props) {
        super(props);
        let selectedItems = []
        if(props.selectedItemIDs && props.data) {
          props.selectedItemIDs.forEach(id => {
            props.data.forEach(item => {
              if(item.id == id)
              selectedItems.push(item);
            })
          })
        }

        this.state = {
            selectedItems
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.selectedItemIDs!==prevState.selectedItemIDs){
            let selectedItems = []
            if(nextProps.selectedItemIDs && nextProps.data) {
              nextProps.selectedItemIDs.forEach(id => {
                nextProps.data.forEach(item => {
                  if(item.id == id)
                  selectedItems.push(item);
                })
              })
            }
          return { selectedItems: selectedItems};
       }
       else return null;
     }

    checkSelected = (touchedItem) => {
        let selectedItems = this.state.selectedItems;
        return selectedItems.find((item)=>{
            return item.id == touchedItem.id
        })
    }

    onItemSelect = (touchedItem) => {
        if(!this.checkSelected(touchedItem)) {
            let items = this.state.selectedItems;
            items.push(touchedItem);
            this.setState({selectedItems: items})
            if(this.props.onItemSelect) {
                this.props.onItemSelect(items)
            }
        }else {
            let newItems = [];
            this.state.selectedItems.map(item =>{
                if(item.id != touchedItem.id)
                newItems.push(item);
            })
            this.setState({selectedItems: newItems})
            if(this.props.onItemSelect) {
                this.props.onItemSelect(newItems)
            }
        }
    }
    renderItem = ( itemData, index) => {
        return  <label key={'checkbox'+index} className={'cw-checklabel'} style={{marginBottom: '16px'}}>
        <CCheckbox 
            checked={this.checkSelected(itemData) != null}  
            onChange={() => {if(!this.props.disable) this.onItemSelect(itemData)}}/>
        {itemData.name}
  
        </label>
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

CMCheckBoxGroup.propTypes = {
    lineCount: PropTypes.number,
    countPerLine: PropTypes.number,
    direction: PropTypes.string,
    data: PropTypes.array,
    onItemSelect: PropTypes.func,
    selectedItemsID: PropTypes.array,
    disable: PropTypes.bool
};
  

export default CMCheckBoxGroup