# Swop

## 1. How to change splash screen

1. change `assets/logo.png` with your PNG image (recomended image size 1024x1024), make sure file name stays the same `logo.png`
2. run
```
   npx react-native generate-bootsplash assets/logo.png \
    --background-color=F5FCFF \
```

## 2. State management and asynchronous logic
1. You don't need most of the data in the global store. Keep it in local state and use hooks for getting it from the server.
2. For dealing with global state, we are using `redux` + `redux-toolkit`. It has excellent typings and a lot of useful helpers. **For more information about it, please [read the guide](https://redux-toolkit.js.org/usage/usage-guide)**. 
3. And for asynchronous logic that should save results in global store we are using [redux-saga](https://redux-saga.js.org/docs/About) (despite the fact of redux-toolkit having its own helpers for it).
