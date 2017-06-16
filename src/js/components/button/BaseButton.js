/**
 * Created by hepen on 6/6/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Button} from 'react-bootstrap';
import {BUTTON_PROPERTY} from '../../contants/ConstantsProperty';
import BaseComponent from '../BaseComponent';
import CssUtils from '../../utils/CssUtils';
import FormUtils from '../../utils/FormUtils';

export default class BaseButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onClickFunc;
        this.setPropertyKeyList(BUTTON_PROPERTY);
    }

    componentWillMount() {
        if (!this.buttonName) {
            this.buttonName = FormUtils.getButtonName();
            if (this.props.causeValidation === true){
                FormUtils.attachButtonToCurrentForm(this.buttonName, this);
            }
        }
    }

    renderComponent(property) {
        /*let property = {};
        let propertyKeys = Object.keys(this.property);
        propertyKeys = propertyKeys.filter(key => BUTTON_PROPERTY.indexOf(key) >= 0);
        propertyKeys.forEach(key => {
            property[key] = this.property[key];
        });*/

        let className = CssUtils.get('baseButton');

        return (
            <Button {...property} className={className}>{this.formatMessage({id: this.property.label})}</Button>
        )
    }

    filterSpecialProperty(property) {
        let hasClick = false;
        let propertyKeys = Object.keys(property);
        propertyKeys.forEach(key => {
            if (key === 'onClick') {
                this.onClickFunc = property[key];
                hasClick = true;
                property[key] = this.onClickValidation.bind(this);
            }
        });
        if (!hasClick) {
            property.onClick = this.onClickValidation.bind(this);
        }
        return property;
    }

    onClickValidation(event) {
        let result = true;
        if (this.property.causeValidation) {
            let formObj = FormUtils.findButtonByName(this.buttonName);
            let inputs = formObj.inputs;
            inputs.forEach(inputObj => {
                let input = inputObj.input;
                let validResult = input.onBlurValidation();
                if (!validResult[0]) result = false;
            });
        }
        result && this.onClickFunc(event);
    }
}

BaseButton.propTypes = Object.assign(BaseComponent.propTypes, {
    label: React.PropTypes.string,
    type: React.PropTypes.type,
    causeValidation: React.PropTypes.bool,

    onClick: React.PropTypes.func

});