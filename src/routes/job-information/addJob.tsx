import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/job-information/addJob')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/job/AddJob"!</div>
}
