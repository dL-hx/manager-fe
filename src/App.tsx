import { RouterProvider } from 'react-router'
import Router from './router';
import './App.css'
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  )
  // return <RouterProvider router={router} />
}

export default App
