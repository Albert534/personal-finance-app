import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/percentages')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/percentages"!</div>
}
