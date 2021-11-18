import { rootReducer } from './reducers/rootReducer';
import { applyMiddleware, createStore,  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware( thunkMiddleware )
  )
);