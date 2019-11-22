import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../../service/UserDataService';
import SimpleModal from '../modal/SimpleModal';

class FileUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFiles: null,
            uploadedFiles: null,
        }
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        console.log(event.target.files)
        this.setState({
            selectedFiles: event.target.files,
        })
    }

    onSubmit(values) {
        const data = new FormData();
        for(let i = 0; i< this.state.selectedFiles.length; i++) {
            data.append('files', this.state.selectedFiles[i])
        }

        UserDataService.uploadFiles(data)
        .then(response => {
                if(response.data.code === 100){
                    this.refs.simpleModal.modalOpen('Arquivo(s) Enviado(s)', 'Os seguintes arquivos foram enviados com sucesso:', response.data.description);
                    console.log(response.data.description);
                }
                else{
                    if(response.data.code === 666){
                        this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                        console.log(response.data.description);
                    }
                }
            }
        )
        .catch(error => {
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!this.state.selectedFiles) {
            errors.file = 'Selecione um arquivo'
        }
    
        return errors
    }

    render() {
        return (
            <div className="container">
                <SimpleModal ref="simpleModal" />

                <Formik 
                initialValues={{file: null}}
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="file" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Upload arquivo E-SUS AB</label>
                                <input className="form-control" type="file" name="file" onChange={this.onChangeHandler} multiple />
                            </fieldset>
                            <div>
                                <button type="button" className="btn btn-success btn-block" type="submit">Upload</button>
                            </div>

                        </Form>
                    )
                }
                </Formik>
            </div>
        )
    }
}

export default FileUpload