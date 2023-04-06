# yesflix

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Unit test running

```
npm test <file path>
```

# Folder structure

## components

This directory contains reusable UI components (DetailsModal.vue, NavBar.vue, SearchLoader.vue, TvShowCard.vue, TvShowsCarouselByGenre.vue) that is used across multiple views in this project. This components prevent to repeat the same codes.

DetailsModal.vue: It displays details for a TV show in a modal box. The component receives a TV show object as a prop and renders its details, including the show's title, rating, summary, language, genres, status, and runtime.

NavBar.vue: This component represents a header for this project. It includes a logo with a link to the main TV shows page, a search bar for searching TV shows, and a logout button for authenticated users.
The search data property is used to store the user's input in the search bar. The component also includes a watcher on search that sets a timer to delay searching for TV shows until the user stops typing in the search bar. Once the user stops typing, the searchTvShows action is dispatched with the search query as the parameter. If the search fails, an error notification is displayed.

SearchLoader.vue: This component displays a spinning circle animation meant to indicate that data from API is loading or processing.

TvShowCard.vue : This component displays a TV show card with an image and rating using VueStarRating component. It also allows for the image to be clicked and emits a "clickedImage" event with the TV show data. It is used in a carousel with the "classForCarousel" prop to add custom styling for the carousel.

TvShowsCarouselByGenre.vue: This component displays a list of TV shows in a 3D carousel format, where each TV show is represented by a card. The component receives an array of TV shows as a prop and emits an event when a TV show card is clicked.

## firebase

The code sets up a connection to a Firebase app using the app's configuration information. It then gets the Firebase authentication service for this app and exports it as auth to be used in other parts of the code.

## layouts

AuthLayout.vue: This is the layout used specifically for the login and register page. It does not include a navigation bar, it only displays the content of the Login and register page.

DefaultLayout.vue: This is the default layout used for most pages in this application. It includes a navigation bar (NavBar.vue), which is used across multiple pages. It also includes a router-view component, which displays the content of the specific page being navigated to.

## router

index.js file defines the routes for this application using the Vue Router library. It specifies which component should be displayed for each URL. The routes are defined as an array of objects, with each object representing a route. The path property defines the URL path for that route, while the component property specifies the component that should be rendered when the user navigates to that route.
The children property is used to define nested routes, which inherit the layout of their parent route.
The meta property is used to specify additional metadata for the route for authentication.
After defining the routes, a new Vue Router instance is created with a history mode and a list of routes defined in the routes array. The beforeEach method is then used to add a navigation guard that checks if the user is authenticated before allowing access to routes that require authentication. The "checkState" function uses Firebase Authentication to determine if a user is currently logged in, and returns a Promise that resolves with the user's authentication state.

## store

index.js file inside of store folder contains the Vuex store configuration, which is used for managing this application's state for authentication and Tv shows. The modules folder within the store folder is used for organizing the store into smaller, more manageable pieces.
The state.js file within this modules defines the initial state, which includes information about whether a user is logged in and Tv shows informations. The mutations.js file contains functions that can modify the state of the module, and are responsible for updating the state in response to actions. The actions.js file defines the actions that is dispatched to the store, which can trigger mutations. The index.js file is used to export the module's state, mutations, actions.

## views

Each component in the views folder represents a different page or view of this application.

HomePage.vue: This page displays TV shows in a carousel format grouped by genre. It fetches TV shows data from the Vuex store and uses computed properties to filter and sort the data by genre. If the data is still being loaded, it shows a loading spinner. If there are no TV shows found, it shows a message "No TV Shows found!". When the user clicks on a TV show image, it opens a modal with more details about that TV show.

LoginPage.vue: It creates a login form with email and password inputs, a login button, and a signup button. When the user clicks the login button, the login() method is called, which dispatches a login action to the Vuex store with the loginForm data as the payload.
If the login action is successful, a success notification is displayed, and the user is redirected to the home page. If there is an error, such as an incorrect password or a user not found, an error notification is displayed.

SearchedTvShows.vue: This page displays a list of TV shows based on a user search. It starts by checking if there are any TV shows to display, and if not, it displays a "No Tv Shows found!" message. If there are TV shows, it loops through each one and displays it in a card format using the TvShowCard component. If a user clicks on the image of a TV show, it triggers the showModal method, which opens a modal window containing more details about the TV show, using the DetailsModal component. The component also uses a SearchLoader component to show a loading animation while waiting for the TV shows to load. The component uses Vuex to get and store TV shows data.

SignupPage.vue: It creates a signup form with an email input, password input, and submit button. When the user submits the form, the register() method is called, which dispatches an action to register the user using the Vuex store. If the registration is successful, a success notification is shown and the user is redirected to the home page. If there is an error, an error notification is shown with a message based on the error code returned by Firebase. There is also a login button that redirects the user to the login page.

## App.vue

It contains a notifications component for displaying notifications and a router-view component, which is where the different views of this app will be rendered based on the current route.

## main.js

This file imports necessary packages and creates a Vue app with the root component App.vue. It also adds the necessary configuration for router and store. It configures this app to use the Notifications, Carousel3d, Axios and VueStarRating. It mounts the root component to the app by calling the mount() method with the selector #app.

## tests

### components

NavBar.spec.js: It uses Jest and Vue Test Utils to create a local Vue instance, set up a Vuex store with mock actions and state, and mount the NavBar component with necessary props and stubs. The first test case checks whether the search functionality of the component works correctly by simulating a user input and checking that the corresponding action is dispatched and the router navigates to the correct page.
The second test case checks that the logout button is visible when the user is logged in.
The third test case checks that clicking on the logout button triggers the correct action.

TvShowCard.spec.js: It checks whether clicking on the component's image triggers an clickedImage event and passes the correct tvShow object as a payload. The test creates a shallowMount wrapper for the component with a propsData object containing a mocked tvShow object. The test then finds the .img element and triggers a click event on it. It waits for the next tick to ensure that any asynchronous updates have been completed, and then it asserts that the clickedImage event has been emitted and contains the expected payload.

### views

HomePage.spec.js: The first test case checks whether the getTvShows action is called when the component is mounted. The second test case checks whether the SearchLoader component is displayed when the isLoaded flag is false. The third test case checks whether the text "No Tv Shows found!" is displayed when there are no tvShows. The fourth test case checks whether the TvShowsCarouselByGenre and DetailsModal components are displayed when tvShows are present.

## api.js

This is an Axios instance that is created with a base URL of "https://api.tvmaze.com/". The axios.create() method returns a new Axios instance that can be used to send HTTP requests with default configuration options. In this case, the baseURL option is set so that all requests sent with this instance will have this URL as their base. This is useful when you need to make multiple requests to the same API endpoint, as it avoids having to repeat the base URL in each request.

## jest.config.js

This is a Jest configuration file, used for configuring the behavior of the Jest test runner when running tests for a JavaScript or Vue.js project.

# Libraries, Frameworks, Platforms

- Vue.js (v2.6.14): Popular JavaScript framework for building user interfaces.
- Vue Router (v3.6.5): Routing library for Vue.js applications.
- Vuex (v3.6.2): State management library for Vue.js applications.
- Axios (v1.3.4): Promise-based HTTP client for the browser and node.js.
- Firebase (v9.19.1): Backend-as-a-service (BaaS) platform that provides tools and infrastructure to build web and mobile applications.
- Sass (v1.60.0): Preprocessor scripting language that is interpreted into CSS.
- vue-notification (v1.3.20): Vue.js component for displaying notifications.
- Jest (v26.6.3): Testing framework for JavaScript applications.
- @vue/test-utils (v1.3.4): Utility library for testing Vue.js components with Jest.
- vue-jest (v3.0.7): Library that allows to use Jest to test Vue components.
- @vue/cli-service (v5.0.0): Command-line interface (CLI) for Vue.js projects that provides an easy way to configure and manage build tools and development servers.
- sass-loader (v13.2.2): Loader that compiles Sass to CSS and integrates with webpack, a popular JavaScript module bundler.
- vue-carousel-3d (1.0.1): Vue.js component for creating a 3D carousel using CSS3 3D transforms.
- vue-star-rating (1.7.0): A customizable Vue.js component for star rating.

# Why Vue.js?

One of the main reasons that I use Vue.js in this project is its simplicity and ease of use. It has a small size, a gentle learning curve, and a flexible architecture that allows developers to create complex applications with a minimal amount of code. Additionally, Vue has a strong focus on performance, making it a good choice for creating fast, responsive user interfaces. Vue.js also allows developers to create single-page applications, which are web applications that don't require reloading the page as the user navigates through the application. This provides a seamless and fast user experience, as the application can quickly update the content on the page without having to make a new request to the server. This can greatly improve the overall performance and user experience of the application.
