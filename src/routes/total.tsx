import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/total')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/total"!</div>
}
