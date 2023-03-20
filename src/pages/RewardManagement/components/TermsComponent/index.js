import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CImageButton, CTextInput } from '../../../../components/atoms'
import { Strings, Constants, Images } from '../../../../constants';

class TermsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data!==this.props.data){
          this.setState({data: this.props.data});
        }
    }
    getTitle = (index) => {
        return `${Strings.txtTermsAndConditions} ${index+1}` 
    }
    onAddNew = () => {
        let data = this.state.data;
        data.push({ content: ''});
        this.setState({data: data});
        if(this.props.onChangeItem) {
            this.props.onChangeItem(data);
        }
    }

    onChangeItem = (index, text) => {
        let data = this.state.data;
        data[index].content= text;
        this.setState({data: data});
        if(this.props.onChangeItem) {
            this.props.onChangeItem(data);
        }
    }
    onRemoveItem = (index) => {
        let data= [];
        this.state.data.map((item, i) => {
            if(i != index) {
                data.push(item);
            }
        })
        this.setState({data: data});
        if(this.props.onChangeItem) {
            this.props.onChangeItem(data);
        }
    }
    renderItem = (item, index) => {    
        return <div className="cw-row" key={'item'+index}>
           <CTextInput containerStyle={{flex: 1}} 
                            label={this.getTitle(index)} 
                            value={item.content}
                            onChangeValue={(value) => {this.onChangeItem(index, value)}}/>
            <CImageButton src={Images.trash}
            onClick={()=>{
                this.onRemoveItem(index);
            }} 
            containerStyle={{
                            width: '48px', 
                            height: '48px', 
                            marginLeft: '8px',
                            marginTop: '8px'
                         }}/>
        </div>
    }
    render (){
        return <div className="cw-column" style={{justifyContent:'flex-start'}}>
            {
                this.state.data.map((item, index) => {
                    return this.renderItem(item, index)
                })
            }
            <a href className="cw-underline-link" onClick={()=>{this.onAddNew()}}>
                {Strings.txtAddMoreTerms}
            </a>
        </div>
    }



}

TermsComponent.propTypes = {
    data: PropTypes.array
}

export default TermsComponent