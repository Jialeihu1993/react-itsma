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
        this.onClickFunc;
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

    filterSpecialProperty(property) {
        let hasClick = false, hasChange = false;
        let propertyKeys = Object.keys(property);
        propertyKeys.forEach(key => {
            if (key === 'onClick') {
                this.onClickFunc = property[key];
                hasClick = true;
                property[key] = this.onChangeBind.bind(this);
            } else if (key === 'onChange') {
                this.onChangeFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasClick) {
            property.onClick = this.onChangeBind.bind(this);
        }
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        return property;
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
            let labelClassName = 'itsma_radio_icon', valueClassName = 'itsma_radio_value';
            let checked = param.value === checkedValue ? 'checked':'';
            let radioProps = Object.assign({}, property);
            delete radioProps.value;
            delete radioProps.className;
            if (checked === 'checked') {
                radioProps.checked = true;
                labelClassName += ' itsma_checked'
            }
            if (!this.state.validated) {
                valueClassName += ' ' + className
            }
            return (
                <span className="itsma_radio_wrapper">
                    <label className={labelClassName} value={param.value} {...radioProps}></label>
                    <Radio className="itsma_radio" value={param.value}></Radio>
                    <span className={valueClassName}>{param.text}</span>
                </span>
            )
        });
        return result;
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        this.value = event.target.attributes[1].value;
        if (model && property) {
            model[property] = this.value;
            this.property.value = model[property];
            this.setState({});
        } else {
            this.property.value = this.value;
            this.setState({});
        }
        this.onChangeFunc && this.onChangeFunc(event);
    }

}

RadioComp.propTypes = Object.assign(BaseInput.propTypes, {
    inline: React.PropTypes.bool,
    parameters: React.PropTypes.array
});