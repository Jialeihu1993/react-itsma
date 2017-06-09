/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {INPUT_PROPERTY, INPUT_PROPERTY_SINGLE} from '../../contants/ConstantsProperty';
import BaseComponent from '../BaseComponent';
import CssUtils from '../../utils/CssUtils';

export default class Input extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            invalidMessage: null,
        };
        this.onBlurFunc;
    }

    componentWillMount() {
    }

    renderComponent() {
        return (
            <FormGroup controlId={this.property.id} className={this.state.validated ? '' : 'has-error '}>
                {this.renderLabel()}
                {this.renderInput()}
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
                <div className={CssUtils.get('cusMargin17')}>
                    <span>
                        <ControlLabel className={className}>{this.formatMessage({id: this.property.label})}
                        {this.property.required === true  ? (<span className={CssUtils.get('manatory')}>*</span>) : null}</ControlLabel>
                    </span>
                </div>
            )
        }
        return null;
    }

    renderInput() {
        let property = {}, hasBlur = false;
        let propertyKeys = Object.keys(this.property);
        propertyKeys = propertyKeys.filter(key => INPUT_PROPERTY.indexOf(key) >= 0);
        propertyKeys.forEach(key => {
            if (INPUT_PROPERTY_SINGLE.indexOf(key) >= 0 && this.property[key] !== true) {
                delete this.property[key];
            } else if (key === 'placeholder') {
                property[key] = this.formatMessage({id: this.property[key]});
            } else if (key === 'onBlur') {
                this.onBlurFunc = this.property[key];
                hasBlur = true;
                property[key] = this.onBlurValidation.bind(this);
            } else {
                property[key] = this.property[key];
            }
        });
        if (!hasBlur) {
            property.onBlur = this.onBlurValidation.bind(this);
        }

        let className = null;
        if (!this.state.validated) {
            className = 'input-cus ' + CssUtils.get('has-error');
            property.className = className;
        }

        return (<FormControl {...property}/>);
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

    getProperty(propertyName) {
        let property = this.props[propertyName];

        return property;
    }
}

Input.propTypes = Object.assign(BaseComponent.propTypes, {
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    max: React.PropTypes.string,
    min: React.PropTypes.string,
    maxLength: React.PropTypes.string,
    type: React.PropTypes.string,
    validationMessage: React.PropTypes.string,

    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    validateFunc: React.PropTypes.func

});