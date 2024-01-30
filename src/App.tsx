import { RouterProvider } from 'react-router'
import Router from './router';
import './App.less'
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
  // return <RouterProvider router={router} />
}

export default App
