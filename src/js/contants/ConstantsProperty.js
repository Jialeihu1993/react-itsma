/**
 * Created by hepen on 5/26/2017.
 */
export const BASE_PROPERTY = ['name', 'style', 'className', 'disabled'];
export const INPUT_PROPERTY = ['checked', 'disabled', 'max', 'min', 'maxLength', 'name', 'placeholder', 'readOnly', 'type', 'value', 'onChange', 'onBlur', 'onFocus'].concat(BASE_PROPERTY);
export const INPUT_PROPERTY_SINGLE = ['checked', 'disabled', 'readOnly'];
export const FORM_PROPERTY = ['horizontal'].concat(BASE_PROPERTY);
export const BUTTON_PROPERTY = ['causeValidation', 'type'].concat(BASE_PROPERTY);