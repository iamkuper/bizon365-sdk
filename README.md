## Bizon365 API client for NodeJS

Simplified API client for [Bizon365](https://blog.bizon365.ru/api/v1/).


## Usage

```javascript
const Bizon356 = require('bizon365-sdk');
const bizon = new Bizon365();

(async function () {

	const bizon = new Bizon365();

	// Авторизация в Bizon365
	await bizon.auth({ username: BIZON_LOGIN, password: BIZON_PASS })
		.then(() => console.info('[Bizon365] Авторизация... [OK]'))
		.catch(() => console.error('[Bizon365] Авторизация... [ERROR]'));


})();
```

## License

MIT
