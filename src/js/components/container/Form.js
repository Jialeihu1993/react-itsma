/**
 * Created by hepen on 6/6/2017.
 */
import React from 'react';
import {Form} from 'react-bootstrap';
import BaseContainer from './BaseContainer';
import {FORM_PROPERTY} from '../../contants/ConstantsProperty';
import ButtonFormMapping from '../../utils/ButtonFormMapping';

export default class FormContainer extends BaseContainer {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(FORM_PROPERTY);
        this.state = {
        };
    }

    processChildButton(node) {
        if (!node) node = this;
        let {children} = node.props;
        if (!children) return;

        if (children instanceof Array) {
            children.forEach(child => {
                if (((typeof child.type === 'string' && child.type === 'BaseButton')
                    || (typeof child.type === 'function' && child.type.displayName && child.type.displayName.indexOf('(BaseButton)') >= 0))
                    && child.props.causeValidation === true) {
                    ButtonFormMapping.addButtonForm(child, this);
                } else {
                    this.processChildButton(child);
                }
            });
        } else {
            let child = children;
            if (((typeof child.type === 'string' && child.type === 'BaseButton')
                || (typeof child.type === 'function' && child.type.displayName.indexOf('(BaseButton)') >= 0))
                && child.props.causeValidation === true) {
                ButtonFormMapping.addButtonForm(child, this);
            } else {
                this.processChildButton(child);
            }
        }
    }

    runValidation(){
        debugger;
    }

    componentWillMount() {
    }

    renderComponent(property) {
        return (
            <Form {...property}>{this.props.children}</Form>
        )
    }
}

FormContainer.propTypes = Object.assign(BaseContainer.propTypes, {
    horizontal: React.PropTypes.bool
});