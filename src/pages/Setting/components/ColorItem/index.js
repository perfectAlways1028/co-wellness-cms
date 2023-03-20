import React, { Component } from 'react';
import './style.scss'
class ColorItem extends Component {

    constructor(props) {
      super(props);

    }
    onClick= () => {
      if(this.props.onClick){
        this.props.onClick();
      }
    }
    render () {
        const { item, isSelected } = this.props;
        return <div style={{display: 'flex', alignSelf: 'stretch', 
                            flexDirection: 'row', alignItems: 'center', 
                            marginLeft: '30px', marginBottom:'16px' }}
                    onClick={()=>{this.onClick()}}>
            <div style={{ width:'24px', height: '24px', 
                          marginRight:'16px', display:'flex', 
                          justifyContent:'center', alignItems:'center'}}>
              {
                isSelected ?
                <div className="raidoColorBox" >
                    <div className="colorDot"/>
                </div>
                :
                <div className="nonSelectRadioColorBox" />
     
              }
        
            </div>
            <div className="colorBox" style={{borderColor: item.borderColor, background: `linear-gradient(90deg, ${item.startColor} 0%, ${item.endColor} 100%, #FFFFFF 100%)`}}/>
        </div>

    }
}

export default ColorItem