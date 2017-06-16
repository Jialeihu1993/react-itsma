/**
 * Created by hepen on 6/6/2017.
 */
let FormUtils = function() {
    let formIndex = 0;
    let buttonIndex = 0;
    let formList = [];
    let currentForm = null;

    let addForm = function(name, form) {
        let formObj = {
            name,
            form,
            inputs: [],
            buttons: []
        };
        formList.push(formObj);
    };

    let setCurrentForm = function(name) {
        if (name) currentForm = name;
        else currentForm = null;
    };

    let getFormName = function() {
        let name = 'form' + formIndex++;
        return name;
    };

    let getButtonName = function() {
        let name = 'button' + buttonIndex++;
        return name;
    };

    let attachInputToCurrentForm = function(name, input) {
        let formObj = formList.find(form => form.name === currentForm);
        if (formObj) {
            formObj.inputs.push({name: name, input: input})
        }
    };

    let attachButtonToCurrentForm = function(name, button) {
        let formObj = formList.find(form => form.name === currentForm);
        if (formObj) {
            formObj.buttons.push({name: name, input: button})
        }
    };

    let findButtonByName = function(buttonName){
        let result = formList.find(formObj => {
            let buttons = formObj.buttons;
            let buttonFounded = buttons.find(buttonObj => buttonObj.name === buttonName);
            if (buttonFounded) return true;
        });
        return result;
    };

    let removeForm = function(formName) {
        let index = formList.findIndex(formObj => {
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
    }

}();

module.exports = FormUtils;
