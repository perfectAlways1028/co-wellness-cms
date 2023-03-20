import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./style.scss"

class CBreadcrumbs extends Component {

    render () {
        const data = this.props.data || []
        return <div className="cw-breadcrumbs">
            {
                data.map((item, index) => {
                    if(index == 0) {
                        return <Link key={'breadcrumb'+index} className="title" to={item.to}>{item.title}</Link> 
                    } else {
                        return <div key={'breadcrumb'+index} className="item" style={{flexDirection: 'row', alignItems: 'center'}}>
                            <div className="splitter">{' / '}</div>
                            <Link className={index == data.length - 1 ? "lastTitle" : "title"} to={item.to}>{item.title}</Link>
                        </div>
                    }
                   
                })
            }
        </div>
    }
}

CBreadcrumbs.propTypes = {
    data: PropTypes.array
};
  

export default CBreadcrumbs