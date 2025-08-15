import { createLazyFileRoute } from '@tanstack/react-router'
import ForgetPassword from '../components/ForgetPassword'
import { useNavigate } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/forgotPassword')({
  component: RouteComponent,
})

function RouteComponent() {
const navigate = useNavigate()
  const isAuthenticated = false;
  if(!isAuthenticated){
    return <ForgetPassword/>
  }
  if (isAuthenticated) {
    navigate({ to: '/' }) 
    return null // don’t render anything
  }
 
}
