/**
 * Created by hepen on 5/26/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {BASE_PROPERTY, BASE_INPUT_PROPERTY_SINGLE} from '../contants/ConstantsProperty';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.property = {};
        const {formatMessage} = this.props.intl;
        this.formatMessage = formatMessage;

        this.setPropertyKeyList(BASE_PROPERTY);
        this.setSinglePropKeyList(BASE_INPUT_PROPERTY_SINGLE);
    }

    componentWillMount() {

    }

    render() {
        this.setProperty();
        if (this.property.visibility == false) return <template/>;

        let property = this.filterProperty();
        property = this.filterSpecialProperty(property);

        return this.renderComponent(property);
    }

    renderComponent(property) {

    }

    setProperty() {
        let allProps = this.props;
        let keys = Object.keys(allProps);
        keys.forEach(key => {
            this.property[key] = this.getProperty(key)
        })
    }

    getProperty(propertyName) {
        let property = this.props[propertyName];

        return property;
    }

    filterProperty() {
        let propertyKeys = Object.keys(this.property);
        propertyKeys = propertyKeys.filter(key => this.propKeyList.indexOf(key) >= 0);
        propertyKeys.forEach(key => {
            if (this.singlePropKeyList.indexOf(key) >= 0 && this.property[key] !== true) {
                delete this.property[key];
            }
        });
        return Object.assign({}, this.property);
    }

    filterSpecialProperty(property) {
        return property;
    }

    isFunction(func) {
        return typeof func === 'function';
    }

    setPropertyKeyList(properyKeyList) {
        this.propKeyList = properyKeyList;
    }

    setSinglePropKeyList(singlePropKeyList) {
        this.singlePropKeyList = singlePropKeyList;
    }
}

BaseComponent.propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    visible: React.PropTypes.bool
};

BaseComponent.defaultProps = {
    disabled: false,
    visible: true,

    onClick: () => {
    }
};