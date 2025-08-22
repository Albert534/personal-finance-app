import React, { useEffect } from 'react';
import { Button, ModalTitle } from '@mantine/core';
import { InputWrapper, Modal, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAddJob } from '../../apis/mutation/jobMutation';
const AddJobModal = ({
	opened,
	close,
}: {
	opened: boolean;
	close: () => void;
}) => {
	const {mutate: addJob , isPending , isSuccess} = useAddJob()	
	
	const form = useForm({
		initialValues: {
			name: '',
			salary: '',
			experience: '',
			status: '',
			isMonthly:'',
		},
		validate: {
			name: (value) =>
				value.length < 3 ? 'Name should have at least 2 letters' : null,
		
			experience: (value) =>
				value.length === 0 ? 'Experience is required' : null,
			status: (value) => (value.length === 0 ? 'Status is required' : null),
		},
	});
	const experiences = [
		'Half Year',
		'1 Year',
		'2 Years',
		'3 Years',
		'4 Years',
		'5 Years',
		'6 Years',
		'7 Years',
		'8 Years',
		'9 Years',
		'10+ Years',
	];
	const handleJobSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		form.onSubmit((values) => {
			const data = {
				
				title: values.name,
				salary: values.salary,
				experiences: values.experience,
				isMonthly: values.isMonthly == 'Yes' ? true : false,
				status: values.status,
			}
			addJob(data);
		})();
	};

	useEffect(() => {
		if (isSuccess) {
			close();
		}
	})
	return (
		<>
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
							<Input className='' defaultValue={''} key={form.key('name')} {...form.getInputProps('name')} ></Input>
						</InputWrapper>
						<InputWrapper
							label='Salary'
							required
						>
							<Input type='number' className='' defaultValue={0} key={form.key('salary')} {...form.getInputProps('salary')}></Input>
						</InputWrapper>
					</div>

					<div className='flex justify-between gap-3 mt-4'>
						<InputWrapper
							label='Experience'
							required
						>
							<Select
								data={experiences}
								className=''
								key={form.key('experience')}
								{...form.getInputProps('experience')}
							></Select>
						</InputWrapper>
						<InputWrapper
							label='Status'
							required
						>
							<Select
								data={['Active', 'Inactive']}
								className=''
								key={form.key('status')}
								{...form.getInputProps('status')}
							></Select>
						</InputWrapper>
						<InputWrapper
							label='Monthly Salary'
							required
						>
							<Select
								data={['Yes', 'No']}
								className=''
								key={form.key('isMonthly')}
								{...form.getInputProps('isMonthly')}
							></Select>
						</InputWrapper>
					</div>

					<div className='mt-6 flex justify-center '>
						<Button type='submit' className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md !border-none !text-white !px-2' disabled={isPending}>
							Add Job Information
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default AddJobModal;
