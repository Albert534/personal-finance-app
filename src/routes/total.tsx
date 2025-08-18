import { createFileRoute } from '@tanstack/react-router';
import Total from '../components/Total';
export const Route = createFileRoute('/total')({
	component: RouteComponent,
});

function RouteComponent() {
	return <Total />;
}
