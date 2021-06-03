import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class index extends Component {

    state = {
        Modal: false,
        Titulo:"",
        Contenido:"",
        Button: null
    }


    static getDerivedStateFromProps (nextProps, prevState) {

        return null;
    }

    Modal = () => {
        this.setState({Modal: !this.state.Modal});
        this.props.getBolean(false);
    }

    render() {

        return (
            <Modal className='col-12'
                isOpen={this.props.Open}>
                <ModalHeader>
                     {this.props.Titulo}
                </ModalHeader>
                <ModalBody>
                    {this.props.Contenido}
                </ModalBody>
                <ModalFooter>
                    {this.props.button}
                    <button
                        className="btn btn-secondary"
                        onClick={this.Modal}> Cerrar
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default index;
