import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// page imports
import App from './Pages/App.jsx';
import AllTasks from './Pages/AllTasks.jsx'
import ErrorPage from './Pages/ErrorPage.jsx';


const site = import.meta.env.BASE_URL

//this is our layout to install
// If you want to add a footer, do it after the outlet div with <Footer />
function Layout() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      {/* <Navbar /> */}
      <div id='page-content'>
        <Outlet />
      </div>
    </ div>
  )
}

// this is our path 
// outlet is all the stuff in the children path 
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/alltasks',
        element: <AllTasks />
      },
      // {
      //   path: '/contact',
      //   element: <Contact />
      // },
      // {
      //   path: '/portfolio',
      //   element: <Portfolio />
      // },
      // {
      //   path: '/about',
      //   element: <About />
      // },
    ]
  }
], {
  basename: site
}
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
