/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl} from 'react-bootstrap';
import {INPUT_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';

export default class Input extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(INPUT_PROPERTY);
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'input-cus has-error';
            property.className = className;
        }

        return (<FormControl {...property}/>);
    }


     onBlurValidation(event) {
        let result = super.onBlurValidation(event);
        if(this.property.vStatus){
            this.property.vStatus(result[0]);
        }
    }
	
	onChangeValidation(event) {
        let result = super.onChangeValidation(event);
        if(this.property.vStatus){
            this.property.vStatus(result[0]);
        } 
	}


    filterSpecialProperty(property) {
        let hasBlur = false, hasChange = false;
        let propertyKeys = Object.keys(property);
        propertyKeys.forEach(key => {
            if (key === 'placeholder') {
                property[key] = this.formatMessage({id: property[key]});
            } else if (key === 'onBlur') {
                this.onBlurFunc = property[key];
                hasBlur = true;
                property[key] = this.onBlurHandler.bind(this);
            } else if (key === 'onChange') {
                //this.onBlurFunc = property[key];
                this.onChangeFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasBlur) {
            property.onBlur = this.onBlurHandler.bind(this);
        }
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        return property;
    }
}

Input.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    max: React.PropTypes.string,
    min: React.PropTypes.string,
    maxLength: React.PropTypes.string,
    type: React.PropTypes.string,
    vStatus: React.PropTypes.func
});