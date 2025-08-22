import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useDeleteJob, useEditJob } from '../../apis/mutation/jobMutation';

const ClaimModal = ({
	opened,
	close,
	id,
	title,
}: {
	opened: boolean;
	close: () => void;
	id: number;
	title: string;
}) => {
	const { mutate: deleteJob, isPending, isSuccess } = useDeleteJob();

	const handleDeleteJob = (id: number) => {
		deleteJob(id);
	};
	useEffect(() => {
		if (isSuccess) {
			close();
		}
	}, [isSuccess]);

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={<div className='text-lg font-semibold mt-1'>Delete Job?</div>}
		>
			<div>
				You are about to delete <span className='font-bold'>{title}</span> from
				the job list and this will affect the whole system. Are you sure you
				want to continue?
			</div>

			<button
				disabled={isPending}
				className='flex justify-center mt-5 mx-auto text-center cursor-pointer hover:bg-red-400 transition-all duration-300 ease-in-out w-1/3 bg-red-600 text-white py-2 px-5 rounded-lg'
				onClick={() => handleDeleteJob(id)}
			>
				{isPending ? 'Deleting...' : 'Delete'}
			</button>
		</Modal>
	);
};

export default ClaimModal;
