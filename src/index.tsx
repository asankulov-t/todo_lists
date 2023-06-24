import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithReducer from "./AppWithReducer";
import {Provider} from "react-redux";
import {store} from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Provider store={store}>
       <AppWithReducer />
   </Provider>
);


