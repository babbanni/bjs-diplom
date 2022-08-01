"use strict"

const logoutBtn = new LogoutButton();

logoutBtn.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
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
            this.setMessage(false, response.error);
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
            this.setMessage(false, response.error);
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
            this.setMessage(false, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

favoritesWidget.getFavoritesCallback = function() {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
        } else {
            this.updateUsersList(response.data);
        }

    });
}

favoritesWidget.getFavoritesCallback();

favoritesWidget.addUserCallback = function(data) {
    let name = data.name;
    let id = data.id;
    ApiConnector.addUserToFavorites({ id, name }, response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
            this.setMessage(true, 'Пользователь успешно добавлен!');
        } else {
            this.setMessage(false, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    let id = data.id;
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
            this.setMessage(true, 'Пользователь успешно удален!');
        } else {
            this.setMessage(false, response.error);
        }
    });
}