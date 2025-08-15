import React , {useState} from 'react';
import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from '@tanstack/react-router';
import { BsEye , BsEyeSlash } from 'react-icons/bs';
const Login = () => {


		const [isEyeOpen , setIsEyeOpen] = useState(false);
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { password: '', email: '' },

		// functions will be used to validate values at corresponding key
		validate: {
			password: (value) =>
				value.length < 6 ? 'Password should have at least 6 letters' : null,
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	return (
		<div className='min-h-screen flex items-center justify-center font-text-display'>
			<div className='bg-card min-w-[350px] min-h-[340px] rounded-md  px-10 border border-secondary/50'>
				<div className='mt-4'>
					<h1 className='text-2xl font-bold text-textBlack'>
						Login Into The System
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
							rightSection= {isEyeOpen ? <BsEye onClick={() => setIsEyeOpen(false)}  className='text-black' /> : <BsEyeSlash onClick={() => setIsEyeOpen(true) } className='text-black'/>}
							type = {isEyeOpen ? 'text' : 'password'}
							mt={'10px'}
							key={form.key('password')}
							{...form.getInputProps('password')
}
						/>
						<div className='flex justify-between'>
							<Link to='/forgotPassword'>
								<div className='text-secondary hover:text-secondary/50 transition all duration-200 ease-in-out mt-2 text-sm'>
									Forget Password?
								</div>
							</Link>
							<Link to='/signup'>
								<div className=' mt-2 text-sm text-secondary hover:text-secondary/50 transition all duration-200 ease-in-out '>
									Sign Up
								</div>
							</Link>
						</div>

						<div className='flex items-center justify-center'>
							<Link >
							<Button
								type='submit'
								mt='25px'
								className=' !bg-secondary hover:!bg-secondary/50 transition-all duration-200 ease-in-out'
							>
								Login
							</Button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
