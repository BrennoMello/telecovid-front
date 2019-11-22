import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SimpleModal from './modal/SimpleModal';
import FileUpload from './upload/FileUpload';
import ValidateToken from './token/ValidateToken';

const divStyleBox = {
    width: "50%",
};

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

class PmacsPanelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                userName: this.props.location.state.userName, 
                token: this.props.location.state.token
            }
        }
        
    }

    componentDidMount() {
        console.log(this.state.user.token);
    }

    render() {
        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />
                <h2 className="font_2" style={divStylePaddingBottom}>Painel</h2>

                <FileUpload/>
                
                {/*
                    <ValidateToken user={this.state.user}/>
                */}
                
                
            </div>
        )
    }
}

export default PmacsPanelComponent