import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CImage, CButton, CImageButton} from '../../atoms';

import "./style.scss"

class CMImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }
    handleChange = (event) => {
        let url = URL.createObjectURL(event.target.files[0]);
        if(this.props.onSelectImage) {
            this.props.onSelectImage(url, event.target.files[0]);
        }

        if(!this.props.isRemoteUrlOnly) {
            this.setState({
                file: url
              })
        }
   
        
    }
    onClearImage = () => {
        if(this.props.onClearImage){
            this.props.onClearImage()
        }
        this.setState({
            file: null
        })
    }
    onLoad = ({target:img}) => {
        console.log("width:",img.naturalWidth)
        console.log("height:",img.naturalHeight)
        //TODO validate image if needed
    }
    render () {
        const props = this.props;
        return <div className="cw-imagepicker-container" style={this.props.containerStyle}>
             <div className={this.props.disable ? 'label_disabled' : 'label'}>{props.label}</div>
            <div className={'image-container'}>
                {
                    (this.state.file || this.props.imageUrl ) &&
                    <div className={'preview'}> 
                            <CImage  src={this.state.file || this.props.imageUrl } onLoad={(e)=>{this.onLoad(e)}}/>
                    </div>
                }
                {
                    (!props.disable && (this.state.file || this.props.imageUrl )) &&
                    <CImageButton src={this.props.closeButtonIcon || require('./close_button.svg')}
                        onClick={()=>{
                            this.onClearImage();
                        }} 
                        containerStyle={{width: '32px', 
                                        height: '32px', 
                                        position: 'absolute',
                                        top: '-16px',
                                        right: '-16px'}}/>
                }
                {
                    (!props.disable &&  !this.state.file && !this.props.imageUrl && !this.props.isUploading) &&
                    <CButton containerStyle={{height: '40px', width: '136px'}}
                        fileAccept="image/png, image/jpeg"
                        onFileChange={(e)=>{this.handleChange(e)}}
                        isFilePicker={true}
                    >{this.props.buttonLabel || 'BROWSE'}</CButton>

                }
                {
                    (!props.disable &&  !this.state.file && !this.props.imageUrl && !this.props.isUploading) &&
                    <div className={'description'}>{props.description}</div>
                }
                {
                    !props.disable && this.props.isUploading &&
                    <div className={'description'}>{props.labelUploading || 'Uploading...'}</div>
                }
       
            </div>
            {
                this.props.error &&
                <div className={'error'}>{props.error}</div>
            }
        
        </div>
    }
}

CMImagePicker.propTypes = { 
    buttonLabel: PropTypes.string,
    closeButtonIcon: PropTypes.string,
    onClearImage: PropTypes.func,
    onSelectImage: PropTypes.func,
    containerStyle: PropTypes.object,
    description: PropTypes.string,
    label: PropTypes.string,
    disable: PropTypes.bool
};
  

export default CMImagePicker