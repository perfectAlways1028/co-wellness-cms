import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Images } from '@constants'

import "./style.scss"

class CMAccordianTable extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          selectedID: 0,
          fields: [],
          data: [],
          sortField: null,
          sortDirection: 'asc'
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data)
        this.setState({data: this.props.data})
    }

    onRowClick(rowData, rowIndex) {
        if(this.props.onRowClick) {
            this.props.onRowClick(rowData, rowIndex);
        }
    }
    onSectionClick(sectionData, rowIndex) {
        if(this.props.onSectionClick) {
            this.props.onSectionClick(sectionData, rowIndex);
        }
        let data = this.state.data;
        for(let i= 0; i<data.length; i++) {
            if(data[i].id == sectionData.id) {
                data[i].isOpened = !data[i].isOpened;
            }
        }
        this.setState({data: data})
        
    }
    onHeaderClick = (field) => {
        let sortDirection = this.state.sortDirection;
        if(field.field != this.state.sortField) {
            sortDirection = 'asc';
        } else {
           
            sortDirection = sortDirection == 'asc' ? 'desc' : 'asc';
     
        }
        this.setState({sortField: field.field, sortDirection})
        if(this.props.onSort) {
            this.props.onSort(field, sortDirection)
        }
    }
    renderHeader = (fields) => {
        return <tr key={'header-row'} className='header-row'>
            {fields.map((field, index) => {
                return this.renderHeaderField(index, field, 
                                              this.state.sortField, this.state.sortDirection)
          
            })}
        </tr>
    }

    renderHeaderField = (index, field, sortField, sortDirection) => {
        if(!field.sort) {
            return <th key={'header-col'+index} >{field.title}</th>
        } else {
            let className = 'cw-sorting';
            let sortClassName = 'fa fa-fw fa-sort';
            if(sortField == field.field) {
                if(sortDirection == 'asc') {
                    className = 'cw-sorting-asc';
                    sortClassName = 'fa fa-fw fa-sort-asc';
                } 
                else {
                    className = 'cw-sorting-desc'; 
                    sortClassName = 'fa fa-fw fa-sort-desc';
                } 
            }
            return <th className={className} key={'header-col'+index} 
                       onClick={()=>{this.onHeaderClick(field)}}>{field.title}<i class={sortClassName}></i></th>
        }
    }

    renderRow = (rowData, fields, rowIndex, isLast) => {
        return <tr key={'row'+rowIndex} className={isLast ? "last-row": "rowtable"} onClick={(e)=>{this.onRowClick(rowData, rowIndex);}}>
            {
                fields.map((item, index) => {
                   return this.renderCell(item, rowData, rowIndex, index)
                })
            }
        </tr>
    }
    onDeleteRow = ( rowData ) => {
        if(this.props.onDeleteRow) {
            this.props.onDeleteRow(rowData);
        }
    }

    renderCell = (field, rowData, rowIndex, colIndex) => {
        const fieldName = field.field;
        if(field.type == 'custom') {
            if(this.props.renderCustomField) {
                return this.props.renderCustomField(field, rowData, rowIndex, colIndex);
            } 
        }
        let isNode = rowData.children && true;
        let isOpened = rowData.isOpened;
        let icon = null;
        if(isNode) {
            icon = <i class={isOpened ? "fa fa-angle-up": "fa fa-angle-down"} style={{marginRight: '14px', marginLeft:'2px', width: '16px', height: '16px', fontWeight: 'bold', fontSize: '16px'}}></i>
        } else {
            if(this.props.enableDeleteChild) {
                icon = <img src={Images.remove} onClick={()=>{this.onDeleteRow(rowData)}} style={{marginRight: '16px', width: '16px', height: '16px',  fontSize: '16px'}}/>
            } else {
                icon = <span style={{marginRight: '40px'}}/>
            }
           
        }
        
        if(colIndex === 0) {
            return <td style={{paddingLeft: '16px'}}>{icon}{rowData[fieldName]}</td>
        } else {
            return <td key={'col'+colIndex}>{rowData[fieldName]}</td>
        }
  
    }
    renderSection = (sectionData, sectionFields, fields, sectionIndex, isLast) => {
        let rows = [];
        let section = <tr key={'section'+sectionIndex} className={isLast && !sectionData.isOpened ? "last-row": "rowtable"} onClick={(e)=>{this.onSectionClick(sectionData, sectionIndex);}}>
            {
                sectionFields.map((item, index) => {
                return this.renderCell(item, sectionData, sectionIndex, index)
                })
            }
        </tr>
        rows.push(section);
        if(sectionData.children && sectionData.isOpened) {
            sectionData.children.forEach((rowData, index) => {
                let row = this.renderRow(rowData, fields, index, index == sectionData.children.length-1)
                rows.push(row);
            })
        }
        return rows;
     
    }
    render () {
        const props = this.props;
        const data = this.state.data;
        const fields = props.fields || [];
        const sectionFields = props.sectionFields || [];
        return <div className="cw-table-container">
            <table>
                {this.renderHeader(fields)}
                {
                    data.map((rowData, index) => {
                        return this.renderSection(rowData, sectionFields, fields, index, index == data.length-1)
                    })
                }
            </table> 
        </div>
    }
}

CMAccordianTable.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    sectionFields: PropTypes.array,
    data: PropTypes.array,
    onRowClick: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onSort: PropTypes.func,
    enableDeleteChild: PropTypes.bool,
    renderCustomField: PropTypes.func
};
  

export default CMAccordianTable