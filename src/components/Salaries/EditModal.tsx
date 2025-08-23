import React, { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useUserDetailMutation } from '../../apis/mutation/userDetailMutation';
import { useCreateSalary } from '../../apis/mutation/salaryMutation';

const EditModal = ({
	opened,
	close,

	salary,
	title,
}: {
	opened: boolean;
	close: () => void;
	salary: number;
	title: string;
}) => {
	const { mutate: editBalance, isPending } = useUserDetailMutation();

	const handleClaimSalary = (salary: number) => {
		editBalance(salary);
	};
	useEffect(() => {
		if (isPending) {
			close();
		}
	}, [isPending]);

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={<div className='text-lg font-semibold mt-1'>Claim Salary?</div>}
		>
			<div>
				You are about to change your balance After changing this you will not be
				able to undo this action and all of the ratios and percentages outcome
				will change
			</div>

			<button
				disabled={isPending}
				className='flex justify-center mt-5 mx-auto text-center cursor-pointer hover:bg-green-400 transition-all duration-300 ease-in-out w-1/3 bg-green-600 text-white py-2 px-5 rounded-lg'
				onClick={() => handleClaimSalary(salary)}
			>
				{isPending ? 'Changing' : 'Change'}
			</button>
		</Modal>
	);
};

export default EditModal;
