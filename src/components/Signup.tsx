import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Loader } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';
import { useSignUp } from '../apis/mutation/signupMutation';
import { useRouter } from '@tanstack/react-router';
const Signup = () => {
	const router = useRouter()
	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [isConfrimOpen, setIsConrfirmOpen] = useState(false);
	const {mutate: signUp , isPending , isSuccess
	}  = useSignUp();
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			password: '',
			email: '',
			name: '',
			confirmPassword: '',
		},

		// Validation functions for each field
		validate: {
			name: (value) =>
				value.length <= 3 ? 'Username should have at least 3 letters' : null,
			password: (value) =>
				value.length < 6 ? 'Password should have at least 6 letters' : null,
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			confirmPassword: (value: string): string | null =>
				value !== form.values.password ? 'Passwords do not match' : null,
		},
	});
	
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // prevent refresh

  form.onSubmit((values) => {
    console.log(values);
    signUp(values);
  })(); // ✅ call the returned function immediately
};

useEffect(() => {
	if(isSuccess){
	router.navigate({ to: '/login' }); // ✅ type-safe
	}
		
}, [isSuccess])


	return (
		<div className='min-h-screen flex items-center justify-center font-text-display'>
			<div className='bg-card min-w-[350px] min-h-[500px] rounded-md px-10 border border-secondary/50'>
				<div className='mt-4'>
					<h1 className='text-2xl font-bold text-textBlack'>
						Signup for new account
					</h1>
				</div>

				<div className='mt-4'>
					<form onSubmit={handleSubmit}>
						<TextInput
							mt='sm'
							label='Username'
							placeholder='Username'
							key={form.key('name')}
							{...form.getInputProps('name')}
						/>
						<TextInput
							mt='sm'
							label='Email'
							placeholder='email'
							key={form.key('email')}
							{...form.getInputProps('email')}
						/>
						<TextInput
							label='Password'
							type={isEyeOpen ? 'text' : 'password'}
							placeholder='Password'
							rightSection={
								<div
									className='cursor-pointer'
									onClick={() => setIsEyeOpen(!isEyeOpen)}
								>
									{isEyeOpen ?
										<BsEye className='text-black' />
									:	<BsEyeSlash className='text-black' />}
								</div>
							}
							mt='10px'
							key={form.key('password')}
							{...form.getInputProps('password')}
						/>

						<TextInput
							label='Confirm Password'
							type={isConfrimOpen ? 'text' : 'password'}
							rightSection={
								<div
									className='cursor-pointer'
									onClick={() => setIsConrfirmOpen(!isConfrimOpen)}
								>
									{isConfrimOpen ?
										<BsEye className='text-black' />
									:	<BsEyeSlash className='text-black' />}
								</div>
							}
							placeholder='Confirm Password'
							mt='10px'
							key={form.key('confirmPassword')}
							{...form.getInputProps('confirmPassword')}
						/>

						<div className='flex justify-between'>
							<Link to='/forgotPassword'>
								<div className='text-secondary hover:text-secondary/50 transition-all duration-200 ease-in-out mt-2 text-sm'>
									Forgot Password?
								</div>
							</Link>
							<Link to='/login'>
								<div className='mt-2 text-sm text-secondary hover:text-secondary/50 transition-all duration-200 ease-in-out'>
									Login
								</div>
							</Link>
						</div>
						<div className='flex items-center justify-center mt-6'>
  <Button
    type='submit'
    className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200 ease-in-out flex items-center justify-center'
    disabled={isPending} // disable button while loading
  >
    {isPending ? (
      <Loader color="#f5e6d3" size={15} className='mr-2'  />
    ) : null}
    SignUp
  </Button>
</div>

						
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
