'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 5/26/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Input = function (_BaseInput) {
    _inherits(Input, _BaseInput);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.setPropertyKeyList(_ConstantsProperty.INPUT_PROPERTY);
        return _this;
    }

    _createClass(Input, [{
        key: 'renderInput',
        value: function renderInput(property) {
            var className = null;
            if (!this.state.validated) {
                className = 'input-cus has-error';
                property.className = className;
            }

            return _react2.default.createElement(_reactBootstrap.FormControl, property);
        }
    }, {
        key: 'onBlurValidation',
        value: function onBlurValidation(event) {
            var result = void 0;
            result = this.onValidation(this.value);
            this.setState({ validated: result[0], invalidMessage: result[1] });

            if (this.property.vStatus) {
                this.property.vStatus(result[0]);
            }
            return result;
        }
    }, {
        key: 'onChangeValidation',
        value: function onChangeValidation(event) {
            var result = _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), 'onChangeValidation', this).call(this, event);
            if (this.property.vStatus) {
                this.property.vStatus(result[0]);
            }
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            var _this2 = this;

            var hasBlur = false,
                hasChange = false;
            var propertyKeys = Object.keys(property);
            propertyKeys.forEach(function (key) {
                if (key === 'placeholder') {
                    property[key] = _this2.formatMessage({ id: property[key] });
                } else if (key === 'onBlur') {
                    _this2.onBlurFunc = property[key];
                    hasBlur = true;
                    property[key] = _this2.onBlurHandler.bind(_this2);
                } else if (key === 'onChange') {
                    //this.onBlurFunc = property[key];
                    _this2.onChangeFunc = property[key];
                    hasChange = true;
                    property[key] = _this2.onChangeBind.bind(_this2);
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
    }]);

    return Input;
}(_BaseInput3.default);

exports.default = Input;


Input.propTypes = Object.assign(_BaseInput3.default.propTypes, {
    placeholder: _react2.default.PropTypes.string,
    max: _react2.default.PropTypes.string,
    min: _react2.default.PropTypes.string,
    maxLength: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string,
    vStatus: _react2.default.PropTypes.func
});