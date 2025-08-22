import React from 'react';
import { Button } from '@mantine/core';
import { InputWrapper, Modal, Input, Select } from '@mantine/core';
const EditModal = ({
	opened,
	close,
	id,
}: {
	opened: boolean;
	close: () => void;
	id: number;
}) => {
	const experiences = [
		'Half Year',
		'1 year',
		'2 years',
		'3 years',
		'4 years',
		'5 years',
		'6 years',
		'7 years',
		'8 years',
		'9 years',
		'10+ years',
	];
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<div className='text-lg font-semibold mt-1'>Edit Job Information</div>
				}
			>
				<div className='flex justify-between gap-3'>
					<InputWrapper
						label='Job Title'
						required
					>
						<Input className=''></Input>
					</InputWrapper>
					<InputWrapper
						label='Salary'
						required
					>
						<Input className=''></Input>
					</InputWrapper>
				</div>

				<div className='flex justify-between gap-8 mt-4'>
					<InputWrapper
						label='Experience'
						required
					>
						<Select
							data={experiences}
							className=''
						></Select>
					</InputWrapper>
					<InputWrapper
						label='Status'
						required
					>
						<Select
							data={['Active', 'Inactive']}
							className=''
						></Select>
					</InputWrapper>
				</div>

				<div className='mt-6 flex justify-center '>
					<Button className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md !border-none !text-white !px-2'>
						Edit Job Information
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default EditModal;
