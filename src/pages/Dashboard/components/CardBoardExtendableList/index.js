import React, { Component } from 'react';
import moment from 'moment';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./style.scss"

class CardBoard extends Component {
  renderItemContent = (title, value, index, isLast) => {
    return <div className="item-container" key={"item" + index}>
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
        <div className="item-seperator" />
      }
    </div>
  }

  renderItemHeader = (date, active, inactive, index, isLast) => {
    return <div className="item-container" key={"item" + index}>
      <div className="item-content">
        <div className="item-title">
          {date}
        </div>
        <div className="item-value">
          {`${active} Active, ${inactive} Inactive`}
        </div>
      </div>
      {
        !isLast &&
        <div className="item-seperator" />
      }
    </div>
  }

  render() {
    const props = this.props;
    const data = this.props.data || [];

    return (
      <div style={{ position: "relative", zIndex: props.zIndex ? props.zIndex : 1 }}>
        <div className="cw-cardboardex-container" style={this.props.containerStyle}>
          <div className="cw-cardboardex-header">
            <div className="cw-cardboardex-title">
              {this.props.leftTitle}
            </div>
            <div className="cw-cardboardex-title">
              {this.props.rightTitle}
              {props.isHeaderExtended &&
                <>
                  {props.isHeadOpen ? <ExpandLessIcon onClick={props.expandHeadList} /> :
                    <ExpandMoreIcon onClick={props.expandHeadList} />}
                </>
              }
            </div>
          </div>
          <div className="cw-cardboardex-body">
            <div className="info-view">
              <div className="info-title">
                {this.props.leftInfoTitle}
                {props.isContentExtended &&
                  <>
                    {props.isLeftOpen ? <ExpandLessIcon onClick={props.expandLeftList} /> :
                      <ExpandMoreIcon onClick={props.expandLeftList} />}
                  </>
                }
              </div>
              <div className="info-description">
                {this.props.leftInfoDescription}
              </div>
            </div>
            <div className="seperate-line" />
            <div className="info-view">
              <div className="info-title">
                {this.props.rightInfoTitle}
                {props.isContentExtended &&
                  <>
                    {props.isRightOpen ? <ExpandLessIcon onClick={props.expandRightList} /> :
                      <ExpandMoreIcon onClick={props.expandRightList} />
                    }
                  </>
                }
              </div>
              <div className="info-description">
                {this.props.rightInfoDescription}
              </div>
            </div>
          </div>
        </div>
        {!!props.isLeftOpen || !!props.isRightOpen || !!props.isHeadOpen ?
          <div className="cw-cardboardexlist-container"
            style={{
              height: data.length <= 8 ? "fit-content" : "400px",
              overflow: data.length > 8 && "scroll"
            }}
          >
            <div className="cw-cardboardex-body">
              {
                props.isContentExtended && data.map((item, index) => {
                  return this.renderItemContent(item.name, item.datetime ? moment(item.datetime).format("DD MMM YYYY HH:mm:ss") : "", index, index == data.length - 1)
                })
              }
              {
                props.isHeaderExtended && data.map((item, index) => {
                  return this.renderItemHeader(moment(item.date).format("DD MMM YYYY"), item.totalActive, item.totalinactive, index, index == data.length - 1);
                })
              }
            </div>
          </div> : <></>
        }
      </div>
    )
  }
}

export default CardBoard