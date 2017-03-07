# React Itsma Component

## Use ITSMA private registry
The config-ui repository is using the private NPM in ITSMA development runtime server.
Please config your local NPM client to work correctly with the private registry.

```bash
npm adduser
Username: dev
Password:
Email: (this IS public) dev@dev.com
Logged in as dev on http://shc-nexus-repo.hpeswlab.net:8080/repository/npm-group/.
```

## Developing Your Component

Now we need to work with the component. Your component lives under the src directory. Open `src/index.js` in your favorite editor and start developing.

Now, it’s time to start the Storybook so we can see what we are building:

```
npm run storybook
```

The above command starts the Storybook console on [http://localhost:9010](http://localhost:9010/).

> You can see changes you make while you are editing your component. Visit [React Storybook](https://github.com/kadirahq/react-storybook/) repo to learn more.


You can write your component in ES2015+ syntax. It supports `react` and `babel-stage2` presets.

## Testing

You can write your tests inside the `src/tests` directory. By default, the project comes with two test cases demonstrating how to write tests. React CDK configures your component with Mocha, [Enzyme](https://github.com/airbnb/enzyme), jsdom, and other essential JS testing tools.

This is the ideal way to write React tests.

You can run tests with the following commands:

* `npm run testonly` (run tests once)
* `npm run test-watch` (run tests and watch for changes)
* `npm test` (run tests and apply lint rules)

## Lint Rules

Your project is configured with ESLint based on the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) with some minor changes.

You can apply lint rules with the following commands:

* `npm run lint` (apply lint rules)
* `npm run lintfix` (apply lint rules and fix some common issues)

## Publishing

Now it’s time to publish your component to NPM. Before you publish, make sure you’ve customized the following files as necessary:

* package.json
* README.md
* CONTRIBUTE.md
* LICENSE

If everything is okay, simply publish your component to NPM with the following command:

```
npm publish
```

This command will transpile your component for ES5 before publishing it to NPM. Your component will work on any JavaScript environment.

## Deploying Storybook

You will usually write your stories while you are developing your component. That allows you to use your storybook as a living document. You could show what your component looks like and different ways to use it.

Then you can simply deploy it to GitHub Pages with the following command:

```
npm run publish-storybook
```

You can link your Storybook URL inside the README file.

Here’s a [sample component](https://github.com/kadira-samples/react-button) listing a Storybook URL.


> You can also publish your storybook automatically when you publish your component to NPM. To do that, simply add the following NPM script to your package.json file:

```js
{
  "scripts": {
    ...
    "postpublish": "npm run publish-storybook"
    ...
  }
}
```

## CSS and Styles

It’s common to include CSS and Styles with your component. There are many ways to do this. Some prefer to write CSS in JS, while some provide a CSS file that lives inside the repo.

### CSS in JS

With this approach, you don’t need to configure anything. You can just use it. However, you should make sure you accept some external styles, which allows the end user to change the look and feel of your component as needed.

### Plain old CSS files

If you are following this approach, make sure to place your CSS files inside the root of your component and not inside the src directory. Then, your end users can import it like this:

```js
import 'my-comp/style.css'
```

You may also need to load this style sheet inside your stories. Simply import the above style sheet into src/stories/index.js with the following command:

```
import '../../style.css'
