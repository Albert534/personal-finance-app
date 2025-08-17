import { createFileRoute } from '@tanstack/react-router';
import AddRuleForm from '../../components/Percentages/AddRuleForm';

export const Route = createFileRoute('/percentages/addRules')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<AddRuleForm />
		</div>
	);
}
