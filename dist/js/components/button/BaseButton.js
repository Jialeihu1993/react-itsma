'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _reactBootstrap = require('react-bootstrap');

var _ConstantsProperty = require('../../contants/ConstantsProperty');

var _BaseComponent2 = require('../BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _FormUtils = require('../../utils/FormUtils');

var _FormUtils2 = _interopRequireDefault(_FormUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/6/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var BaseButton = function (_BaseComponent) {
    _inherits(BaseButton, _BaseComponent);

    function BaseButton(props) {
        _classCallCheck(this, BaseButton);

        var _this = _possibleConstructorReturn(this, (BaseButton.__proto__ || Object.getPrototypeOf(BaseButton)).call(this, props));

        _this.state = {};
        _this.onClickFunc;
        _this.setPropertyKeyList(_ConstantsProperty.BUTTON_PROPERTY);
        return _this;
    }

    _createClass(BaseButton, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!this.buttonName) {
                this.buttonName = _FormUtils2.default.getButtonName();
                if (this.props.causeValidation === true) {
                    _FormUtils2.default.attachButtonToCurrentForm(this.buttonName, this);
                }
            }
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {
            /*let property = {};
            let propertyKeys = Object.keys(this.property);
            propertyKeys = propertyKeys.filter(key => BUTTON_PROPERTY.indexOf(key) >= 0);
            propertyKeys.forEach(key => {
                property[key] = this.property[key];
            });*/

            var className = 'itsma_baseButton';

            return _react2.default.createElement(
                _reactBootstrap.FormGroup,
                null,
                _react2.default.createElement(
                    _reactBootstrap.Button,
                    _extends({}, property, { className: className }),
                    this.formatMessage({ id: this.property.label })
                )
            );
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            var _this2 = this;

            var hasClick = false;
            var propertyKeys = Object.keys(property);
            propertyKeys.forEach(function (key) {
                if (key === 'onClick') {
                    _this2.onClickFunc = property[key];
                    hasClick = true;
                    property[key] = _this2.onClickValidation.bind(_this2);
                }
            });
            if (!hasClick) {
                property.onClick = this.onClickValidation.bind(this);
            }
            return property;
        }
    }, {
        key: 'onClickValidation',
        value: function onClickValidation(event) {
            var result = true;
            if (this.property.causeValidation) {
                var formObj = _FormUtils2.default.findButtonByName(this.buttonName);
                var inputs = formObj.inputs;
                inputs.forEach(function (inputObj) {
                    var input = inputObj.input;
                    var validResult = input.onBlurValidation();
                    if (!validResult[0]) result = false;
                });
            }
            result && this.onClickFunc(event);
        }
    }]);

    return BaseButton;
}(_BaseComponent3.default);

exports.default = BaseButton;


BaseButton.propTypes = Object.assign(_BaseComponent3.default.propTypes, {
    label: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.type,
    causeValidation: _react2.default.PropTypes.bool,

    onClick: _react2.default.PropTypes.func

});