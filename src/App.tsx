import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import Routes from './routes/index';

import GlobalStyles from './styles/global';

import AppProvider from './hooks/index';


const App: React.FC = () => {
  return (
   <BrowserRouter>
   <AppProvider>
    <Routes/>
   </AppProvider>
    <GlobalStyles/>
   </BrowserRouter>
  );
}

export default App;
