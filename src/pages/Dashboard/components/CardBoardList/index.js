import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./style.scss"

class CardBoardList extends Component {

    renderItem = (title, value, index, isLast) => {
        return <div className="item-container" key={"item"+index}>
            <div className="item-content">
                <div className="item-title">
                    {title}
                </div>
                <div className="item-value">
                    {value}
                </div>  
            </div>
            {
               !isLast &&
               <div className="item-seperator"/>
            }
           

        </div>
    }

    render () {
        const props = this.props;
        const data = this.props.data || [];
        return <div className="cw-cardboard-list-container" style={this.props.containerStyle}>
            <div className="cw-cardboard-header">
                <div className="cw-cardboard-title">
                    {this.props.leftTitle}
                </div>
                <div className="cw-cardboard-title">
                    {this.props.rightTitle}
                </div>
            </div>
            <div className="cw-cardboard-body">
                {
                    data.map((item, index) => {
                        return this.renderItem(item.title, item.count, index, index == data.length-1)
                    })
                }
            </div>
        </div>
    }
}

CardBoardList.propTypes = {
    leftTitle: PropTypes.string,
    rightTitle: PropTypes.string,
    data: PropTypes.array,
};
  

export default CardBoardList