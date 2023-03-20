import React, { Component } from 'react';

import "./style.scss"

class CardBoard extends Component {

  render() {
    const props = this.props;
    return (
      <div className="cw-cardboard-container" style={this.props.containerStyle}>
        <div className="cw-cardboard-header">
          <div className="cw-cardboard-title">
            {this.props.leftTitle}
          </div>
          <div className="cw-cardboard-title">
            {this.props.rightTitle}
          </div>
        </div>
        <div className="cw-cardboard-body">
          <div className="info-view">
            <div className="info-description" style={props.topDescriptionStyle}>
              {this.props.leftInfoTopDescription}
            </div>
            <div className="info-title" style={props.infoStyle}>
              {this.props.leftInfoTitle}
            </div>
            <div className="info-description" style={props.btmDescriptionStyle}>
              {this.props.leftInfoDescription}
            </div>
          </div>
          <div className="seperate-line" />
          <div className="info-view">
            <div className="info-description" style={props.topDescriptionStyle}>
              {this.props.rightInfoTopDescription}
            </div>
            <div className="info-title" style={props.infoStyle}>
              {this.props.rightInfoTitle}
            </div>
            <div className="info-description" style={props.btmDescriptionStyle}>
              {this.props.rightInfoDescription}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBoard