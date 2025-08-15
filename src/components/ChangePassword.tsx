import React from 'react'
import { useForm } from '@mantine/form'
import { TextInput , Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'
const ChangePassword = () => {

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
<div className='text-textBlack text-xl font-semibold text-center mt-3'>Change Password</div>

<form onSubmit={form.onSubmit(console.log)}>
    <div className='mt-6'><TextInput
  mt="md"
  label="New Password"
  placeholder="Email"
  style={{ width: '300px' }} // increase width here
  {...form.getInputProps('email')}
/></div>


<div className=' mt-2 flex justify-center items-center'>
    <Link to={'/verify'}>
    <Button type='submit' mt='md' className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200' >Verify</Button></Link></div>

</form>

            </div>



            </div>

   
   </>
  )
}

export default ChangePassword
