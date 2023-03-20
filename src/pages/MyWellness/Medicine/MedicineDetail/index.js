import React, { Component } from 'react';
import { CBreadcrumbs, CTabs, CSelectInput } from '../../../../components/atoms'

import { Strings } from '../../../../constants';

import MedicineForm from '../components/MedicineForm';

class MedicineDetailPage extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
        };
    }

    getBreadCrumbs = (id) => {
        return [
            {
                to: '/main/my-wellness',
                title: Strings.txtMasterData
            },
            {
                to: '/main/my-wellness',
                title: Strings.txtMyWellness
            },
            {
                to: `/main/my-wellness/medicine-management/detail/${id}`,
                title: Strings.txtMedicineDetail
            },
        ]
    }

    onSelectTab = (index) => {

    }

    render() {

        const { id } = this.props.match.params; 
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={this.getBreadCrumbs(id)}/>
            <div className="header">
                <div className="title">{Strings.txtMedicineDetail}</div>
            </div>
            <div className="form-content-container">
                <MedicineForm  history={this.props.history} isEdit={true} medicineID={id}/>
            </div>
          
        </div>
    }
}

export default MedicineDetailPage