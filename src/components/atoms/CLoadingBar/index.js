import React, { Component } from 'react';

class CLoadingBar extends Component {
  render() {
    const { progress, barColor, backgroundColor, borderColor } = this.props;

    return (
      <div
        style={{
          width: `100%`,
          backgroundColor: backgroundColor || '#BDBDBD',
          height: '30px',
          border: `1px solid ${borderColor || 'lightgrey'}}`,
          borderRadius: '20px',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: barColor || '#64B04C',
            borderRadius: '20px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {progress && progress !== 0 ? <span style={{ fontSize: '20px' }}>{progress.toFixed()}%</span> : ''}
        </div>
      </div>
    )
  }
}
export default CLoadingBar;