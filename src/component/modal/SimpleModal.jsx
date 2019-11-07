import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class SimpleModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalTitle: '',
            modalDescription: '',
            modalMsg: ''
        }

        this.modalGetInitialState = this.modalGetInitialState.bind(this)
        this.modalClose = this.modalClose.bind(this)
        this.modalOpen = this.modalOpen.bind(this)
    }

    modalGetInitialState() {
        return { showModal: false };
    }
    modalClose() {
        this.setState({ showModal: false });
    }
    modalOpen(modalTitle, modalDescription, modalMsg) {
        this.setState({ 
                modalTitle: modalTitle,
                modalDescription: modalDescription,
                modalMsg: modalMsg,
                showModal: true 
            }
        );
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title><span className="font_1">{this.state.modalTitle}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="font_2">
                        <h5>{this.state.modalDescription}</h5>
                        <p>{this.state.modalMsg}</p>
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.modalClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SimpleModal