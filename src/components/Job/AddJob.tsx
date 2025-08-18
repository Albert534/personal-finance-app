import React from 'react'
import { Button } from '@mantine/core'
import { InputWrapper, Modal , Input, Select } from '@mantine/core'
const AddJobModal = ({opened , close} : {opened : boolean , close : () => void}) => {
  const experiences = ['Half Year' , '1 Year' , '2 Years' , '3 Years' , '4 Years' , '5 Years' , '6 Years' , '7 Years' , '8 Years' , '9 Years' , '10+ Years']
  return (
    
    <>
   <Modal opened={opened} onClose={close} title= {<div className='text-lg font-semibold mt-1'>Add New Job</div>} >
        <div className='flex justify-between gap-3'>
          <InputWrapper label="Job Title" required><Input className=''></Input></InputWrapper>
           <InputWrapper label="Salary" required><Input className=''></Input></InputWrapper>
        </div>

<div className='flex justify-between gap-3 mt-4'>
          <InputWrapper label="Experience" required><Select data={experiences} className=''></Select></InputWrapper>
           <InputWrapper label="Status" required><Select data={['Active' , 'Inactive']} className=''></Select></InputWrapper>
        </div>

<div className='mt-6 flex justify-center '>
  <Button className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md !border-none !text-white !px-2'>Add Job Information</Button>
</div>


      </Modal>
    </>
  )
}

export default AddJobModal
