import { createFileRoute } from '@tanstack/react-router'
import Salaries from '../components/Salaries/Salaries'

export const Route = createFileRoute('/salaries')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Salaries/></div>
}
