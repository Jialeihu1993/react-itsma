/**
 * Created by hepen on 6/12/2017.
 */
import React from 'react';
import BaseComponent from '../BaseComponent';
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import CssUtils from '../../utils/CssUtils';
import FormUtils from '../../utils/FormUtils';

export default class BaseInput extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            invalidMessage: null,
        };
        this.onBlurFunc;
        this.onChangeFunc;
        this.value;
        this.onBlurValidation = this.onBlurValidation;
    }

    componentWillMount() {
        FormUtils.attachInputToCurrentForm(null, this);
    }

    renderComponent(property) {
        return (
            <FormGroup controlId={this.property.id} className={this.state.validated ? '' : 'has-error '}>
                {this.renderLabel()}
                {this.renderInput(property)}
                {this.renderInvalidation()}
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
        return null;
    }

    renderInvalidation() {
        let message = '';
        if (!this.state.validated) message = this.state.invalidMessage || 'Please provide a value for this field';
        return (
            <div>
                <HelpBlock><span className={CssUtils.get('has-error')}>{message}</span></HelpBlock>
            </div>
        )
    }

    filterSpecialProperty(property) {
        let hasChange = false;
        let propertyKeys = Object.keys(property);
        propertyKeys.forEach(key => {
            if (key === 'onChange') {
                this.onChangeFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        return property;
    }

    onValidation(value) {
        let valResult = [true, null];
        if (this.property.validateFunc) {
            let result = this.property.validateFunc(value);
            if (!result) {
                valResult = [false, this.property.validationMessage ? this.formatMessage({id: this.property.validationMessage}) : 'The value is not valid'];
            }
        } else {
            if (this.property.required === true) {
                let result = value != null && value != '';
                if (!result) {
                    valResult = [false, null];
                }
            }
        }
        return valResult;
    }

    onBlurValidation(event) {
        let result;
        result = this.onValidation(this.value);
        this.setState({validated: result[0], invalidMessage: result[1]})
        return result;
    }
	
	onChangeValidation(event) {
		let result;
        result = this.onValidation(this.value);
        this.setState({validated: result[0], invalidMessage: result[1]})
        return result;
	}

    onBlurHandler(event) {
        let result = this.onBlurValidation(event);
        this.onBlurFunc && this.onBlurFunc(event);
        return result;
    }
 //using state instead of redux 
    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        this.value = event.target.value;
        if (model && property) {
            model[property] = event.target.value;
            this.property.value = model[property];
            this.setState({});
        }
		this.onChangeValidation(event);
        this.onChangeFunc && this.onChangeFunc(event);
    }

    getProperty(propertyName) {
        let property;
        if (propertyName === 'value' && this.props.model && this.props.property) {
            property = this.props.model[this.props.property];
            this.value = this.props.model[this.props.property];
        } else if (propertyName === 'value') {
            property = this.props[propertyName];
            this.value = property;
        } else {
            property = this.props[propertyName];
        }
        return property;
    }
}

BaseInput.propTypes = Object.assign(BaseComponent.propTypes, {
    value: React.PropTypes.array,
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    validationMessage: React.PropTypes.string,
    model: React.PropTypes.object,
    property: React.PropTypes.string,

    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    validateFunc: React.PropTypes.func
 
});