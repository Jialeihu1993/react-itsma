/**
 * Created by hepen on 6/15/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {ControlLabel, FormGroup} from 'react-bootstrap';
import {TOGGLE_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';

export default class ToggleComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(TOGGLE_PROPERTY);
        this.state.isToggleOn = true;
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
        let className = 'itsma_inputTitle';
        if (!this.state.validated) {
            className += ' itsma_has-error';
        }
        if (this.property.label) {
            return (
                <div className='itsma_toggle_div'>
                    <span>
                        <ControlLabel className={className}>{this.formatMessage({id: this.property.label})}
                            {this.property.required === true  ? (<span className='itsma_mandatory'>*</span>) : null}</ControlLabel>
                    </span>
                </div>
            )
        }
        return null;
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'itsma_has-error';
            property.className = className;
        }

        if (this.property.model && this.property.property) {
            this.state.isToggleOn = this.property.model[this.property.property];
        } else if (this.property.value != null) {
            this.state.isToggleOn = this.property.value;
        }

        return (
            <div className='itsma_toggle_div' style={{paddingLeft: '100px'}} onClick={this.onChangeBind.bind(this)}>
                <input type="checkbox" className='itsma_toggle_input' checked={this.state.isToggleOn}/>
                <label className='itsma_toggle_label'></label>
            </div>
        );
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        let isToggleOn = !this.state.isToggleOn;
        this.value = isToggleOn;
        if (model && property) {
            model[property] = isToggleOn;
            this.property.value = model[property];
        }
        this.setState({isToggleOn: isToggleOn});
        this.onChangeFunc && this.onChangeFunc(event);
    }
}

ToggleComp.propTypes = Object.assign(BaseInput.propTypes, {
});