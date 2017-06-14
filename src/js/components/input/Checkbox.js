/**
 * Created by hepen on 6/14/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Checkbox} from 'react-bootstrap';
import {CHECKBOX_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import CssUtils from '../../utils/CssUtils';

export default class CheckboxComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(CHECKBOX_PROPERTY);
        this.tempValue = [];
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = CssUtils.get('has-error');
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
            className += CssUtils.get('has-error');
        }

        this.tempValue = [];
        let result = parameters.map(param => {
            let checked = checkedValue && checkedValue.indexOf(param.value) >= 0 ? 'checked':'';
            let radioProps = Object.assign({}, property);
            if (checked === 'checked') radioProps.checked = true;
            this.tempValue.push({value:param.value, checked: checked === 'checked'});
            return <Checkbox {...radioProps} value={param.value}><span className={className}>{param.text}</span></Checkbox>
        });
        return result;
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        let checked = event.target.checked;
        if (model && property) {
            if (!model[property]) model[property] = [];
            if (checked) {
                model[property] = this.insertValue(event.target.value);
            } else {
                model[property] = this.removeValue(event.target.value);
            }
            this.property.value = model[property];
            this.setState({});
        }
        this.onChangeFunc && this.onChangeFunc(event);
    }

    insertValue(value) {
        let result = [];
        this.tempValue.forEach(tempV => {
            if (tempV.value === value) {
                tempV.checked = true;
            }
            if (tempV.checked) {
                result.push(tempV.value);
            }
        });
        return result;
    }

    removeValue(value) {
        let result = [];
        this.tempValue.forEach(tempV => {
            if (tempV.value === value) {
                tempV.checked = false;
            }
            if (tempV.checked) {
                result.push(tempV.value);
            }
        });
        return result;
    }
}

CheckboxComp.propTypes = Object.assign(BaseInput.propTypes, {
    inline: React.PropTypes.bool,
    parameters: React.PropTypes.array
});