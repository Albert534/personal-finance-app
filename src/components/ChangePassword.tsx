import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
const ChangePassword = () => {
	const form = useForm({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: {
			password: (value) =>
				value.length < 6 ? 'Password should have at least 6 letters' : null,
			confirmPassword: (value: string): string | null =>
				value !== form.values.password ? 'Passwords do not match' : null,
		},
	});
	return (
		<>
			<div className='min-h-screen flex items-center justify-center font-text-display'>
				<div className='bg-card min-w-[200px] min-h-[300px] rounded-md  px-10 border border-secondary/50'>
					<div className='text-textBlack text-xl font-semibold text-center mt-3'>
						Change Password
					</div>

					<form onSubmit={form.onSubmit(console.log)}>
						<div className='mt-6'>
							<TextInput
								mt='md'
								label='New Password'
								placeholder='Enter your new password'
								style={{ width: '300px' }} // increase width here
								{...form.getInputProps('password')}
							/>

							<TextInput
								mt='md'
								label='Confirm Password'
								placeholder='Confirm your new password'
								style={{ width: '300px' }} // increase width here
								{...form.getInputProps('confirmPassword')}
							/>
						</div>

						<div className=' mt-2 flex justify-center items-center'>
							<Link to={'/verify'}>
								<Button
									type='submit'
									mt='md'
									className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200'
								>
									Change Password
								</Button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
