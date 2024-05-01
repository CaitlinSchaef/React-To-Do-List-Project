import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { createContext } from 'react'
import { useState } from 'react'
import { useReducer } from 'react'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// page imports
import App from './Pages/App.jsx';
import AllTasks from './Pages/AllTasks.jsx'
import ErrorPage from './Pages/ErrorPage.jsx';
import { initialState, taskReducer } from './Pages/ToDoFunction.jsx';


const site = import.meta.env.BASE_URL

//this is our layout to install
// If you want to add a footer, do it after the outlet div with <Footer /> same for navbar
function Layout() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
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

export const TaskContext = createContext()

const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <TaskProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </TaskProvider>
)
