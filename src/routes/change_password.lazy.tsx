import { createLazyFileRoute } from '@tanstack/react-router'
import ChangePassword from '../components/ChangePassword'

export const Route = createLazyFileRoute('/change_password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChangePassword/>
}
