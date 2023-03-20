import React, { Component } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import "./style.scss"
// const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

let styles = {
    root: {
        marginTop: "4px",
        height: "40px",
        fontFamily: "Google Sans Light",
        fontSize: "14px",
        backgroundColor: "white",
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "#A7A6C5"
        }
    },
    notchedOutline: {
        borderColor: "#A7A6C5"
    },
    focused: {
        "&$root $notchedOutline": {
            borderColor: "#A7A6C5"
        }
    }
}

class CDatePicker extends Component {
    // componentDidMount() {

    //     if (this.DatePicker && isSafari) {
    //         this.DatePicker.onOutsideAction = (event) => {
    //         }
    //     }

    // }

    render() {
        const props = this.props;

        return (
            <div className="cw-datepicker-container" style={props.containerStyle}>
                <div className={this.props.disable ? 'label_disabled' : 'label'}>{props.label}</div>
                <MuiPickersUtilsProvider utils={MomentUtils}>

                    <KeyboardDatePicker
                        // ref={(instance) => { this.DatePicker = instance }}
                        disabled={props.disable}
                        value={props.selected ? props.selected : null}
                        inputVariant="outlined"
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        clearable
                        onFocus={props.onFocus}
                        views={["month", "date"]}
                        placeholder="DD MMM YYYY, e.g., 12 Dec 2022"
                        // clearIcon={null}
                        rifmFormatter={val => val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')}
                        refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi}
                        fullWidth
                        format={"DD MMM YYYY"}
                        InputProps={{
                            classes: {
                                root: props.classes.root,
                                notchedOutline: props.classes.notchedOutline,
                                focused: props.classes.focused,
                            }
                        }}

                    />
                    {
                        props.error ?
                            <div className={'error'}>{props.error}</div>
                            :
                            <div className={'info'}>{props.info}</div>
                    }
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withStyles(styles)(CDatePicker);