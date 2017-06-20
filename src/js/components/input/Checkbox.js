/**
 * Created by hepen on 6/14/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Checkbox} from 'react-bootstrap';
import {CHECKBOX_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';

export default class CheckboxComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(CHECKBOX_PROPERTY);
        this.tempValue = [];
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

        this.tempValue = [];
        let result = parameters.map(param => {
            let labelClassName = 'itsma_checkbox_icon';
            let checked = checkedValue && checkedValue.indexOf(param.value) >= 0 ? 'checked':'';
            let radioProps = Object.assign({}, property);
            if (checked === 'checked') {
                radioProps.checked = true;
                labelClassName += ' itsma_checked';
            }
            delete radioProps.value;
            delete radioProps.className;
            this.tempValue.push({value:param.value, checked: checked === 'checked'});
            return (
                <span className="itsma_radio_wrapper">
                    <label className={labelClassName} value={param.value} {...radioProps}></label>
                    <Checkbox className="itsma_radio" value={param.value}></Checkbox>
                    <span className={className}>{param.text}</span>
                </span>
                )
        });
        return result;
    }

    filterSpecialProperty(property) {
        let hasClick = false;
        let propertyKeys = Object.keys(property);
        propertyKeys.forEach(key => {
            if (key === 'onClick') {
                this.onClickFunc = property[key];
                hasClick = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasClick) {
            property.onClick = this.onChangeBind.bind(this);
        }
        return property;
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        let checked = true;
        this.tempValue.forEach(tempV => {
            if (tempV.value === event.target.attributes[1].value) {
                checked = !tempV.checked;
            }
        });
        let value = null;
        if (checked) {
            value = this.insertValue(event.target.attributes[1].value);
        } else {
            value = this.removeValue(event.target.attributes[1].value);
        }
        this.value = value;
        if (model && property) {
            if (!model[property]) model[property] = [];
            model[property] = value;
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