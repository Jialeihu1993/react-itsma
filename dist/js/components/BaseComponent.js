'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ConstantsProperty = require('../contants/ConstantsProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 5/26/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var BaseComponent = function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    function BaseComponent(props) {
        _classCallCheck(this, BaseComponent);

        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

        _this.property = {};
        var formatMessage = _this.props.intl.formatMessage;

        _this.formatMessage = formatMessage;

        _this.setPropertyKeyList(_ConstantsProperty.BASE_PROPERTY);
        _this.setSinglePropKeyList(_ConstantsProperty.BASE_INPUT_PROPERTY_SINGLE);
        return _this;
    }

    _createClass(BaseComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'render',
        value: function render() {
            this.setProperty();
            if (this.property.visibility == false) return _react2.default.createElement('template', null);

            var property = this.filterProperty();
            property = this.filterSpecialProperty(property);

            return this.renderComponent(property);
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {}
    }, {
        key: 'setProperty',
        value: function setProperty() {
            var _this2 = this;

            var allProps = this.props;
            var keys = Object.keys(allProps);
            keys.forEach(function (key) {
                _this2.property[key] = _this2.getProperty(key);
            });
        }
    }, {
        key: 'getProperty',
        value: function getProperty(propertyName) {
            var property = this.props[propertyName];

            return property;
        }
    }, {
        key: 'filterProperty',
        value: function filterProperty() {
            var _this3 = this;

            var propertyKeys = Object.keys(this.property);
            propertyKeys = propertyKeys.filter(function (key) {
                return _this3.propKeyList.indexOf(key) >= 0;
            });
            propertyKeys.forEach(function (key) {
                if (_this3.singlePropKeyList.indexOf(key) >= 0 && _this3.property[key] !== true) {
                    delete _this3.property[key];
                }
            });
            return Object.assign({}, this.property);
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            return property;
        }
    }, {
        key: 'isFunction',
        value: function isFunction(func) {
            return typeof func === 'function';
        }
    }, {
        key: 'setPropertyKeyList',
        value: function setPropertyKeyList(properyKeyList) {
            this.propKeyList = properyKeyList;
        }
    }, {
        key: 'setSinglePropKeyList',
        value: function setSinglePropKeyList(singlePropKeyList) {
            this.singlePropKeyList = singlePropKeyList;
        }
    }]);

    return BaseComponent;
}(_react2.default.Component);

exports.default = BaseComponent;


BaseComponent.propTypes = {
    id: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    disabled: _react2.default.PropTypes.bool,
    visible: _react2.default.PropTypes.bool
};

BaseComponent.defaultProps = {
    disabled: false,
    visible: true,

    onClick: function onClick() {}
};