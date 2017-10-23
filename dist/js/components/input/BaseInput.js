'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('../BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _reactBootstrap = require('react-bootstrap');

var _FormUtils = require('../../utils/FormUtils');

var _FormUtils2 = _interopRequireDefault(_FormUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/12/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var BaseInput = function (_BaseComponent) {
    _inherits(BaseInput, _BaseComponent);

    function BaseInput(props) {
        _classCallCheck(this, BaseInput);

        var _this = _possibleConstructorReturn(this, (BaseInput.__proto__ || Object.getPrototypeOf(BaseInput)).call(this, props));

        _this.state = {
            validated: true,
            invalidMessage: null
        };
        _this.onBlurFunc;
        _this.onChangeFunc;
        _this.value;
        _this.onBlurValidation = _this.onBlurValidation;
        return _this;
    }

    _createClass(BaseInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _FormUtils2.default.attachInputToCurrentForm(null, this);
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {
            return _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: this.property.id, className: this.state.validated ? '' : 'has-error ' },
                this.renderLabel(),
                this.renderInput(property),
                this.renderInvalidation()
            );
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var className = 'itsma_inputTitle';
            if (!this.state.validated) {
                className += ' itsma_has-error';
            }
            if (this.property.label) {
                return _react2.default.createElement(
                    'div',
                    { className: 'itsma_cusMargin15' },
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.ControlLabel,
                            { className: className },
                            this.formatMessage({ id: this.property.label }),
                            this.property.required === true ? _react2.default.createElement(
                                'span',
                                { className: 'itsma_mandatory' },
                                '*'
                            ) : null
                        )
                    )
                );
            }
            return null;
        }
    }, {
        key: 'renderInput',
        value: function renderInput(property) {
            return null;
        }
    }, {
        key: 'renderInvalidation',
        value: function renderInvalidation() {
            var message = '';
            if (!this.state.validated) message = this.state.invalidMessage || 'Please provide a value for this field';
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactBootstrap.HelpBlock,
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'itsma_has-error' },
                        message
                    )
                )
            );
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            var _this2 = this;

            var hasChange = false;
            var propertyKeys = Object.keys(property);
            propertyKeys.forEach(function (key) {
                if (key === 'onChange') {
                    _this2.onChangeFunc = property[key];
                    hasChange = true;
                    property[key] = _this2.onChangeBind.bind(_this2);
                }
            });
            if (!hasChange) {
                property.onChange = this.onChangeBind.bind(this);
            }
            return property;
        }
    }, {
        key: 'onValidation',
        value: function onValidation(value) {
            var valResult = [true, null];
            if (this.property.validateFunc) {
                var result = this.property.validateFunc(value);
                if (!result) {
                    valResult = [false, this.property.validationMessage ? this.formatMessage({ id: this.property.validationMessage }) : 'The value is not valid'];
                }
            } else {
                if (this.property.required === true) {
                    var _result = value != null && value != '';
                    if (!_result) {
                        valResult = [false, null];
                    }
                }
            }
            return valResult;
        }
    }, {
        key: 'onBlurValidation',
        value: function onBlurValidation(event) {
            var result = void 0;
            result = this.onValidation(this.value);
            this.setState({ validated: result[0], invalidMessage: result[1] });
            return result;
        }
    }, {
        key: 'onBlurHandler',
        value: function onBlurHandler(event) {
            var result = this.onBlurValidation(event);
            this.onBlurFunc && this.onBlurFunc(event);
            return result;
        }
    }, {
        key: 'onChangeBind',
        value: function onChangeBind(event) {
            var model = this.property.model;
            var property = this.property.property;
            this.value = event.target.value;
            if (model && property) {
                model[property] = event.target.value;
                this.property.value = model[property];
                this.setState({});
            }
            this.onChangeFunc && this.onChangeFunc(event);
        }
    }, {
        key: 'getProperty',
        value: function getProperty(propertyName) {
            var property = void 0;
            if (propertyName === 'value' && this.props.model && this.props.property) {
                property = this.props.model[this.props.property];
                this.value = this.props.model[this.props.property];
            } else if (propertyName === 'value') {
                property = this.props[propertyName];
                this.value = property;
            } else {
                property = this.props[propertyName];
            }
            return property;
        }
    }]);

    return BaseInput;
}(_BaseComponent3.default);

exports.default = BaseInput;


BaseInput.propTypes = Object.assign(_BaseComponent3.default.propTypes, {
    value: _react2.default.PropTypes.node,
    label: _react2.default.PropTypes.string,
    required: _react2.default.PropTypes.bool,
    readOnly: _react2.default.PropTypes.bool,
    validationMessage: _react2.default.PropTypes.string,
    model: _react2.default.PropTypes.object,
    property: _react2.default.PropTypes.string,

    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    validateFunc: _react2.default.PropTypes.func
});