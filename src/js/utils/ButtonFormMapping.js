/**
 * Created by hepen on 6/6/2017.
 */
let ButtonFormMapping = function() {
    let formMapping = new Map();
    let formId = 0;

    let addButtonForm = function(button, form) {
        formMapping.set(button, form);
    };

    let getFormByButton = function(button) {
        return formMapping.get(button)
    };

    let getAll = function() {
        return formMapping;
    };

    return {
        addButtonForm: addButtonForm,
        get: getFormByButton,
        getAll: getAll
    }
}();

module.exports = ButtonFormMapping;
