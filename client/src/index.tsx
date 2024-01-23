import React from 'react'
import './index.css'
import Login from './pages/login'
import Register from './pages/register'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Paths } from './paths'
import { ConfigProvider, theme } from 'antd'
import reportWebVitals from './reportWebVitals'
import Auth from './features/auth/auth'
import Employees from './pages/employees'
import AddEmployee from './pages/addEmployee'
import Status from './pages/status'
import Employee from './pages/employee'
import EditEmployee from './pages/editEmployee'

const container = document.getElementById('root')!
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
