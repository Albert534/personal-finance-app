import React from 'react';
import { useForm } from '@mantine/form';
import { Input, Card, Button, InputBase, Select } from '@mantine/core';
const AddExpenses = () => {
	const cash = 70;
	const form = useForm({
		initialValues: {
			category: '',
			reason: '',
			amount: 0,
		},
		validate: {
			category: (value) => (value === '' ? 'Category is required!' : null),

			reason: (value) =>
				value.length < 4 ? 'Reason should have at least 4 letters!' : null,
			amount: (value) =>
				value > cash || value <= 0 ? 'Please enter a valid percentages!' : null,
		},
	});
	return (
		<div className='max-w-8xl mx-auto'>
			<div className='text-2xl font-semibold text-secondary mb-4'>
				Adding Expenses
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

					<div className='text-xl font-semibold text-secondary mt-2 '>
						Remaining Balance in Bank:{' '}
						<span className='text-green-600 font-semibold'>4000000 MMK</span>
					</div>

					{/* Name + Percentages */}
					<div className='flex flex-col lg:flex-row gap-12 mt-3'>
						<Input.Wrapper
							label={<div className='text-md'>Reason</div>}
							className='flex-1'
							error={form.errors.reason}
						>
							<Input
								size='sm'
								placeholder='Enter your reason to spend'
								classNames={{ input: '!rounded-md' }}
								key={form.key('reason')}
								{...form.getInputProps('reason')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Select Category'
							className='w-96'
							error={form.errors.category}
						>
							<Select
								size='sm'
								searchable
								placeholder='Enter your amount to spend'
								classNames={{ input: '!rounded-md' }}
								key={form.key('category')}
								data={['Grocery', 'Entertainment', 'Travel']}
								{...form.getInputProps('category')}
							></Select>
						</Input.Wrapper>
					</div>

					<div className='flex flex-col lg:flex-row gap-12 mt-3'>
						{/* Total Amount */}
						<Input.Wrapper
							label='Amount to Spend'
							className='flex-1'
							error={form.errors.amount}
						>
							<Input
								size='sm'
								type='number'
								placeholder='Enter your amount to spend'
								classNames={{ input: '!rounded-md' }}
								key={form.key('amount')}
								{...form.getInputProps('amount')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Total Amount'
							className='w-96'
						>
							<InputBase
								value='0 MMK'
								readOnly
								w={'100%'}
								classNames={{
									input:
										'!rounded-md bg-white/80 border border-gray-300 text-sm',
								}}
							/>
						</Input.Wrapper>
					</div>

					{/* Submit Button */}
					<div className='flex justify-end mt-5'>
						<Button
							className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200'
							type='submit'
						>
							Add Expenses
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default AddExpenses;
