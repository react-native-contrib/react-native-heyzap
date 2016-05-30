# react-native-heyzap

![Heyzap logo](https://d2jks9au6e6w94.cloudfront.net/assets/new_dashboard/heybar-logo.png)

[![npm version][ico-npm]][link-npm]
[![License][ico-license]](LICENSE.md)
[![Travis CI][ico-travis]][link-travis]
[![Code Climate][ico-codeclimate]][link-codeclimate]
[![Code Coverage][ico-code-coverage]][link-code-coverage]
[![Dependencies][ico-dependencies]][link-dependencies]

---

Adds Heyzap integrations for React Native projects on Android and iOS.

## Requirements

- node >= 4.1
- rnpm >= 1.6

## Installation

```bash
$ rnpm install react-native-heyzap
```

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

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-npm]: https://img.shields.io/npm/v/react-native-heyzap.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/heyzap/react-native-heyzap/master.svg?style=flat-square
[ico-codeclimate]: https://img.shields.io/codeclimate/github/heyzap/react-native-heyzap.svg?style=flat-square
[ico-code-coverage]: https://img.shields.io/codeclimate/coverage/github/heyzap/react-native-heyzap.svg?style=flat-square
[ico-dependencies]: https://img.shields.io/david/heyzap/react-native-heyzap.svg?style=flat-square

[link-npm]: https://www.npmjs.com/package/react-native-heyzap
[link-travis]: https://travis-ci.org/heyzap/react-native-heyzap
[link-codeclimate]: https://codeclimate.com/github/heyzap/react-native-heyzap
[link-code-coverage]: https://codeclimate.com/github/heyzap/react-native-heyzap/coverage
[link-dependencies]: https://david-dm.org/heyzap/react-native-heyzap
