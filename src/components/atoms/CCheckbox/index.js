import React, { Component } from 'react';
import Checkbox from 'rc-checkbox'

import "./style.scss"

class CCheckbox extends Component {

    render () {
        const props = this.props;
        return <Checkbox
                {...props}
            />
       
    }
}

export default CCheckbox