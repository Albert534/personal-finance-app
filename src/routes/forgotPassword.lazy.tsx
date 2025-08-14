import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/forgotPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forgetPassword"!</div>
}
