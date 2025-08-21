import React, { useEffect } from 'react'
import { useForm } from '@mantine/form'
import { TextInput , Button } from '@mantine/core'
import { Loader } from '@mantine/core'

import { useRouter } from '@tanstack/react-router'
import { useForgotPassword } from '../apis/mutation/forgetPasswordMutation'
const ForgetPassword = () => {
    const {mutate: forgotPassword , isSuccess , isPending }  = useForgotPassword();    
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email format!'),
        }
    })
      const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.onSubmit((values) => {
            console.log(values);
            forgotPassword(values.email);

            
        })()
    }

    useEffect(() => { 
        if(isSuccess){
          router.navigate({to: '/verify'});
          localStorage.setItem('tempEmail' , form.values.email);
        }


    }, [isSuccess])
  return (
   <>
 	<div className='min-h-screen flex items-center justify-center font-text-display'>
			<div className='bg-card min-w-[200px] min-h-[300px] rounded-md  px-10 border border-secondary/50'>
<div className='text-textBlack text-xl font-semibold text-center mt-3'>Forgot Password</div>
<div className='text-textBlack text-md font-medium text-center mt-5'>Please enter your email to change the password.</div>
<div className='text-textBlack text-md font-medium  mt-0'>Email Verification Code will be sent to your email</div>

<form onSubmit={handleForgotPassword}>
<TextInput
    mt='md'
    
    placeholder='Email'
    {...form.getInputProps('email')}
    />
<div className=' mt-2 flex justify-center items-center'>
    
   <Button
                                    type='submit'
                                    className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200 ease-in-out flex items-center justify-center'
                                    disabled={isPending} // disable button while loading
                                  >
                                    {isPending ? (
                                      <Loader color="#f5e6d3" size={15} className='mr-2'  />
                                    ) : null}
                                    Verify
                                  </Button>
                                  </div>

</form>

            </div>



            </div>

   
   </>
  )
}

export default ForgetPassword
