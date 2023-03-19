
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Payment from './pages/Payment.jsx'
import Completion from './pages/Completion.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Payment />
    }, {
      path: '/completion',
      element: <Completion />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
