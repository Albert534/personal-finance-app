import React , { useEffect, useState } from 'react'
import { useForgotPassword, useVerifyCode } from '../apis/mutation/forgetPasswordMutation'
import { useForm } from '@mantine/form'
import { Link, useRouter } from '@tanstack/react-router'
import { Button } from '@mantine/core'
import OtpInput from 'react-otp-input';
import { Loader } from '@mantine/core'
import { useWindowEvent } from '@mantine/hooks'
const Verify = () => {
const router = useRouter();

  const { mutate: verify , isSuccess  , isPending , data} = useVerifyCode();
  const { mutate: forgotPassword , isPending: isPending2 } = useForgotPassword();
  const temp_email = localStorage.getItem('tempEmail');
  const handleResendCode = () => { 
  
  forgotPassword(temp_email);

}
  console.log("This is data" , data)
      const [otp, setOtp] = useState('');
     const form = useForm({
          initialValues: {
              code: '',
          },
        validate: {
  code: (value) => {
    if (value.length < 4) {
      return 'Verification Code should have at least 6 letters'
    }
    if (value.length === 0 ) {
      return 'Verification code is required'
    }
    return null // ✅ no error
  },
}


      })

      const handleVerifyCode = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        form.onSubmit((values) => {
            console.log(values);
            verify(values.code);
        })();
}
useEffect(() => {
   if(isSuccess) {
   router.navigate({to: '/change_password'});
   localStorage.setItem('verifiedEmail' , temp_email as string);
   
   }
}, [isSuccess, router, temp_email]);

useEffect(() => {
  
  localStorage.removeItem('verifiedEmail');

}, [])
    return (
     <>
    <div className='min-h-screen flex items-center justify-center font-text-display'>
            <div className='bg-card  min-w-[200px] sm:min-w-[200px] min-h-[270px] rounded-md  px-10 border border-secondary/50'>
  <div className='text-textBlack text-xl font-semibold text-center mt-3'>Verify Your Email</div>
  <div className='text-textBlack text-md font-medium text-center mt-5'>Please verify your email.</div>

  
  <form onSubmit={handleVerifyCode}>
<div className='mt-5'>
   	<OtpInput
							value={otp}
						onChange={(val) => {
    setOtp(val);
    form.setFieldValue("code", val); // ✅ sync otp with form
  }}
							numInputs={4}
							renderInput={(props) => (
								<input
									{...props}
									className='w-[40px] h-[40px] md:w-[60px] sm:h-[60px] p-2 text-2xl text-black text-center rounded-lg border border-[#513f32] outline-none focus:border-[#513f32/20] font-sans box-border'
									style={{
										writingMode: 'horizontal-tb',
										direction: 'ltr',
										transform: 'none',
									}}
								/>
							)}
							containerStyle='flex justify-center gap-4'
						/>
        </div>
     
  
  <div className='mt-3 flex justify-center items-center gap-4'>
  <div className='mt-4'>
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
     
     
    <div className='' onClick={handleResendCode} > <Button
                        type='button'
                        className='mt-4 !text-secondary !border !border-secondary !bg-transparent hover:!bg-secondary/50 transition-all duration-200 ease-in-out flex items-center justify-center'
                        disabled={isPending2} // disable button while loading
                        >
                        {isPending2 ? (
                         <>Sending</>
                        ) : <>Resend</>}
                       
                        </Button></div> 
    
     
      </div>

      
      
  
  </form>
  
              </div>
  
  
  
              </div>
  
     
     </>
  )
}

export default Verify



