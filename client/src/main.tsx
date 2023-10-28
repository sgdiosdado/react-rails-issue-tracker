import React from 'react'
import ReactDOM from 'react-dom/client'
import { Project } from './project.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './main-layout.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import mockServer from './mock-server.ts'

mockServer()

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: ':projectId',
        element: <Project />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
