'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Button = require('../src/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;


describe('Button', function () {
  it('should show the given text', function () {
    var text = 'The Text';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _Button2.default,
      null,
      text
    ));
    (0, _chai.expect)(wrapper.text()).to.be.equal(text);
  });

  it('should handle the click event', function () {
    var clickMe = _sinon2.default.stub();
    // Here we do a JSDOM render. So, that's why we need to
    // wrap this with a div.
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Button2.default,
        { onClick: clickMe },
        'ClickMe'
      )
    ));

    wrapper.find('button').simulate('click');
    (0, _chai.expect)(clickMe.callCount).to.be.equal(1);
  });
});