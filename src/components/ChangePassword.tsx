import React, { useEffect  , useState} from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { Link, useRouter } from '@tanstack/react-router';
import { useChangePasswordMutation } from '../apis/mutation/forgetPasswordMutation';
const ChangePassword = () => {
	const router = useRouter();
	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [isEyeOpen2, setIsEyeOpen2] = useState(false);

	const {mutate: changePassword , isPending , isSuccess} = useChangePasswordMutation();
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


	const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
		const verified_email = localStorage.getItem('verifiedEmail');
		event.preventDefault();
		form.onSubmit((values) => {
			console.log(values);
			changePassword({password: values.password , verified_email} );
		})();
	}

	useEffect(() => {

		if(isSuccess){
			router.navigate({to: '/login'});
			localStorage.removeItem('verified_email');

		}
		
	}, [isSuccess, router])
	return (
		<>
			<div className='min-h-screen flex items-center justify-center font-text-display'>
				<div className='bg-card min-w-[200px] min-h-[300px] rounded-md  px-10 border border-secondary/50'>
					<div className='text-textBlack text-xl font-semibold text-center mt-3'>
						Change Password
					</div>

					<form onSubmit={handleChangePassword}>
						<div className='mt-6'>
							<TextInput
								mt='md'
								label='New Password'
								type={isEyeOpen ? 'text' : 'password'}
								rightSection={
																isEyeOpen ?
																	<BsEye
																		onClick={() => setIsEyeOpen(false)}
																		className='text-black cursor-pointer'
																	/>
																:	<BsEyeSlash
																		onClick={() => setIsEyeOpen(true)}
																		className='text-black cursor-pointer'
																	/>
															}
								placeholder='Enter your new password'
								style={{ width: '300px' }} // increase width here
								{...form.getInputProps('password')}
							/>

							<TextInput
								mt='md'
								type={isEyeOpen2 ? 'text' : 'password'}
								rightSection={
																isEyeOpen2 ?
																	<BsEye
																		onClick={() => setIsEyeOpen2(false)}
																		className='text-black cursor-pointer'
																	/>
																:	<BsEyeSlash
																		onClick={() => setIsEyeOpen2(true)}
																		className='text-black cursor-pointer'
																	/>
															}
								label='Confirm Password'
								placeholder='Confirm your new password'
								style={{ width: '300px' }} // increase width here
								{...form.getInputProps('confirmPassword')}
							/>
						</div>

						<div className=' mt-2 flex justify-center items-center'>
							
								<Button
									type='submit'
									mt='md'
									className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200'
								>
									Change Password
								</Button>
							
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
