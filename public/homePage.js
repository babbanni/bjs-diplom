"use strict"

const logoutBtn = new LogoutButton();

logoutBtn.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

ratesBoard.exchangeRate = function() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
        }
    })
}
ratesBoard.exchangeRate();
setInterval(() => ratesBoard.exchangeRate(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    let currency = data.currency;
    let amount = data.amount;
    ApiConnector.addMoney({ currency, amount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(true, 'Баланс пополнен!');
        } else {
            this.setMessage(false, 'Баланс не был полнен! (Проверьте введенный вами данные)');
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    let fromCurrency = data.fromCurrency;
    let targetCurrency = data.targetCurrency;
    let fromAmount = data.fromAmount;

    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(true, 'Конвертирование успешно!');
        } else {
            this.setMessage(false, 'Конвертирование невозможно! (Проверьте введенный вами данные)');
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    let to = data.to;
    let currency = data.currency;
    let amount = data.amount;
    ApiConnector.transferMoney({ to, currency, amount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            this.setMessage(true, 'Перевод успешен!');
        } else {
            this.setMessage(false, 'Перевод не был выполнен! (Проверьте введенный вами данные)');
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        this.clearTable();
        this.fillTable(response.data);
    }
    this.updateUsersList(response.data);
});