import { createFileRoute } from '@tanstack/react-router';
import Percentages from '../../components/Percentages/Percentages';

export const Route = createFileRoute('/percentages/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Percentages />
		</div>
	);
}
