import React, { Component } from 'react';
import { CBreadcrumbs, CButton } from '../../../components/atoms'

import { Strings } from '../../../constants';

import PointHistoryForm from '../components/PointHistoryForm';

class PointHistoryDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/point-history-management',
                title: Strings.txtPointHistory
            },
            {
                to: `/main/point-history-management/detail/${id}`,
                title: Strings.txtPointHistoryDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params;

        return <div className="cw-defaultpage-container">
            <CBreadcrumbs data={this.getBreadCrumbs(id)} />
            <div className="header">
                <div className="title">{Strings.txtPointHistoryDetail}</div>
                <div className="buttons">
                </div>
            </div>
            <div className="form-content-container">
                <PointHistoryForm history={this.props.history} isEdit={true} pointHistoryID={id} />
            </div>

        </div>
    }
}

export default PointHistoryDetailPage