import { Button } from '@mantine/core';
import React from 'react';
import HeaderPack from '../ui/HeaderPack';
import { BsPencil } from 'react-icons/bs';
import { useState } from 'react';
import AddJobModal from './AddJob';
import EditModal from './EditModal';
import { useUserStore } from '../../store/userStore';
const Job = () => {
	const user = useUserStore((state) => state.user);

	console.log(user);
	const [isAddModal, setIsModal] = useState(false);

	const [isEditModal, setIsEditModal] = useState(false);
	const [id, setId] = useState(0);
	const jobs = [
		{
			name: 'Frontend Developer',
			salary: '400000 MMK',
			status: 'Active',
			experience: 'Half Year',
		},
		{
			name: 'Freelancer',
			salary: '500000 MMK',
			status: 'Active',
			experience: 'Half Year',
		},
	];
	return (
		<>
			<HeaderPack
				header='Job Information'
				buttonText='Add New'
				onClick={() => {
					setIsModal(true);
				}}
				styles='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md'
			/>
			<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12'>
				{jobs.map((job, index) => (
					<>
						<div
							className='card mt-10 h-full flex flex-col'
							key={index}
						>
							<div className='flex justify-between'>
								{' '}
								<div className='text-lg lg:text-xl font-semibold mt-2 '>
									Job Title: {job.name}
								</div>
								<div
									className='text-md md:text-lg font-semibold mt-2 cursor-pointer'
									onClick={() => {
										setIsEditModal(true);
										setId(index);
									}}
								>
									<BsPencil />{' '}
								</div>
							</div>

							<hr className='mt-1' />
							<div className='text-lg font-semibold mt-4 flex flex-col pr-4'>
								<div>
									Salary: <span className='text-green-700'>{job.salary}</span>
								</div>{' '}
								<div className='mt-2'>
									<span>Experience: {job.experience}</span>
								</div>
							</div>
							<div className='text-md mt-3'>
								<div className=''>
									<div>
										Status :{' '}
										<span className='bg-green-700 rounded-md text-white px-2 py-2 ml-2'>
											Active
										</span>
									</div>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
			{isAddModal && (
				<AddJobModal
					opened={isAddModal}
					close={() => {
						setIsModal(false);
					}}
				/>
			)}
			{isEditModal && (
				<EditModal
					opened={isEditModal}
					close={() => {
						setIsEditModal(false);
					}}
					id={id}
				/>
			)}
		</>
	);
};

export default Job;
