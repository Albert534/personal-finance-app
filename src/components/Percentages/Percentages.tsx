import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import React from 'react';

const Percentages = () => {
	const percentages = [
		{
			name: 'Donation',
			percentages: 5,
			balance: 0,
		},
		{
			name: 'Spending',
			percentages: 20,
			balance: 0,
		},
		{
			name: 'Saving',
			percentages: 50,
			balance: 0,
		},
		{
			name: 'Bank Transfer',
			percentages: 25,
			balance: 500,
		},
	];
	return (
		<>
			<div className='sticky top-0  z-40 flex justify-between items-center '>
				<div className='text-2xl font-semibold'>Percentages</div>
				<Link to={'/percentages/addRules'}>
					<Button className='!bg-secondary hover:!bg-secondary/80 transition-all duration-200 !text-md'>
						Add New Rules
					</Button>
				</Link>
			</div>
			<div className=''>Remaining Percentages : 0%</div>
			<div className='grid grid-cols-2 gap-4 mt-10'>
				{percentages.map((percentage) => (
					<>
						<div
							className='card pt-3 flex flex-col'
							key={percentage.name}
						>
							<div className='flex justify-between items-center '>
								<div className='text-xl font-semibold'>{percentage.name}</div>
								<div className='text-xl font-semibold text-secondary'>
									{percentage.percentages}%
								</div>
							</div>
							<div className='mt-2'>
								Total Balance:{' '}
								<span className='text-green-600 font-semibold ml-2 mt-0.5'>
									{percentage.balance} MMK{' '}
								</span>
							</div>
						</div>
					</>
				))}
			</div>
		</>
	);
};

export default Percentages;
