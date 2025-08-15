import React from 'react'
import { useForm } from '@mantine/form'
import { TextInput , Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'
const ForgetPassword = () => {

    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email format!'),
        }
    })
  return (
   <>
 	<div className='min-h-screen flex items-center justify-center font-text-display'>
			<div className='bg-card min-w-[200px] min-h-[300px] rounded-md  px-10 border border-secondary/50'>
<div className='text-textBlack text-xl font-semibold text-center mt-3'>Forgot Password</div>
<div className='text-textBlack text-md font-medium text-center mt-5'>Please enter your email to change the password.</div>
<div className='text-textBlack text-md font-medium  mt-0'>Email Verification Code will be sent to your email</div>

<form onSubmit={form.onSubmit(console.log)}>
<TextInput
    mt='md'
    
    placeholder='Email'
    {...form.getInputProps('email')}
    />
<div className=' mt-2 flex justify-center items-center'>
    <Link to={'/verify'}>
    <Button type='submit' mt='md' className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200' >Verify</Button></Link></div>

</form>

            </div>



            </div>

   
   </>
  )
}

export default ForgetPassword
