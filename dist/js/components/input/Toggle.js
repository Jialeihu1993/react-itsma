'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/15/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ToggleComp = function (_BaseInput) {
    _inherits(ToggleComp, _BaseInput);

    function ToggleComp(props) {
        _classCallCheck(this, ToggleComp);

        var _this = _possibleConstructorReturn(this, (ToggleComp.__proto__ || Object.getPrototypeOf(ToggleComp)).call(this, props));

        _this.setPropertyKeyList(_ConstantsProperty.TOGGLE_PROPERTY);
        _this.state.isToggleOn = true;
        return _this;
    }

    _createClass(ToggleComp, [{
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
                    { className: 'itsma_toggle_div' },
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
            var className = null;
            if (!this.state.validated) {
                className = 'itsma_has-error';
                property.className = className;
            }

            if (this.property.model && this.property.property) {
                this.state.isToggleOn = this.property.model[this.property.property];
            } else if (this.property.value != null) {
                this.state.isToggleOn = this.property.value;
            }

            return _react2.default.createElement(
                'div',
                { className: 'itsma_toggle_div', style: { paddingLeft: '100px' }, onClick: this.onChangeBind.bind(this) },
                _react2.default.createElement('input', { type: 'checkbox', className: 'itsma_toggle_input', checked: this.state.isToggleOn }),
                _react2.default.createElement('label', { className: 'itsma_toggle_label' })
            );
        }
    }, {
        key: 'onChangeBind',
        value: function onChangeBind(event) {
            var model = this.property.model;
            var property = this.property.property;
            var isToggleOn = !this.state.isToggleOn;
            this.value = isToggleOn;
            if (model && property) {
                model[property] = isToggleOn;
                this.property.value = model[property];
            }
            this.setState({ isToggleOn: isToggleOn });
            this.onChangeFunc && this.onChangeFunc(event);
        }
    }]);

    return ToggleComp;
}(_BaseInput3.default);

exports.default = ToggleComp;


ToggleComp.propTypes = Object.assign(_BaseInput3.default.propTypes, {});