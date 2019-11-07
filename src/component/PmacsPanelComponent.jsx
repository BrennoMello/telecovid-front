import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

const divStyleCenter = {
    textAlign: "center",
};

class PmacsPanelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: this.props.location.state.username, 
                token: this.props.location.state.token
            }
        }
        this.ValidateToken = this.ValidateToken.bind(this)
    }

    componentDidMount() {
        console.log("Token:");
        console.log(this.state.user.token);
    }

    ValidateToken() {
        UserDataService.validateUser(this.state.user.token).then(
            response => {
                console.log("Validação: "+response.data)
                if(response.data){
                    console.log(this.state.user.username+": Token autenticado. Acesso Garantido");
                }
                else{
                    console.log("Token não autenticado. Acesso Negado");
                }
            }
        )
    }

    render() {
        return (
            <>
            <h2>Painel</h2>

            <div style={divStyleCenter}>
                <button className="btn btn-warning" type="butom" onClick={this.ValidateToken}>Validar Token</button>
            </div>
            </>
        )
    }
}

export default PmacsPanelComponent