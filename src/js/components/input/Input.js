/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {INPUT_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import CssUtils from '../../utils/CssUtils';

export default class Input extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(INPUT_PROPERTY);
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
        let property;
        if (propertyName === 'value' && this.props.model && this.props.property) {
            property = this.props.model[this.props.property];
        } else {
            property = this.props[propertyName];
        }

        return property;
    }
}

Input.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    max: React.PropTypes.string,
    min: React.PropTypes.string,
    maxLength: React.PropTypes.string,
    type: React.PropTypes.string
});