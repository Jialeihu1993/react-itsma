/**
 * Created by hepen on 6/14/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl} from 'react-bootstrap';
import {SELECT_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import CssUtils from '../../utils/CssUtils';

export default class SelectComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(SELECT_PROPERTY);
        this.tempValue = [];
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'input-cus ' + CssUtils.get('has-error');
            property.className = className;
        }
        //{this.renderOptions(property)}
        return (
            <FormControl {...property} componentClass="select">
                {this.renderOptions(property)}
            </FormControl>
        );
    }

    renderOptions(property) {
        let {parameters} = this.property;
        let selectedValue;
        if (!parameters) return;
        if (this.property.model && this.property.property) {
            selectedValue = this.property.model[this.property.property];
        } else if (this.property.value != null) {
            selectedValue = this.property.value;
        }

        this.tempValue = [];
        let result = parameters.map(param => {
            let checked = param.value === selectedValue ? 'selected':'';
            let optionProps = {};
            if (checked === 'selected') optionProps.selected = true;
            return <option value={param.value} {...optionProps}>{param.text}</option>
        });

        if (this.property.showBlank !== false) {
            result.unshift(<option value=''>{this.formatMessage({id: this.property.placeholder})}</option>);
        }
        return result;
    }
}

SelectComp.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    showBlank: React.PropTypes.bool,
    parameters: React.PropTypes.array
});