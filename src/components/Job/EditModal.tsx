import React, { useEffect } from 'react';
import { Button, InputWrapper, Modal, Input, Select } from '@mantine/core';
import { useGetSingleJob } from '../../apis/query/jobQuery';
import { useForm } from '@mantine/form';
import { useEditJob } from '../../apis/mutation/jobMutation';

const EditModal = ({
  opened,
  close,
  id,
}: {
  opened: boolean;
  close: () => void;
  id: number;
}) => {
  const { mutate: editJob, isSuccess, isPending } = useEditJob();
  
  const form = useForm({
    initialValues: {
      title: '',
      salary: '',
      experiences: '',
      status: '',
	  isMonthly: '',
    },
    validate: {
      title: (value) =>
        value.length < 3 ? 'Name should have at least 3 letters' : null,
      salary: (value) =>
        value.length === 0 ? 'Salary must be provided even if it is zero' : null,
      experiences: (value) =>
        value.length === 0 ? 'Experience is required' : null,
      status: (value) => (value.length === 0 ? 'Status is required' : null),

	  isMonthly: (value) => (value.length === 0 ? 'Status is required' : null),
    },
  });

  const { data } = useGetSingleJob(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validation = form.validate();
    
    if (validation.hasErrors) {
      return;
    }
    
    const jobData = {
      id: id,
      title: form.values.title,
      salary: form.values.salary,
      experiences: form.values.experiences,
      status: form.values.status,
	  isMonthly: form.values.isMonthly == 'Yes' ? true : false
    };
    
    editJob(jobData);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  const experiences = [
    'Half Year',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '6 Years',
    '7 Years',
    '8 Years',
    '9 Years',
    '10+ Years',
  ];

  useEffect(() => {
    if (data && data[0]) {
      form.setValues({
        title: data[0].title || '',
        salary: data[0].salary?.toString() || '',
        experiences: data[0].experiences || '',
        status: data[0].status || '',
		isMonthly: data[0].isMonthly ? 'Yes' : 'No',
      });
    }
  }, [data]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<div className="text-lg font-semibold mt-1">Edit Job Information</div>}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-3">
          <InputWrapper label="Job Title" required error={form.errors.title}>
            <Input 
              {...form.getInputProps('title')} 
              key={form.key('title')}
            />
          </InputWrapper>
          
          <InputWrapper label="Salary" required error={form.errors.salary}>
            <Input 
              {...form.getInputProps('salary')} 
              key={form.key('salary')} 
              type="number"
            />
          </InputWrapper>
        </div>
        
        <div className="flex justify-between gap-8 mt-4">
          <InputWrapper label="Experience" required error={form.errors.experiences}>
            <Select 
              data={experiences} 
              {...form.getInputProps('experiences')} 
              key={form.key('experiences')}
            />
          </InputWrapper>
          
          <InputWrapper label="Status" required error={form.errors.status}>
            <Select 
              data={['Active', 'Inactive']} 
              {...form.getInputProps('status')} 
              key={form.key('status')}
            />
          </InputWrapper>

		   <InputWrapper label="Monthly Income" required error={form.errors.status}>
            <Select 
              data={['Yes', 'No']} 
			  clearable = {false}
              {...form.getInputProps('isMonthly')} 
              key={form.key('isMonthly')}
            />
          </InputWrapper>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button
            type="submit"
            className="!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md !border-none !text-white !px-2"
            disabled={isPending}
          >
            Edit Job Information
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;