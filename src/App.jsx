import React from 'react'
import AppRouter from './AppRouter';
import { AppProvider } from './context/AppProvider';
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <AppProvider>
      <AppRouter/>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </AppProvider>
  )
}

export default App
