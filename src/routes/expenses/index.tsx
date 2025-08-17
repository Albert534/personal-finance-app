import { createFileRoute } from '@tanstack/react-router';
import Expenses from '../../components/Expanses/Expenses';

export const Route = createFileRoute('/expenses/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			{' '}
			<Expenses />
		</>
	);
}
