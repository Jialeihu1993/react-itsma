'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _BaseContainer2 = require('./BaseContainer');

var _BaseContainer3 = _interopRequireDefault(_BaseContainer2);

var _ConstantsProperty = require('../../contants/ConstantsProperty');

var _FormUtils = require('../../utils/FormUtils');

var _FormUtils2 = _interopRequireDefault(_FormUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/6/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormContainer = function (_BaseContainer) {
    _inherits(FormContainer, _BaseContainer);

    function FormContainer(props) {
        _classCallCheck(this, FormContainer);

        var _this = _possibleConstructorReturn(this, (FormContainer.__proto__ || Object.getPrototypeOf(FormContainer)).call(this, props));

        _this.setPropertyKeyList(_ConstantsProperty.FORM_PROPERTY);
        _this.state = {};
        return _this;
    }

    _createClass(FormContainer, [{
        key: 'processChildButton',
        value: function processChildButton(node) {
            var _this2 = this;

            if (!node) node = this;
            var children = node.props.children;

            if (!children) return;

            if (children instanceof Array) {
                children.forEach(function (child) {
                    if ((typeof child.type === 'string' && child.type === 'BaseButton' || typeof child.type === 'function' && child.type.displayName && child.type.displayName.indexOf('(BaseButton)') >= 0) && child.props.causeValidation === true) {
                        debugger;
                        // ButtonFormMapping.addButtonForm(child, this);
                    } else {
                        _this2.processChildButton(child);
                    }
                });
            } else {
                var child = children;
                if ((typeof child.type === 'string' && child.type === 'BaseButton' || typeof child.type === 'function' && child.type.displayName.indexOf('(BaseButton)') >= 0) && child.props.causeValidation === true) {
                    debugger;
                    // ButtonFormMapping.addButtonForm(child, this);
                } else {
                    this.processChildButton(child);
                }
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!this.formName) {
                this.formName = _FormUtils2.default.getFormName();
                _FormUtils2.default.addForm(this.formName, this);
            }
            _FormUtils2.default.setCurrentForm(this.formName);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            if (!this.formName) {
                this.formName = _FormUtils2.default.getFormName();
                _FormUtils2.default.addForm(this.formName, this);
            }
            _FormUtils2.default.setCurrentForm(this.formName);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _FormUtils2.default.setCurrentForm(null);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _FormUtils2.default.setCurrentForm(null);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _FormUtils2.default.removeForm(this.formName);
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {
            return _react2.default.createElement(
                _reactBootstrap.Form,
                property,
                this.props.children
            );
        }
    }]);

    return FormContainer;
}(_BaseContainer3.default);

exports.default = FormContainer;


FormContainer.propTypes = Object.assign(_BaseContainer3.default.propTypes, {
    horizontal: _react2.default.PropTypes.bool
});