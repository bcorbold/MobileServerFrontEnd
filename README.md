## Status
[![Build Status](https://travis-ci.com/bcorbold/MobileServerFrontEnd.svg?token=rxARx6syFzxr3wZ4LhUX&branch=master)](https://travis-ci.com/bcorbold/MobileServerFrontEnd)

# MobileServerFrontEnd
Welcome to the repo for the **MobileServer** McMaster University Capstone project! This repo contains the wepage that will be used by client to place orders to the **MobileServer** robot!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Git Structure
We are using a slightly modified GitFlow structure for the repo since there is a small code base as well as minimal contributors. An outline of the branches can be found below:
- `master`: This is reserved for production ready code. This should be updated with every major/minor change to the code. All changes to this branch should be made with a pull request originating from `development`
- `development`: The development branch is the shared "work in progress" branch. When once a new feature is ready a pull request should be submitted to this branch. When enough changes have been made a pull request will be made into `master`

All changes to `development` and `master` should have been reviewed before merging. Upon each update to the master branch the version number should be changed accordingly, as well as tagged.

Tips: 
- Before making a pull request make sure that you've pulled the latest changes from your branch, as well as the target branch you're merging into
- Make sure that all tests have passed successfully
- Make sure that there are no lint errors (can be checked by running the `lint` target, or `ng lint` in the terminal)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
