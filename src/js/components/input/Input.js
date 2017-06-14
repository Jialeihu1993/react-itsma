/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl} from 'react-bootstrap';
import {INPUT_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import CssUtils from '../../utils/CssUtils';

export default class Input extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(INPUT_PROPERTY);
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'input-cus ' + CssUtils.get('has-error');
            property.className = className;
        }

        return (<FormControl {...property}/>);
    }
}

Input.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    max: React.PropTypes.string,
    min: React.PropTypes.string,
    maxLength: React.PropTypes.string,
    type: React.PropTypes.string
});