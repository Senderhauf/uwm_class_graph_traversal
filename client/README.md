# uwm_class_graph_traversal

## About

This is a project I've had in mind since I first began college at UWM. I was handed a massive course catalog and told to find my major and pick my classes according to the major requirements. Having the course catalog online was only marginally helpful. 

Once I did have a major that I wanted to pursue, I realized all the courses weren't offered every semester and that some courses were more important to take before others or if I wanted to understand specific content before interning. 

With this project, users will be able to enter in a major's courses, specifying which courses are contingent on others and then be able to iterate through variations of course schedules for their remaining academics. This takes out the hastle of having to keep track in spreadsheets or on paper whether one is on track to graduate and hopefully is a more immediate roadmap of coursework possibilities than having to sitdown with an advisor. 

Please note, this is not a substitute for academic advising as advisors will often know of nuanced contingencies for one's major that are not immediately apparent on paper. Use this software as an ancillary tool to get a feel for where you need to be and verify a courseload with your advisor before enrolling. 

## Run

node ./scripts/classesGraph.js

## Backlog

* Design and Create React components for course route display
* Refactor graphtrace algorithm for use of mongodb
* Create entry form component for courses
* Connect ratemyprofessor API
* Analyze Runtime 
* Refactor to allow node categories of 'necessary'/'non-necessary'
* Finish maxTypeReached implementation




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
