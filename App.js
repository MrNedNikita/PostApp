import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from "./src/screens/HomeScreen";
import PostScreen from './src/screens/PostScreen';
import postReducer from './src/store/reducers/postReducer';
import commentReducer from './src/store/reducers/commentReducer';
// import { ToastProvider } from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const rootReducer = combineReducers({
  posts: postReducer,
  comments: commentReducer,
});

const CustomBackground = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5'
  },
};

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <ToastProvider> */}
          <NavigationContainer theme={CustomBackground}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Posts' }} />
              <Stack.Screen
                name="Post"
                component={PostScreen}
                options={({ route }) => ({ title: route.params.post.title })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </ToastProvider> */}
      </PaperProvider>
    </Provider>
  );
}

export default App;

