# Mobile App Codebase

## Initialization

This app is initialized using 

```sh
npx create-expo-app native-mobile -t tabs
```

The app will be under the `native-mobile` folder

## Preliminary Files
```
/native-mobile
    app.json
    /api
    /app
        /(tabs)
        /(screens)
        _layout.tsx
    /assets
        /images
        /fonts
        /lottie
    /components
        /modals
        /global
    /constants
    /contexts
    /entities
    /helpers
    /hooks
    /plugins
    /screens
    /store
    /stylesheets
    /tests
        /__mocks__
        /components
        /screens
```
| Directory | Description |
| -------- | -------- |
| api | Contains files that will communicate with the backend |
| app | Defines the general structure of the app as well as the routes involved. Will generally be used for routing. |
| context | Provide scoped properties to components. Use this pattern to avoid prop drilling. |
| entities | Contains the `types` and `interfaces` for the app |
| hooks | Contains custom hooks, and `react-query/tanstack-query` files |
| plugins | Modify the `android` and `ios` files during the build process. Do not change these files unless you know how to deal with them. |
| screens | Contains the "pages" that the users will navigate to. Screens correspond to the `app` folder routes |
| store | Contains the `redux` and `zustand` files for app-wide state management. |

<br/>

# What to do Next:
### Configure `app.json` File
- Update `name`, `slug`, and `version`
