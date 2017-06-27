import React from 'react'
import {Modal, Image} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import '../../../styles/Dialog.scss';
import BaseComponent from '../BaseComponent';
import {DIALOG_SUCCESS_ICON, DIALOG_WARNING_ICON, DIALOG_ERROR_ICON, DIALOG_CLOSE} from '../../contants/Images';

export default class DialogComp extends BaseComponent{
    constructor(props) {
        super(props);
        this.state={show:true};
    }

    componentWillMount() {
        this.state.show = this.props.show;
    }

    componentWillReceiveProps(nextProps) {
        this.state.show = nextProps.show;
    }

    closeModal(event) {
        this.setState({show: false})
    };

    renderDialog({onExist, title, children, buttons, type}) {
        let imgSrc, titleMsg = this.formatMessage({id: title}), titleDom,
            closeDom = (<span className="modal-close" onClick={event => {this.closeModal(event)}}>
                <Image src={DIALOG_CLOSE} />
            </span>);
        if (type === 'error') {
            imgSrc = DIALOG_ERROR_ICON;
        } else if (type === 'warning') {
            imgSrc = DIALOG_WARNING_ICON;
        } else if (type === 'success') {
            imgSrc = DIALOG_SUCCESS_ICON;
        }
        if (imgSrc) {
            titleDom = <div className="modal-icon"><Image  src={imgSrc}/><span>{titleMsg}</span>{closeDom}</div>
        } else {
            titleDom = <div><span>{titleMsg}</span>closeDom</div>
        }
        return (
            <div className="static-modal ">
                <Modal show={this.state.show}  onExit={onExist}  className="MessageDialog">
                    <Modal.Header>
                        <Modal.Title>
                            {titleDom}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        {buttons}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    renderComponent(property) {
        return this.renderDialog(property);
    }
}
DialogComp.propTypes = Object.assign(BaseComponent.propTypes, {
    show: React.PropTypes.bool,
    onExist: React.PropTypes.func,
    title: React.PropTypes.string,
    buttons: React.PropTypes.array,
    type: React.PropTypes.oneOf(['success', 'warning', 'error'])
});