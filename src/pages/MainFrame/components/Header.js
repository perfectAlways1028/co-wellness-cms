import React, { Component } from 'react';
import { Strings, Images } from '../../../constants';
import '../style/Header.scss'
import { inject, observer } from "mobx-react";
import { CBadedIcon } from '../../../components/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { getRole, clearStorage } from '@helpers/storageHelper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

class Header extends Component {
    constructor(props) {
        super(props);
        const role = getRole();

        this.state = {
            isSuperAdmin:  role == 'superadmin',
            open: false
        };
    }
    toggleMenu = (event) => {
        this.setState({open: true})
        this.setState({anchorEl: event.currentTarget});

    }

    logout = () => {
        this.handleClose()
        clearStorage();
        this.props.authStore.logout();
        this.props.history.replace('/')
    }
    handleClose = () => {
        this.setState({open: false})
    };
    getProfileComponent = (name, onClick) => {
        return <div>
            <a className="profile" onClick={(event)=>{this.toggleMenu(event)}}>
                <div className="name">{name}</div>
                <div className="arrowIcon">
                    <FontAwesomeIcon icon={faAngleDown} color="gray" />
                </div>
            </a>

            <Menu
                id="fade-menu"
                anchorEl={this.state.anchorEl}
                style={{marginTop:'36px'}}
                keepMounted
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={this.logout}>{Strings.txtLogout}</MenuItem>
            </Menu>
        </div>
    }

    render () {
        return <div className="cw-header">
            <div className={'logo'}>
                <img src={Images.logo}/>
            </div>
            <div className="header-panel">
                {/*<CBadedIcon containerStyle={{marginRight: '24px'}} icon={Images.notification}/>*/}
                {this.getProfileComponent(this.state.isSuperAdmin ? Strings.txtSuperAdmin: Strings.txtPayorAdmin, ()=>{})}
            </div>

        </div>
    }
}
export default inject('authStore')(observer(Header));
