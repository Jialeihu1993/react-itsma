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

var _Dropdown = require('../../dropdown/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/14/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectComp = function (_BaseInput) {
    _inherits(SelectComp, _BaseInput);

    function SelectComp(props) {
        _classCallCheck(this, SelectComp);

        var _this = _possibleConstructorReturn(this, (SelectComp.__proto__ || Object.getPrototypeOf(SelectComp)).call(this, props));

        _this.setPropertyKeyList(_ConstantsProperty.SELECT_PROPERTY);
        _this.tempValue = [];
        return _this;
    }

    _createClass(SelectComp, [{
        key: 'renderInput',
        value: function renderInput(property) {
            var className = null;
            if (!this.state.validated) {
                className = 'input-cus itsma_has-error';
                property.className = className;
            }
            return _react2.default.createElement(_Dropdown2.default, property);
        }
    }, {
        key: 'setProperty',
        value: function setProperty() {
            var _this2 = this;

            var allProps = this.props;
            var keys = Object.keys(allProps);
            keys.forEach(function (key) {
                if (key === 'parameters') {
                    _this2.property['options'] = _this2.getProperty(key);
                } else {
                    _this2.property[key] = _this2.getProperty(key);
                }
            });
        }
    }, {
        key: 'filterSpecialProperty',
        value: function filterSpecialProperty(property) {
            var _this3 = this;

            var hasChange = false;
            var selectedValue = void 0;
            var propertyKeys = Object.keys(property);
            if (this.property.model && this.property.property) {
                selectedValue = this.property.model[this.property.property];
            } else if (this.property.value != null) {
                selectedValue = this.property.value;
            }
            propertyKeys.forEach(function (key) {
                if (key === 'onChange') {
                    _this3.onChangeFunc = property[key];
                    hasChange = true;
                    property[key] = _this3.onChangeBind.bind(_this3);
                } else if (key === 'options') {
                    var options = property[key];
                    options.forEach(function (option) {
                        option.label = _this3.formatMessage({ id: option.text });
                    });
                } else if (key === 'placeholder') {
                    property[key] = _this3.formatMessage({ id: property[key] });
                }
            });
            if (!hasChange) {
                property.onChange = this.onChangeBind.bind(this);
            }
            property.value = selectedValue;
            return property;
        }
    }, {
        key: 'onChangeBind',
        value: function onChangeBind(event) {
            var model = this.property.model;
            var property = this.property.property;
            this.value = event.value;
            if (model && property) {
                model[property] = event.value;
                this.property.value = model[property];
                this.setState({});
            }
            this.onChangeFunc && this.onChangeFunc(event);
        }
    }]);

    return SelectComp;
}(_BaseInput3.default);

exports.default = SelectComp;


SelectComp.propTypes = Object.assign(_BaseInput3.default.propTypes, {
    placeholder: _react2.default.PropTypes.string,
    parameters: _react2.default.PropTypes.array
});