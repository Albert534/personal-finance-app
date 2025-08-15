import { createLazyFileRoute } from '@tanstack/react-router'
import Verify from '../components/Verify'

export const Route = createLazyFileRoute('/verify')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Verify/>
}
