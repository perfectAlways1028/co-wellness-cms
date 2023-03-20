import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import Select, { Option, OptGroup } from 'rc-select';
import './style.scss'

import './rc-select.less'

class CSelectInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          value: props.selectedItemID,
          error: props.error || "",
          label: props.label || "Label"
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.selectedItemID!==this.props.selectedItemID){
          this.setState({value: this.props.selectedItemID});
        }
    }

    findItemByID = (id, items) => {
        const data = items || this.props.data || [];
        const foundItem = data.find(element => element.id == id);
        return foundItem;
    }

    onItemSelect = (e) => {
        this.setState({value: e})
        if(this.props.onItemSelected) {
           let item = this.findItemByID(e, this.props.data);
           console.log("item",item);
           if(item) {
            this.props.onItemSelected(item);
           }
           
        }
 
    }
    onSearch = (query) => {
        if(this.props.onSearch)
        this.props.onSearch(query)
    }
    render () {
        const props = this.props;
        const { value, error, label } = this.state;
        var data = this.props.data || [];
        return <div className={'cw-select-container'} style={props.containerStyle}>
                <div className={this.props.disable ? 'label_disabled' : 'label'}>{props.label}</div>
                <div className="field">
                    <Select defaultValue={this.props.defaultValue} 
                            value={this.state.value == null ? this.props.defaultValue: this.state.value} 
                            placeholder={this.props.placeholder || this.props.label} 
                            onChange={(e)=>{this.onItemSelect(e)}} 
                            showSearch={this.props.showSearch}
                            onSearch={(query)=>{this.onSearch(query)}}
                            style={{color: this.state.value? "#9EA0A5" : "black"}}
                            disabled={this.props.disable}>
                        {
                            data.map((item, index) => {
                                return <Option key={'option'+ index} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className={'error'}>{props.error}</div>
            </div>
    }
}

CSelectInput.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array.isRequired,
    defaultValue: PropTypes.string,
    selectedItemID: PropTypes.any,
    label: PropTypes.string,
    onItemSelected: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disable: PropTypes.bool
};


export default CSelectInput