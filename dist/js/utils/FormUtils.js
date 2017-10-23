'use strict';

/**
 * Created by hepen on 6/6/2017.
 */
var FormUtils = function () {
    var formIndex = 0;
    var buttonIndex = 0;
    var formList = [];
    var currentForm = null;

    var addForm = function addForm(name, form) {
        var formObj = {
            name: name,
            form: form,
            inputs: [],
            buttons: []
        };
        formList.push(formObj);
    };

    var setCurrentForm = function setCurrentForm(name) {
        if (name) currentForm = name;else currentForm = null;
    };

    var getFormName = function getFormName() {
        var name = 'form' + formIndex++;
        return name;
    };

    var getButtonName = function getButtonName() {
        var name = 'button' + buttonIndex++;
        return name;
    };

    var attachInputToCurrentForm = function attachInputToCurrentForm(name, input) {
        var formObj = formList.find(function (form) {
            return form.name === currentForm;
        });
        if (formObj) {
            formObj.inputs.push({ name: name, input: input });
        }
    };

    var attachButtonToCurrentForm = function attachButtonToCurrentForm(name, button) {
        var formObj = formList.find(function (form) {
            return form.name === currentForm;
        });
        if (formObj) {
            formObj.buttons.push({ name: name, input: button });
        }
    };

    var findButtonByName = function findButtonByName(buttonName) {
        var result = formList.find(function (formObj) {
            var buttons = formObj.buttons;
            var buttonFounded = buttons.find(function (buttonObj) {
                return buttonObj.name === buttonName;
            });
            if (buttonFounded) return true;
        });
        return result;
    };

    var removeForm = function removeForm(formName) {
        var index = formList.findIndex(function (formObj) {
            return formName === formObj.name;
        });
        formList.splice(index, 1);
    };

    return {
        addForm: addForm,
        setCurrentForm: setCurrentForm,
        getFormName: getFormName,
        attachInputToCurrentForm: attachInputToCurrentForm,
        getButtonName: getButtonName,
        attachButtonToCurrentForm: attachButtonToCurrentForm,
        findButtonByName: findButtonByName,
        removeForm: removeForm
    };
}();

module.exports = FormUtils;