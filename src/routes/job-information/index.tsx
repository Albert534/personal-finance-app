import { createFileRoute } from '@tanstack/react-router'
import Job from '../../components/Job/Job'

export const Route = createFileRoute('/job-information/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <><Job/></>
}
