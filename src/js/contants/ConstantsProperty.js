/**
 * Created by hepen on 5/26/2017.
 */
export const BASE_PROPERTY = ['name', 'style', 'className', 'disabled'];
export const BASE_INPUT_PROPERTY = ['disabled', 'name', 'readOnly', 'value', 'onChange', 'onBlur', 'onFocus'].concat(BASE_PROPERTY);
export const BASE_INPUT_PROPERTY_SINGLE = ['checked', 'disabled', 'readOnly', 'multiple'];
export const INPUT_PROPERTY = ['max', 'min', 'maxLength', 'placeholder', 'type'].concat(BASE_INPUT_PROPERTY);
export const RADIO_PROPERTY = ['checked', 'inline'].concat(BASE_INPUT_PROPERTY);
export const CHECKBOX_PROPERTY = ['checked', 'inline'].concat(BASE_INPUT_PROPERTY);
export const SELECT_PROPERTY = ['multiple'].concat(BASE_INPUT_PROPERTY);
export const TOGGLE_PROPERTY = [].concat(BASE_INPUT_PROPERTY);


export const FORM_PROPERTY = ['horizontal'].concat(BASE_PROPERTY);
export const BUTTON_PROPERTY = ['causeValidation', 'type', 'onClick'].concat(BASE_PROPERTY);