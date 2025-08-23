import React, { useEffect } from 'react';
import { Button, Modal, Input, InputWrapper, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAddJob } from '../../apis/mutation/jobMutation';

const AddJobModal = ({
	opened,
	close,
}: {
	opened: boolean;
	close: () => void;
}) => {
	const { mutate: addJob, isPending, isSuccess } = useAddJob();

	const form = useForm({
		initialValues: {
			name: '',
			salary: '',
			experience: '',
			status: '',
			isMonthly: '', // <-- string, "Yes" or "No"
		},
		validate: {
			name: (value) =>
				value.length < 3 ? 'Name should have at least 2 letters' : null,
			experience: (value) =>
				value.length === 0 ? 'Experience is required' : null,
			status: (value) => (value.length === 0 ? 'Status is required' : null),
			isMonthly: (value) =>
				value.length === 0 ? 'Please select Yes or No' : null,
		},
	});

	const experiences = [
		'Half Year',
		'1 year',
		'2 years',
		'3 years',
		'4 years',
		'5 years',
		'6 years',
		'7 years',
		'8 years',
		'9 years',
		'10+ years',
	];

	const handleJobSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		form.onSubmit((values) => {
			const data = {
				title: values.name,
				salary: Number(values.salary), // ensure number
				experiences: values.experience,
				isMonthly: values.isMonthly === 'Yes', // converts to boolean
				status: values.status,
			};
			addJob(data);
		})();
	};

	useEffect(() => {
		if (isSuccess) {
			close();
		}
	}, [isSuccess, close]);

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={<div className='text-lg font-semibold mt-1'>Add New Job</div>}
		>
			<form onSubmit={handleJobSubmit}>
				<div className='flex justify-between gap-3'>
					<InputWrapper
						label='Job Title'
						required
					>
						<Input
							key={form.key('name')}
							{...form.getInputProps('name')}
						/>
					</InputWrapper>

					<InputWrapper
						label='Salary'
						required
					>
						<Input
							type='number'
							key={form.key('salary')}
							{...form.getInputProps('salary')}
						/>
					</InputWrapper>
				</div>

				<div className='flex justify-between gap-3 mt-4'>
					<InputWrapper
						label='Experience'
						required
					>
						<Select
							data={experiences}
							key={form.key('experience')}
							{...form.getInputProps('experience')}
						/>
					</InputWrapper>

					<InputWrapper
						label='Status'
						required
					>
						<Select
							data={['Active', 'Inactive']}
							key={form.key('status')}
							{...form.getInputProps('status')}
						/>
					</InputWrapper>

					<InputWrapper
						label='Monthly Salary'
						required
					>
						<Select
							data={['Yes', 'No']}
							key={form.key('isMonthly')}
							{...form.getInputProps('isMonthly')}
						/>
					</InputWrapper>
				</div>

				<div className='mt-6 flex justify-center'>
					<Button
						type='submit'
						className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md !border-none !text-white !px-2'
						disabled={isPending}
					>
						Add Job Information
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddJobModal;
