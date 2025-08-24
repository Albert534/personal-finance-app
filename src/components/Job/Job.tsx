import { Button } from '@mantine/core';
import React from 'react';
import HeaderPack from '../ui/HeaderPack';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import AddJobModal from './AddJob';
import EditModal from './EditModal';
import { useUserStore } from '../../store/userStore';
import { useGetAllJob } from '../../apis/query/jobQuery';
import type { JobData } from '../../apis/mutation/jobMutation';
import DeleteJobModal from './DeleteModal';
import cn from '../../utils/cn';
const Job = () => {
	const user = useUserStore((state) => state.user);

	console.log(user);
	const [isAddModal, setIsModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [isEditModal, setIsEditModal] = useState(false);
	const [id, setId] = useState(0);
	const [title, setTitle] = useState('');
	const { data } = useGetAllJob();
	const jobs: JobData[] =
		data?.slice().sort((a: { id: number }, b: { id: number }) => b.id - a.id) ||
		[];

	const handleDeleteJob = (id: number, title: string) => {
		setId(id);
		setDeleteModal(true);
		setTitle(title);
	};
	console.log('This is all job', data);

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
			{jobs && jobs.length === 0 && (
				<div className='flex justify-center text-gray-400 items-center text-center text-2xl font-semibold mt-10'>
					No Current Job Assigned
				</div>
			)}
			<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 pb-10'>
				{jobs &&
					jobs.map((job, index) => (
						<>
							<div
								className='card !pb-0 mt-10 h-full flex flex-col'
								key={index}
							>
								<div className='flex justify-between'>
									{' '}
									<div className='text-lg lg:text-xl font-semibold mt-2 '>
										Job Title: {job.title}
									</div>
									<div className='text-md md:text-lg font-semibold mt-2 cursor-pointer flex gap-4'>
										<span
											onClick={() => {
												setIsEditModal(true);
												setId(job.id);
											}}
										>
											<BsPencil />
										</span>{' '}
										<div
											className='hover:text-red-500'
											onClick={() => handleDeleteJob(job?.id, job?.title)}
										>
											<BsTrash />
										</div>
									</div>
								</div>

								<hr className='mt-1' />
								<div className='text-lg font-semibold mt-4 flex flex-col pr-4'>
									<div>
										Salary:{' '}
										<span className='text-green-700'>{job.salary} MMK</span>
									</div>{' '}
									<div className='mt-2'>
										<span>Experience: {job.experiences}</span>
									</div>
								</div>
								<div className='text-md mt-4'>
									<div className=''>
										<div>
											Status :{' '}
											<span
												className={cn(
													'bg-green-700 rounded-md text-white px-2 py-2 ml-2',
													job.status == 'Active' ? 'bg-green-700' : 'bg-red-700'
												)}
											>
												{job.status}
											</span>
										</div>
									</div>
								</div>

								<div className='text-md mt-4'>
									<div className=''>
										<div>
											Monthly Income :{' '}
											<span
												className={cn(
													'bg-green-700 rounded-md text-white px-2 py-2 ml-2',
													job.isMonthly == false && 'bg-red-700'
												)}
											>
												{job.isMonthly ? 'Yes' : 'No'}
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

			{deleteModal && (
				<DeleteJobModal
					opened={deleteModal}
					close={() => setDeleteModal(false)}
					title={title}
					id={id}
				/>
			)}
		</>
	);
};

export default Job;
