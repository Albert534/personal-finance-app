import { Input, Card, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

const AddRuleForm = () => {
	const percentages = 70;
	const form = useForm({
		initialValues: {
			name: '',
			percentages: 0,
		},
		validate: {
			name: (value) =>
				value.length < 3 ? 'Name should have at least 2 letters' : null,
			percentages: (value) =>
				value > percentages || value <= 0 ?
					'Please enter a valid percentages.'
				:	null,
		},
	});
	return (
		<div className='max-w-8xl mx-auto'>
			<div className='text-2xl font-semibold text-secondary mb-4'>
				Adding Rules
			</div>

			<Card
				shadow='sm'
				padding='lg'
				radius='md'
				withBorder
				className='!bg-card flex flex-col !mt-6 '
			>
				<form onSubmit={form.onSubmit(console.log)}>
					{/* Remaining Percentages */}
					<div className='text-xl font-semibold text-secondary'>
						Remaining Percentages:{' '}
						<span className='text-green-600 font-semibold'>{percentages}%</span>
					</div>

					<div className='text-xl font-semibold text-secondary mt-2 '>
						Total Income:{' '}
						<span className='text-green-600 font-semibold'>4000000 MMK</span>
					</div>

					{/* Name + Percentages */}
					<div className='flex flex-col lg:flex-row gap-12 mt-3'>
						<Input.Wrapper
							label={<div className='text-md'>Rule Name</div>}
							className='flex-1'
							error={form.errors.name}
						>
							<Input
								size='sm'
								placeholder='Enter rule name'
								classNames={{ input: '!rounded-md' }}
								key={form.key('name')}
								{...form.getInputProps('name')}
							/>
						</Input.Wrapper>

						<Input.Wrapper
							label='Percentages'
							className='w-96'
							error={form.errors.percentages}
						>
							<Input
								size='sm'
								type='number'
								placeholder='Enter %'
								classNames={{ input: '!rounded-md' }}
								key={form.key('percentages')}
								{...form.getInputProps('percentages')}
							/>
						</Input.Wrapper>
					</div>

					{/* Total Amount */}
					<Input.Wrapper
						label='Total Amount'
						className='w-64 mt-4'
					>
						<div className='bg-white/80 p-2 rounded-md border border-gray-300 mt-1 text-sm'>
							0 MMK
						</div>
					</Input.Wrapper>

					{/* Submit Button */}
					<div className='flex justify-end'>
						<Button
							className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200'
							type='submit'
						>
							Add Rule
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default AddRuleForm;
