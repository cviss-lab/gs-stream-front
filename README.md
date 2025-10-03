# GS Stream Front

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### 1. Environment Setup

Before running the application, you need to set up the environment variables:

```bash
cp .env.template .env
```

Edit the `.env` file to configure your environment:
- `REACT_APP_STANDALONE`: Set to `true` to run with local test models, `false` to connect to backend
- `REACT_APP_BACKEND_URL`: Backend server URL (required when standalone is false)
- `REACT_APP_REQUIRE_AUTH`: Set to `true` to enable authentication
- `REACT_APP_AUTH_BACKEND_URL`: Authentication server URL (required when auth is enabled)

### 2. Install Dependencies

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs ESLint to check and fix code quality issues.

### `npm run format`

Formats code using Prettier.

## License

Copyright (c) 2025 Computer Vision for Smart Structure (CViSS) Lab, University of Waterloo

This project is licensed for **research and educational purposes only**. Commercial use is strictly prohibited.

### Key Restrictions:
- ✅ Academic research and educational use
- ❌ Commercial use of any kind
- ❌ Publication or redistribution of the included data
- ❌ Use of data for other research or commercial purposes

See the [LICENSE](LICENSE) file for full details.
