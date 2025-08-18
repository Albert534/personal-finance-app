// src/routes/__root.tsx
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuthenticated = true // Replace with your actual auth check
    const unprotected = ['/login', '/signup' , '/forgotPassword' , '/change_password' , '/verify']
    
    // Redirect unauthenticated users to login (except for auth pages)
    if (!isAuthenticated && !unprotected.includes(location.pathname)) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
    
    // Redirect authenticated users away from auth pages to dashboard
    if (isAuthenticated && unprotected.includes(location.pathname)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const isAuthenticated = true // Must match the value in beforeLoad
  
  // If not authenticated, just show auth routes (login/signup will be rendered by Outlet)
  if (!isAuthenticated) {
    return <Outlet />
  }

  // Authenticated dashboard layout
  return (
    <>
      <div className='flex'>
        <div className="p-4 text-xl flex flex-col gap-2 border-b-0 min-w-[300px] bg-secondary font-display text-white gap-y-3 min-h-screen">
          <div className='text-2xl text-text font-semibold'>My Finance App</div>
          <div className='mt-5 flex flex-col gap-5'>
            <Link 
              to="/" 
              className="[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-2 rounded-md"
            >
              Dashboard
            </Link>
            <Link 
              to="/percentages" 
              className="[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-2 rounded-md"
            >
              Percentages
            </Link>
            <Link 
              to="/usages" 
              className="[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-2 rounded-md"
            >
              Usages
            </Link>
            <Link 
              to="/total" 
              className="[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-2 rounded-md"
            >
              Total
            </Link>
          </div>
        </div>
        <div className='ml-6 p-3'>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  )
}