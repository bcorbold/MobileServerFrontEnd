# MobileServerFrontEnd [![Build Status](https://travis-ci.com/bcorbold/MobileServerFrontEnd.svg?token=rxARx6syFzxr3wZ4LhUX&branch=master)](https://travis-ci.com/bcorbold/MobileServerFrontEnd)
Welcome to the repo for the **MobileServer** McMaster University Capstone project! This repo contains the web application that will be used by client to place orders to the **MobileServer** system!

The front-end handles: placing an order, managing account information, displaying orders that need to be fulfilled by bartenders, and tracking system status. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Project Setup Instructions
1. Install [NodeJs](https://nodejs.org/en/download/) and follow installation instructions for you OS. This will install NodeJs as well as npm (used for dependencies). 
2. Open Terminal/Windows console and run `npm install -g @angular/cli`. This will install angular's tool set globally for running the project.
3. Checkout the appropriate branch from git.
4. [Webstorm](https://www.jetbrains.com/webstorm/) is recommended for running/developing the project.
5. Open the checkout project in Webstorm.
6. Open the terminal console in Webstorm and run `npm install` to install the dependencies required for the project.
7. On the left hand side of Webstorm there should be a `npm` window. If you don't see this you can right click on `package.json` in the project window and click `Show npm scripts` to show the npm window.
8. Click on the `serve-dev` target. This will build, and server the project to `localhost:4200` and automatically recompile when you make changes!
9. If you decided not to use Webstorm, you can navigate to the top level project file and run `ng serve` after step 6 to serve.

This project requires a connection to the backend project. When running in development mode, it will send these requests to `localhost:8080` so make sure that's up and running!
If you'd like to change where the connection is looking, you can modify the `backendUrl` value in the `environment.ts` file (located at `/src/environments/environment.ts`).

## Contributing
All project members should follow the [GitFlow](http://datasift.github.io/gitflow/IntroducingGitFlow.html) standard for contributing to the project. Releases will be organized around project deadlines throughout the life cycle of the project. 
- Before making a pull request make sure that you've pulled the latest changes from your branch, as well as the target branch you're merging into
- Make sure that all tests have passed successfully
- Make sure that there are no lint errors (can be checked by running the `lint` target, or `ng lint` in the terminal)

## Angular CLI Help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
