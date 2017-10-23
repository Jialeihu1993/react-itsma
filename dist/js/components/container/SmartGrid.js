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

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by hepen on 6/20/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SmartGrid = function (_BaseContainer) {
    _inherits(SmartGrid, _BaseContainer);

    function SmartGrid(props) {
        _classCallCheck(this, SmartGrid);

        var _this = _possibleConstructorReturn(this, (SmartGrid.__proto__ || Object.getPrototypeOf(SmartGrid)).call(this, props));

        var isCollapsed = _this.props.isCollapsed;

        _this.state = {
            isCollapsed: isCollapsed ? false : isCollapsed,
            title: ''
        };
        return _this;
    }

    _createClass(SmartGrid, [{
        key: 'renderChildren',
        value: function renderChildren(column, children) {
            var width = 12 / column;
            var rows = Math.ceil(children.length / column);
            var result = [],
                index = 0;
            for (var i = 0; i < rows; i++) {
                var row = [];
                for (var j = 0; j < column; j++) {
                    var child = children[index];
                    index++;
                    var className = null;
                    if (j === 0) {
                        className = 'itsma_no_padding_left';
                    } else if (j === column - 1) {
                        className = 'itsma_no_padding_right';
                    }
                    row.push(_react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: width, className: className },
                        child
                    ));
                }
                result.push(_react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    row
                ));
            }
            return result;
        }
    }, {
        key: 'renderComponent',
        value: function renderComponent(property) {
            var children = this.props.children;
            var inner = this.renderChildren(property.column, children);

            return _react2.default.createElement(
                _reactBootstrap.Grid,
                { className: 'itsma_no_padding' },
                inner
            );
        }
    }]);

    return SmartGrid;
}(_BaseContainer3.default);

exports.default = SmartGrid;


SmartGrid.propTypes = Object.assign(_BaseContainer3.default.propTypes, {
    column: _react2.default.PropTypes.number
});

SmartGrid.defaultProps = {
    column: 2
};