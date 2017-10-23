'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _BaseContainer2 = require('./BaseContainer');

var _BaseContainer3 = _interopRequireDefault(_BaseContainer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/1/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CollapseSection = function (_BaseContainer) {
    _inherits(CollapseSection, _BaseContainer);

    function CollapseSection(props) {
        _classCallCheck(this, CollapseSection);

        var _this = _possibleConstructorReturn(this, (CollapseSection.__proto__ || Object.getPrototypeOf(CollapseSection)).call(this, props));

        var isCollapsed = _this.props.isCollapsed;

        _this.state = {
            isCollapsed: isCollapsed ? false : isCollapsed,
            title: ''
        };
        return _this;
    }

    _createClass(CollapseSection, [{
        key: '_hideHandler',
        value: function _hideHandler(event) {
            var toggleResult = true;
            if (this.props.onToggle) {
                toggleResult = this.props.onToggle(event);
            }
            if (toggleResult !== false) {
                // this.state.isCollapsed = !this.state.isCollapsed;
                this.setState({ isCollapsed: !this.state.isCollapsed });
            }
        }
    }, {
        key: '_iconStatus',
        value: function _iconStatus() {
            if (!this.state.isCollapsed) return 'glyphicon glyphicon-menu-down';
            return 'glyphicon glyphicon-menu-up';
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('span', { className: this._iconStatus() + ' itsma_collapseArrow', onClick: function onClick(event) {
                            return _this2._hideHandler(event);
                        } }),
                    _react2.default.createElement(
                        'span',
                        { className: 'itsma_titleBig' },
                        _react2.default.createElement(_reactIntl.FormattedMessage, { id: this.property.title, defaultMessage: this.property.title })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: true },
                    _react2.default.createElement('hr', null)
                ),
                this.renderChildren()
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            if (this.state.isCollapsed) {
                return null;
            }
            return _react2.default.createElement(
                'div',
                { className: 'itsma_collapseSection' },
                this.props.children
            );
        }
    }]);

    return CollapseSection;
}(_BaseContainer3.default);

exports.default = CollapseSection;


CollapseSection.propTypes = Object.assign(_BaseContainer3.default.propTypes, {
    title: _react2.default.PropTypes.string,
    isCollapsed: _react2.default.PropTypes.bool,

    onToggle: _react2.default.PropTypes.func
});