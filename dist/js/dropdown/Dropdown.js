'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../styles/select.css');

var _Select = require('./select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown(props) {
		_classCallCheck(this, Dropdown);

		var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

		_this.value = props.value.toString();
		return _this;
	}

	_createClass(Dropdown, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			this.value = newProps.value.toString();
		}
	}, {
		key: 'onChange',
		value: function onChange(newValue) {
			if (this.props.onChange) {
				this.props.onChange({ value: newValue });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var property = Object.assign({}, this.props);
			if (property.disabled == null) {
				property.disabled = false;
			}
			if (property.clearable == null) {
				property.clearable = false;
			}
			if (property.searchable == null) {
				property.searchable = false;
			}
			return _react2.default.createElement(_Select2.default, property);
		}
	}]);

	return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {};

exports.default = Dropdown;