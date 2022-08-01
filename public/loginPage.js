"use strict"
const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    let login = data.login;
    let password = data.password;

    ApiConnector.login({ login, password }, response => {
        if (response.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(response.error);
        }
    });
}

userForm.registerFormCallback = function(data) {
    let login = data.login;
    let password = data.password;

    ApiConnector.register({ login, password }, response => {
        if (response.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(response.error);
        }
    })
}