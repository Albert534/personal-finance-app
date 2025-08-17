import { createFileRoute } from '@tanstack/react-router';
import AddExpenses from '../../components/Expanses/AddExpenses';

export const Route = createFileRoute('/expenses/addExpenses')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<AddExpenses />
		</div>
	);
}
