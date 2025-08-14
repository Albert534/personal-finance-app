import { createFileRoute } from '@tanstack/react-router'
import Login from '../ui/components/Login'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Login/>
}
