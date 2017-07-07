/**
 * Created by hepen on 6/14/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FormControl} from 'react-bootstrap';
import {SELECT_PROPERTY} from '../../contants/ConstantsProperty';
import BaseInput from './BaseInput';
import Dropdown from '../dropdown/Dropdown';

export default class SelectComp extends BaseInput {
    constructor(props) {
        super(props);
        this.setPropertyKeyList(SELECT_PROPERTY);
        this.tempValue = [];
    }

    renderInput(property) {
        let className = null;
        if (!this.state.validated) {
            className = 'input-cus itsma_has-error';
            property.className = className;
        }
        return (
            <Dropdown {...property}/>

        );
    }

    setProperty() {
        let allProps = this.props;
        let keys = Object.keys(allProps);
        keys.forEach(key => {
            if (key === 'parameters') {
                this.property['options'] = this.getProperty(key);
                this.property['options'].forEach(option => {
                    if (option.text) {
                        option.text = this.formatMessage({id: option.text});
                    }
                })
            } else {
                this.property[key] = this.getProperty(key);
            }
        });
    }

    filterSpecialProperty(property) {
        let hasChange = false;
        let selectedValue;
        let propertyKeys = Object.keys(property);
        if (this.property.model && this.property.property) {
            selectedValue = this.property.model[this.property.property];
        } else if (this.property.value != null) {
            selectedValue = this.property.value;
        }
        propertyKeys.forEach(key => {
            if (key === 'onChange') {
                this.onChangeFunc = property[key];
                hasChange = true;
                property[key] = this.onChangeBind.bind(this);
            } else if (key === 'options') {
                let options = property[key];
                options.forEach(option => {
                    option.label = this.formatMessage({id: option.text});
                });
            } else if (key === 'placeholder') {
                property[key] = this.formatMessage({id: property[key]});
            }
        });
        if (!hasChange) {
            property.onChange = this.onChangeBind.bind(this);
        }
        property.value = selectedValue;
        return property;
    }

    onChangeBind(event) {
        let model = this.property.model;
        let property = this.property.property;
        this.value = event.value;
        if (model && property) {
            model[property] = event.value;
            this.property.value = model[property];
            this.setState({});
        } else {
            this.property.value = event.value;
            this.setState({});
        }
        this.onChangeFunc && this.onChangeFunc(event);
    }
}

SelectComp.propTypes = Object.assign(BaseInput.propTypes, {
    placeholder: React.PropTypes.string,
    parameters: React.PropTypes.array
});