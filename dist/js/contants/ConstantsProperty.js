'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hepen on 5/26/2017.
 */
var BASE_PROPERTY = exports.BASE_PROPERTY = ['name', 'style', 'className', 'disabled'];
var BASE_INPUT_PROPERTY = exports.BASE_INPUT_PROPERTY = ['disabled', 'name', 'readOnly', 'value', 'onChange', 'onBlur', 'onFocus'].concat(BASE_PROPERTY);
var BASE_INPUT_PROPERTY_SINGLE = exports.BASE_INPUT_PROPERTY_SINGLE = ['checked', 'disabled', 'readOnly', 'multiple'];
var INPUT_PROPERTY = exports.INPUT_PROPERTY = ['max', 'min', 'maxLength', 'placeholder', 'type', 'vStatus'].concat(BASE_INPUT_PROPERTY);
var RADIO_PROPERTY = exports.RADIO_PROPERTY = ['checked', 'inline'].concat(BASE_INPUT_PROPERTY);
var CHECKBOX_PROPERTY = exports.CHECKBOX_PROPERTY = ['checked', 'inline'].concat(BASE_INPUT_PROPERTY);
var SELECT_PROPERTY = exports.SELECT_PROPERTY = ['multiple', 'options'].concat(BASE_INPUT_PROPERTY);
var TOGGLE_PROPERTY = exports.TOGGLE_PROPERTY = [].concat(BASE_INPUT_PROPERTY);

var FORM_PROPERTY = exports.FORM_PROPERTY = ['horizontal'].concat(BASE_PROPERTY);
var BUTTON_PROPERTY = exports.BUTTON_PROPERTY = ['causeValidation', 'type', 'onClick'].concat(BASE_PROPERTY);