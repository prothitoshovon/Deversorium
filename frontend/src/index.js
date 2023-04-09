import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import { reducers } from './reducers';

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = configureStore({reducer:reducers})
root.render(
    <Provider store={store}>
         <BrowserRouter>
             <App />
        </BrowserRouter>
    </Provider>
  
)
