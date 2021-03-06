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

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/14/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CheckboxComp = function (_BaseInput) {
    _inherits(CheckboxComp, _BaseInput);

    function CheckboxComp(props) {
        _classCallCheck(this, CheckboxComp);

        var _this = _possibleConstructorReturn(this, (CheckboxComp.__proto__ || Object.getPrototypeOf(CheckboxComp)).call(this, props));

        _this.setPropertyKeyList(_ConstantsProperty.CHECKBOX_PROPERTY);
        _this.tempValue = [];
        return _this;
    }

    _createClass(CheckboxComp, [{
        key: 'renderInput',
        value: function renderInput(property) {
            var className = null;
            if (!this.state.validated) {
                className = 'itsma_has-error';
                property.className = className;
            }

            var radioComp = this.renderByParameter(property);

            return radioComp;
        }
    }, {
        key: 'renderByParameter',
        value: function renderByParameter(property) {
            var _this2 = this;

            var parameters = this.property.parameters;

            var checkedValue = void 0;
            if (!parameters) return;
            if (this.property.model && this.property.property) {
                checkedValue = this.property.model[this.property.property];
            } else if (this.property.value != null) {
                checkedValue = this.property.value;
            }

            var className = '';
            if (!this.state.validated) {
                className += 'itsma_has-error';
            }

            this.tempValue = [];
            var result = parameters.map(function (param) {
                var labelClassName = 'itsma_checkbox_icon';
                var checked = checkedValue && checkedValue.indexOf(param.value) >= 0 ? 'checked' : '';
                var radioProps = Object.assign({}, property);
                if (checked === 'checked') {
                    radioProps.checked = true;
                    labelClassName += ' itsma_checked';
                }
                delete radioProps.value;
                delete radioProps.className;
                _this2.tempValue.push({ value: param.value, checked: checked === 'checked' });
                return _react2.default.createElement(
                    'span',
                    { className: 'itsma_radio_wrapper' },
                    _react2.default.createElement('label', _extends({ className: labelClassName, value: param.value }, radioProps)),
                    _react2.default.createElement(_reactBootstrap.Checkbox, { className: 'itsma_radio', value: param.value }),
                    _react2.default.createElement(
                        'span',
                        { className: className },
                        param.text
                    )
                );
            });
            return result;
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            var _this3 = this;

            var hasClick = false;
            var propertyKeys = Object.keys(property);
            propertyKeys.forEach(function (key) {
                if (key === 'onClick') {
                    _this3.onClickFunc = property[key];
                    hasClick = true;
                    property[key] = _this3.onChangeBind.bind(_this3);
                }
            });
            if (!hasClick) {
                property.onClick = this.onChangeBind.bind(this);
            }
            return property;
        }
    }, {
        key: 'onChangeBind',
        value: function onChangeBind(event) {
            var model = this.property.model;
            var property = this.property.property;
            var checked = true;
            this.tempValue.forEach(function (tempV) {
                if (tempV.value === event.target.attributes[1].value) {
                    checked = !tempV.checked;
                }
            });
            var value = null;
            if (checked) {
                value = this.insertValue(event.target.attributes[1].value);
            } else {
                value = this.removeValue(event.target.attributes[1].value);
            }
            this.value = value;
            if (model && property) {
                if (!model[property]) model[property] = [];
                model[property] = value;
                this.property.value = model[property];
                this.setState({});
            }
            this.onChangeFunc && this.onChangeFunc(event);
        }
    }, {
        key: 'insertValue',
        value: function insertValue(value) {
            var result = [];
            this.tempValue.forEach(function (tempV) {
                if (tempV.value === value) {
                    tempV.checked = true;
                }
                if (tempV.checked) {
                    result.push(tempV.value);
                }
            });
            return result;
        }
    }, {
        key: 'removeValue',
        value: function removeValue(value) {
            var result = [];
            this.tempValue.forEach(function (tempV) {
                if (tempV.value === value) {
                    tempV.checked = false;
                }
                if (tempV.checked) {
                    result.push(tempV.value);
                }
            });
            return result;
        }
    }]);

    return CheckboxComp;
}(_BaseInput3.default);

exports.default = CheckboxComp;


CheckboxComp.propTypes = Object.assign(_BaseInput3.default.propTypes, {
    inline: _react2.default.PropTypes.bool,
    parameters: _react2.default.PropTypes.array
});