import React, { Component } from 'react';
import { CBreadcrumbs } from '../../../../components/atoms'
import MedicineForm from '../components/MedicineForm';
import { Strings } from '../../../../constants';

const breadcrumbs = [
    {
        to: '/main/my-wellness',
        title: Strings.txtMasterData
    },
    {
        to: '/main/my-wellness',
        title: Strings.txtMyWellness
    },
    {
        to: '/main/my-wellness/medicine-management/add',
        title: Strings.txtAddNewMedicine
    },
]

class MedicineAddPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="cw-defaultpage-container"> 
            <CBreadcrumbs data={breadcrumbs}/>
            <div className="header">
                <div className="title">{Strings.txtAddNewMedicine}</div>
            </div>
            <div className="form-content-container">
                <MedicineForm history={this.props.history} isEdit={false}/>
            </div>

        </div>
    }
}

export default MedicineAddPage