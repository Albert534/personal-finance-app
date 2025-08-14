import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

const Signup = () => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { password: '', email: '' },

		// Validation functions for each field
		validate: {
			password: (value) =>
				value.length < 6 ? 'Password should have at least 6 letters' : null,
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	return (
		<div className='min-h-screen flex items-center justify-center font-text-display'>
			<div className='bg-card min-w-[350px] min-h-[340px] rounded-md px-10 border border-secondary/50'>
				<div className='mt-4'>
					<h1 className='text-2xl font-bold text-textBlack'>
						Signup for new account
					</h1>
				</div>

				<div className='mt-5'>
					<form onSubmit={form.onSubmit(console.log)}>
						<TextInput
							mt='sm'
							label='Email'
							placeholder='Email'
							key={form.key('email')}
							{...form.getInputProps('email')}
						/>
						<TextInput
							label='Password'
							placeholder='Password'
							mt='10px'
							key={form.key('password')}
							{...form.getInputProps('password')}
						/>

						<div className='flex justify-between'>
							<Link to='/forgotPassword'>
								<div className='text-secondary hover:text-secondary/50 transition-all duration-200 ease-in-out mt-2 text-sm'>
									Forget Password?
								</div>
							</Link>
							<Link to='/signup'>
								<div className='mt-2 text-sm text-secondary hover:text-secondary/50 transition-all duration-200 ease-in-out'>
									Sign Up
								</div>
							</Link>
						</div>

						<div className='flex items-center justify-center'>
							<Button
								type='submit'
								mt='25px'
								className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200 ease-in-out'
							>
								Login
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
