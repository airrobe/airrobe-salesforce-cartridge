# Changelog

## 2026-02-18 - Dependency Upgrade

### Upgraded
- **sgmf-scripts**: 2.4.2 -> 4.0.0 (webpack 4 -> webpack 5, mocha 5 -> mocha 11)
- **node-sass**: 4.14.1 -> replaced with **sass** (dart-sass) 1.97.3
- **css-loader**: 0.28.11 -> 6.11.0
- **postcss-loader**: 2.1.6 -> 7.3.4
- **sass-loader**: 7.3.1 -> 13.3.3
- **sinon**: 1.17.7 -> 21.0.1
- **chai**: 3.5.0 -> 4.5.0
- **proxyquire**: 1.7.4 -> 2.1.3
- **eslint-plugin-import**: 1.16.0 -> 2.32.0

### Added
- **mini-css-extract-plugin**: 2.10.0 (replaces extract-text-webpack-plugin for webpack 5)

### Removed
- **node-sass**: replaced by dart sass (`sass` package)
- **istanbul**: unused (sgmf-scripts 4.0.0 bundles nyc for coverage)
- **mocha** (direct dep): removed, using sgmf-scripts bundled mocha 11

### Changed
- **webpack.config.js**: migrated from `extract-text-webpack-plugin` to `mini-css-extract-plugin` for webpack 5 compatibility; updated `postcss-loader` options format

### Security
- Vulnerabilities reduced from 115 (6 low, 70 moderate, 29 high, 10 critical) to 26 (2 low, 14 moderate, 10 high, 0 critical)
- Eliminated all 10 critical vulnerabilities
- Remaining 26 vulnerabilities are in: stylelint@7 transitive deps (~17), eslint@3/shelljs (~3), sgmf-scripts/dwupload/merge (~3, no upstream fix), diff in sgmf-scripts mocha (~2), trim-newlines (~1)
