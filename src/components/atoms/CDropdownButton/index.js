import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import "./style.scss"

class CDropdownButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    onClick = () => {
        if(!this.props.isLoading && !this.props.disabled) {
            if(this.props.onClick) this.props.onClick(!this.state.isShow); 
            this.setState({isShow: !this.state.isShow})
        }
    
    }
    onItemClick = (item) => {
        if(this.props.disabled)
        return;
        if(this.props.onItemClick) {
            this.props.onItemClick(item);
        }
        this.setState({isShow: false})
    }
    getClassByType=(type, disabled) => {
        if(disabled)
            return 'cw-dropdown-button-container-disable'
        if(type == 'cancel') 
            return 'cw-dropdown-button-container-cancel'
        if(type == 'secondary')
            return 'cw-dropdown-button-container-secondary'
        return 'cw-dropdown-button-container'
    }

    renderOptions = () => {
        const { data } = this.props;
        return  <div class="cw-dropdown-content">
            {
                data.map(item => {
                return <a onClick={()=>{this.onItemClick(item)}}>{item.name}</a>
                })
            }
        </div>
        
    }
    render () {
        const props = this.props;
        return <div class="cw-dropdown">
            <button onClick={()=>{this.onClick()}} type="button"
                    className={this.getClassByType(props.type, props.disabled)} style={props.containerStyle}>
                {this.props.isLoading ? <div><i class="fa fa-circle-o-notch fa-spin"></i> Loading</div> : props.children}
                {!this.props.isLoading && <i class={this.state.isShow ? "fa fa-angle-up" : "fa fa-angle-down"} style={{fontSize: 12, marginLeft: '4px', color: 'white'}}/>}
            </button>
            {this.state.isShow && this.renderOptions()}
        </div>
    }
}

CDropdownButton.propTypes = {
    onClick: PropTypes.func,
    onItemClick: PropTypes.func,
    isLoading: PropTypes.func,
    data: PropTypes.array
};
  

export default CDropdownButton