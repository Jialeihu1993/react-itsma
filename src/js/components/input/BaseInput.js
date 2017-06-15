/**
 * Created by hepen on 6/12/2017.
 */
import React from 'react';
import BaseComponent from '../BaseComponent';
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import CssUtils from '../../utils/CssUtils';

export default class BaseInput extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            invalidMessage: null,
        };
        this.onBlurFunc;
        this.onChangeFunc;
    }

    componentWillMount() {
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
                this.onBlurFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        return property;
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