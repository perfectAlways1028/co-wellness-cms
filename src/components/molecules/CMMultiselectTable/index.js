import React, { Component } from 'react';
import PropTypes from 'prop-types';


import CCheckbox from '../../atoms/CCheckbox'

import "./style.scss"

class CMMultiselectTable extends Component {
    constructor(props) {
        super(props);
        let selectedItems = []
        this.state = {
          selectedItems,
          fields: [],
          data: [],
          sortField: null,
          sortDirection: 'asc'
        };
    }
    componentDidUpdate(prevProps, prevState) {


        if(this.props.data && this.props.data != prevProps.data) {
     
      
          
            this.setState({
                selectedItems: []
            })
        }
   
    }
    onRowClick(touchedItem, rowIndex) {
        if(!this.checkSelected(touchedItem)) {
            let items = this.state.selectedItems;
            items.push(touchedItem);
            this.setState({selectedItems: items})
            if(this.props.onItemSelected) {
                this.props.onItemSelected(items)
            }
        }else {
            let newItems = [];
            this.state.selectedItems.map(item =>{
                if(item.id != touchedItem.id)
                newItems.push(item);
            })
            this.setState({selectedItems: newItems})
            if(this.props.onItemSelected) {
                this.props.onItemSelected(newItems)
            }
        }
    
    
      }
      checkSelected = (touchedItem)=> {
        let selectedItems = this.state.selectedItems;
        return selectedItems.find((item)=>{
            return item.id == touchedItem.id
        })
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
        let cells = [];
        let checkboxField = <td key={'col 0'}>
            <CCheckbox 
            checked={this.checkSelected(rowData) != null} />
        </td>
        cells.push(checkboxField);
        fields.forEach((item, index) => {
            if(index > 0) {
                let cellView = this.renderCell(item, rowData, rowIndex, index+1);
                cells.push(cellView) 
            }
        })
        return <tr key={'row'+rowIndex} className={isLast ? "last-row": "rowtable"} onClick={(e)=>{this.onRowClick(rowData, rowIndex);}}>
            {cells}
        </tr>
    }

    renderCell = (field, rowData, rowIndex, colIndex) => {
        const fieldName = field.field;
        if(field.type == 'custom') {
            if(this.props.renderCustomField) {
                return this.props.renderCustomField(field, rowData, rowIndex, colIndex);
            } 
        }
        return <td key={'col'+colIndex}>{rowData[fieldName]}</td>
    }
    render () {
        const props = this.props;
        const data = props.data || [];
        var fields = [];
        fields.push({title:'', field:'checkbox'})
        props.fields.forEach(item => {
            fields.push(item);
        })

        return <div className="cw-table-container">
            <table>
                {this.renderHeader(fields)}
                {
                    data.map((rowData, index) => {
                        return this.renderRow(rowData, fields, index, index == data.length-1)
                    })
                }
            </table>
        </div>
    }
}

CMMultiselectTable.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    data: PropTypes.array,
    onItemSelected: PropTypes.func,
    selectedItems: PropTypes.array,
    onSort: PropTypes.func,
    renderCustomField: PropTypes.func
};
  

export default CMMultiselectTable