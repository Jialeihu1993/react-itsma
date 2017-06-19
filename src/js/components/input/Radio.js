/**
 * Created by hepen on 6/12/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Radio} from 'react-bootstrap';
import {RADIO_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';

export default class RadioComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(RADIO_PROPERTY);
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'itsma_has-error';
            property.className = className;
        }

        let radioComp = this.renderByParameter(property);

        return radioComp;
    }

    renderByParameter(property) {
        let {parameters} = this.property;
        let checkedValue;
        if (!parameters) return;
        if (this.property.model && this.property.property) {
            checkedValue = this.property.model[this.property.property];
        } else if (this.property.value != null) {
            checkedValue = this.property.value;
        }

        let className = '';
        if (!this.state.validated) {
            className += 'itsma_has-error';
        }

        let result = parameters.map(param => {
            let checked = param.value === checkedValue ? 'checked':'';
            let radioProps = Object.assign({}, property);
            if (checked === 'checked') radioProps.checked = true;
            return <Radio {...radioProps} value={param.value}><span className={className}>{param.text}</span></Radio>
        });
        return result;
    }

}

RadioComp.propTypes = Object.assign(BaseInput.propTypes, {
    inline: React.PropTypes.bool,
    parameters: React.PropTypes.array
});