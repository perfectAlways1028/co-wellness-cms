import React, { Component } from 'react';
import ColorItem from '../ColorItem'
class ColorSelector extends Component {

    constructor(props) {
      super(props);
  
    }
    onSelectItem = (item) => {
      if(this.props.onSelectItem) {
        this.props.onSelectItem(item)
      }
    }
    render () {
        const { data, selectedItemID, containerStyle } = this.props
        return <div style={{alignSelf: 'stretch', ...containerStyle}}>
          {
            data.map((item, index) => {
              return <ColorItem key={'color-item-'+index} item={item} isSelected={item.id == selectedItemID} onClick={()=> {this.onSelectItem(item)}}/>
            })
          }
        </div>

    }
}

export default ColorSelector