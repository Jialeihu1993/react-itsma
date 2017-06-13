/**
 * Created by hepen on 6/12/2017.
 */
import React from 'react';
import BaseComponent from '../BaseComponent';

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
        return null;
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
                property[key] = this.onBlurValidation.bind(this);
            } else if (key === 'onChange') {
                this.onBlurFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            }
        });
        if (!hasBlur) {
            property.onBlur = this.onBlurValidation.bind(this);
        }
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        return property;
    }

    onBlurValidation(event) {
        return true;
    }

    onChangeBind(event) {

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