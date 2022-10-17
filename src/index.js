import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';
import Store from './store/store';

const store = new Store();
export const Context = createContext({
  store,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    

    
      <BrowserRouter>
        <Context.Provider value={{store}}>
          <App/>
        </Context.Provider>
      </BrowserRouter>
    

  

);


