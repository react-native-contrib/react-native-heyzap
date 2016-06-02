# react-native-heyzap

![Heyzap logo](https://d2jks9au6e6w94.cloudfront.net/assets/new_dashboard/heybar-logo.png)

[![npm version][ico-npm]][link-npm]
[![License][ico-license]](LICENSE.md)
[![Travis CI][ico-travis]][link-travis]
[![Code Climate][ico-codeclimate]][link-codeclimate]
[![Code Coverage][ico-code-coverage]][link-code-coverage]
[![Dependencies][ico-dependencies]][link-dependencies]

---

Adds Heyzap integration to React Native on Android and iOS.

## Requirements

- node >= 4.1
- rnpm >= 1.6

## Installation

```bash
$ rnpm install react-native-heyzap
```

### iOS

After `rnpm` has linked the package, there are still a few steps required.

Create a new group in your project called 'Frameworks', then right-click and
select 'Add Files to...'. Find the `HeyzapAds.framework` file, and check the 'Copy items
if needed' option.

Then go to 'Build Phases > Link Binary With Libraries' and add `libxml2` and
`libsqlite3`.

Finally, open 'Libraries' from the navigator, and expand `Heyzap.xcodeproj`. If
it already has a `HeyzapAds.framework` file, remove it and re-add as before.

## Usage

Add the following to your `index.js`:

```js
let Heyzap = require('react-native-heyzap');

class AwesomeApp extends Component {
  constructor(props) {
    super(props);
    Heyzap.initialize('your-publisher-id');
  }
}
```

You can then call any of the following methods:

```js
Heyzap.showDebugPanel();
Heyzap.showInterstitialAd();
Heyzap.fetchVideoAd();
Heyzap.showVideoAd();
Heyzap.fetchIncentivizedAd();
Heyzap.showIncentivizedAd();
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email contact@hassankhan.me instead of using the issue tracker.

## Credits

- [Hassan Khan][link-author]
- [All Contributors][link-contributors]

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-npm]: https://img.shields.io/npm/v/react-native-heyzap.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/react-native-contrib/react-native-heyzap/master.svg?style=flat-square
[ico-codeclimate]: https://img.shields.io/codeclimate/github/react-native-contrib/react-native-heyzap.svg?style=flat-square
[ico-code-coverage]: https://img.shields.io/codeclimate/coverage/github/react-native-contrib/react-native-heyzap.svg?style=flat-square
[ico-dependencies]: https://img.shields.io/david/react-native-contrib/react-native-heyzap.svg?style=flat-square

[link-npm]: https://www.npmjs.com/package/react-native-heyzap
[link-travis]: https://travis-ci.org/react-native-contrib/react-native-heyzap
[link-codeclimate]: https://codeclimate.com/github/react-native-contrib/react-native-heyzap
[link-code-coverage]: https://codeclimate.com/github/react-native-contrib/react-native-heyzap/coverage
[link-dependencies]: https://david-dm.org/react-native-contrib/react-native-heyzap
