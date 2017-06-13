/**
 * Created by hepen on 6/6/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Button} from 'react-bootstrap';
import {BUTTON_PROPERTY} from '../../contants/ConstantsProperty';
import BaseComponent from '../BaseComponent';
import ButtonFromMapping from '../../utils/ButtonFormMapping';
import CssUtils from '../../utils/CssUtils';

export default class BaseButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    renderComponent() {
        let property = {};
        let propertyKeys = Object.keys(this.property);
        propertyKeys = propertyKeys.filter(key => BUTTON_PROPERTY.indexOf(key) >= 0);
        propertyKeys.forEach(key => {
            property[key] = this.property[key];
        });

        let className = CssUtils.get('baseButton');

        return (
            <Button {...property} className={className}>{this.formatMessage({id: this.property.label})}</Button>
        )
    }

    onClickValidation(event) {
        let form = ButtonFromMapping.get(this);
        let self = this;
        if(this.property.onClick){
            return this.property.onClick(event);
        }
    }
}

BaseButton.propTypes = Object.assign(BaseComponent.propTypes, {
    label: React.PropTypes.string,
    type: React.PropTypes.type,
    causeValidation: React.PropTypes.bool,

    onClick: React.PropTypes.func

});