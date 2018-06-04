# nest-utils

## Description

Contains Sierra Labs commonly used code like postgres naming strategy, nest decorators, and pipes.

## Requirements

Make sure to have the following installed

* `NodeJS / NPM` for application runtime
* `NestJS` for application framework


## Installation

To use the `nest-utils` node module:

```bash
$ npm install --save @sierralabs/nest-utils
```

## Contributing

To contribute to the `nest-utils` project please make sure to have the following configured in your development environment. Submit pull request to master after making sure all unit tests run successful.

* `tslint` for TypeScript linting (tslint in VSCode to automate linting)
* `jest` for unit testing

### Development environment setup

```bash
$ npm install
```

If you would like to develop/debug `nest-utils` in your source project you can npm link to symlink cross-dependency:

```bash
# Run npm link on this project
$ npm link

# Run npm link on your project
$ npm link @sierralabs/nest-utils
```

### Test

All code changes should have supported unit tests.

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

