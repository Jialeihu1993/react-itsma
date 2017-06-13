/**
 * Created by hepen on 6/12/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Radio, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {RADIO_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import CssUtils from '../../utils/CssUtils';

export default class RadioComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(RADIO_PROPERTY);
    }

    componentWillMount() {
    }

    renderComponent(property) {
        return (
            <FormGroup controlId={this.property.id} className={this.state.validated ? '' : 'has-error '}>
                {this.renderLabel()}
                {this.renderInput(property)}
                {this.renderInValidation()}
            </FormGroup>
        )
    }

    renderLabel() {
        let className = CssUtils.get('inputTitle');
        if (!this.state.validated) {
            className += ' ' + CssUtils.get('has-error');
        }
        if (this.property.label) {
            return (
                <div className={CssUtils.get('cusMargin15')}>
                    <span>
                        <ControlLabel className={className}>{this.formatMessage({id: this.property.label})}
                            {this.property.required === true  ? (<span className={CssUtils.get('mandatory')}>*</span>) : null}</ControlLabel>
                    </span>
                </div>
            )
        }
        return null;
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = CssUtils.get('has-error');
            property.className = className;
        }

        let radioComp = this.renderRadioByParameter(property);

        return radioComp;
    }

    renderRadioByParameter(property) {
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

        let result = parameters.map(param => {
            let checked = param.value === checkedValue ? 'checked':'';
            let radioProps = Object.assign({}, property);
            if (checked === 'checked') radioProps.checked = true;
            return <Radio {...radioProps} value={param.value}><span className={className}>{param.text}</span></Radio>
        });
        return result;
    }

    renderInValidation() {
        let message = '';
        if (!this.state.validated) message = this.state.invalidMessage || 'Please provide a value for this field';
        return (
            <div>
                <HelpBlock><span className={CssUtils.get('has-error')}>{message}</span></HelpBlock>
            </div>
        )
    }

    onValidation(event) {
        let valResult = [true, null];
        if (this.property.validateFunc) {
            let result = this.property.validateFunc(event);
            if (!result) {
                valResult = [false, this.formatMessage({id: this.property.validationMessage})];
            }
        } else {
            if (this.property.required === true) {
                let result = event.target.value != null && event.target.value != '';
                if (!result) {
                    valResult = [false, null];
                }
            }
        }
        return valResult;
    }

    onBlurValidation(event) {
        let result;
        result = this.onValidation(event);
        this.setState({validated: result[0], invalidMessage: result[1]})
        this.onBlurFunc && this.onBlurFunc(event);
        return result;
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        if (model && property) {
            model[property] = event.target.value;
            this.property.value = model[property];
            this.setState({});
        }
        this.onChangeFunc && this.onChangeFunc(event);
    }

    getProperty(propertyName) {
        let property = this.props[propertyName];

        return property;
    }
}

RadioComp.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    inline: React.PropTypes.bool,
    parameters: React.PropTypes.array
});