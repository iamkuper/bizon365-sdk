var ApiClient = require('apiapi');
var request = require('axios');

var REQUEST_DELAY = 500;

//Delay request for ~1sec
function delayedRequest () {
	var args = arguments;
	return new Promise(function (resolve, reject) {
		setTimeout(function callRequest () {
			return request.apply(request, args)
				.then(resolve)
				.catch(reject);
		}, REQUEST_DELAY);
	});
}

module.exports = function buildClient () {
	
	var client = new ApiClient({
		baseUrl: 'https://online.bizon365.ru/api/v1',
		methods: {

			// Авторизация
			auth: 'post /auth/login',
			logout: 'post /auth/logout',

			// Отчеты
			getReportList: 'get /webinars/reports/getlist',
			getReport: 'get /webinars/reports/get',

			// @alias getReport
			getViewers: 'get /webinars/reports/getviewers',

			// Страницы регистрации
			getSubpages: 'get /webinars/subpages/getSubpages',
			getSubscribers: 'get /webinars/subpages/getSubscribers', 

			// Управление подписчиками
			addSubscriber: 'post /webinars/subpages/addSubscriber',
			removeSubscriber: 'post /webinars/subpages/removeSubscriber',

			// Заказы
			getOrders: 'get /kassa/orders/getorders',

			// Курсы
			addStudent: 'post /course/student/add'

		},

		required: {
			auth: ['username', 'password'],
			getReport: ['webinarId'],
			getViewers: ['webinarId'],
			getSubscribers: ['pageId'],
			addSubscriber: ['pageId', 'email', 'time'],
			removeSubscriber: ['pageId', 'email'],
			addStudent: ['username', 'email']
		},

		transformRequest: {},
		transformResponse: {
			auth: storeAuth
		}
	});

	client.request = delayedRequest;


	return client;
};

function storeAuth (res) {
	var cookies = res.headers['set-cookie'];

	if (!cookies) {
		throw new Error('Bizon365 auth failed');
	}

	this.headers.Cookie = cookies.map(parseCookie).join('; ');
	return res.data;

	function parseCookie (cookieHeader) {
		return cookieHeader.split(';')[0];
	}
}
