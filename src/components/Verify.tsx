import React , { useState } from 'react'

import { useForm } from '@mantine/form'
import { Link } from '@tanstack/react-router'
import { Button } from '@mantine/core'
import OtpInput from 'react-otp-input';
const Verify = () => {
      const [otp, setOtp] = useState('');
     const form = useForm({
          initialValues: {
              code: '',
          },
        validate: {
  code: (value) => {
    if (value.length < 6) {
      return 'Verification Code should have at least 6 letters'
    }
    if (value.length === 0 ) {
      return 'Verification code is required'
    }
    return null // ✅ no error
  },
}

      })
    return (
     <>
    <div className='min-h-screen flex items-center justify-center font-text-display'>
            <div className='bg-card min-w-[200px] min-h-[270px] rounded-md  px-10 border border-secondary/50'>
  <div className='text-textBlack text-xl font-semibold text-center mt-3'>Verify Your Email</div>
  <div className='text-textBlack text-md font-medium text-center mt-5'>Please verify your email.</div>

  
  <form onSubmit={form.onSubmit(console.log)}>
<div className='mt-5'>
   	<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={4}
							renderInput={(props) => (
								<input
									{...props}
									className='w-[60px] h-[60px] p-2 text-2xl text-black text-center rounded-lg border border-[#513f32] outline-none focus:border-[#513f32/20] font-sans box-border'
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
  <div className=''>
      <Link to={'/change_password'}>
      <Button type='submit' mt='md' className='!bg-secondary hover:!bg-secondary/50 transition-all duration-200' >Verify</Button></Link></div>
     
     
    <div className=''><Button type='submit' mt='md' className='!bg-transparent !text-textBlack !border !border-secondary hover:!bg-secondary/50 transition-all duration-200' >Resend</Button></div> 
    
     
      </div>

      
      
  
  </form>
  
              </div>
  
  
  
              </div>
  
     
     </>
  )
}

export default Verify
