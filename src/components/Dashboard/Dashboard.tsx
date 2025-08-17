import { LineChart } from '@mantine/charts';
import { data } from '../../utils/dummyIncome';
import { BsCoin, BsHandbag } from 'react-icons/bs';
import { IconCurrencyDollarOff } from '@tabler/icons-react';

import { DonutChart } from '@mantine/charts';
import { dataPieChart } from '../../utils/dummyPieChartData';
import cn from '../../utils/cn';

const Dashboard = () => {
	console.log(dataPieChart);
	const current_status = [
		{
			title: 'Job Title',
			value: 'Frontend Developer',
		},
		{
			title: 'Experience',
			value: 'Half Year',
		},
		{
			title: 'Current Status',
			value: 'Active',
		},
		{ title: 'Total Balance', value: '400000000000 MMK' },
	];

	// Clean status color function
	const getStatusColor = (title: string, value: string) => {
		if (value === 'Active' || title === 'Total Balance') {
			return 'text-green-600';
		}
		if (value === 'Inactive') {
			return 'text-red-600';
		}
		return 'text-textBlack';
	};

	return (
		<div className=' max-w-8xl mx-auto'>
			{/* Welcome header */}
			<div className='text-lg sm:text-xl lg:text-2xl font-medium mb-6 sm:mb-8'>
				Welcome Aung Paing Oo
			</div>

			{/* Main grid container - responsive breakpoints */}
			<div className='grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10 w-full'>
				{/* Chart section - full width on mobile, 8/9 cols on xl+ */}
				<div className='xl:col-span-8 2xl:col-span-9 bg-card p-6 sm:p-8 lg:p-10 flex flex-col rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:bg-card/90 hover:-translate-y-1'>
					<div className='flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4'>
						<div className='text-xl sm:text-2xl font-semibold'>
							Monthly Income
						</div>
						<div className='text-secondary text-lg sm:text-2xl font-semibold'>
							400,000 MMK
						</div>
					</div>

					{/* Chart container */}
					<div className='mt-6 sm:mt-8 lg:mt-10 w-full'>
						<LineChart
							h={180} // Slightly smaller on mobile
							w='100%'
							data={data}
							dataKey='date'
							series={[{ name: 'Apples', color: '#513f32' }]}
							curveType='bump'
							connectNulls
							withTooltip
							tooltipProps={{
								content: ({ label, payload }) => {
									if (!payload || payload.length === 0) return null;

									return (
										<div className='bg-white/90 p-3 border border-gray-200 rounded-lg shadow-lg'>
											<p className='text-sm font-medium text-gray-900'>
												{label}
											</p>
											{payload.map((item, index) => (
												<p
													key={index}
													className='text-sm !text-green-600'
													style={{ color: item.color }}
												>
													{item.name}: {item.value}
												</p>
											))}
										</div>
									);
								},
							}}
							dotProps={{ r: 4, strokeWidth: 2 }}
							strokeWidth={2}
						/>
					</div>
				</div>

				{/* Cash flows section - full width on mobile, 4/3 cols on xl+ */}
				<div className='xl:col-span-4 2xl:col-span-3 bg-card p-4 sm:p-5 flex flex-col rounded-2xl'>
					<div className='text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8'>
						Cash Flows
					</div>

					<div className='space-y-3 sm:space-y-4'>
						{/* Cash flow items */}
						<div className='bg-white/50 p-3 sm:p-4 border border-gray-200 rounded-lg'>
							<div className='flex items-center gap-3'>
								<div className='flex-shrink-0 flex items-center justify-center'>
									<BsCoin
										size={20}
										color='green'
										className='sm:w-6 sm:h-6'
									/>
								</div>
								<div className='flex-1 min-w-0'>
									<div className='text-xs sm:text-sm font-medium text-gray-700'>
										Yearly Income
									</div>
									<div className='text-sm sm:text-lg font-semibold text-green-700 break-words'>
										50,000,000 MMK
									</div>
								</div>
							</div>
						</div>

						<div className='bg-white/50 p-3 sm:p-4 border border-gray-200 rounded-lg'>
							<div className='flex items-center gap-3'>
								<div className='flex-shrink-0 flex items-center justify-center'>
									<IconCurrencyDollarOff
										size={20}
										color='#DC143C'
										className='sm:w-6 sm:h-6'
									/>
								</div>
								<div className='flex-1 min-w-0'>
									<div className='text-xs sm:text-sm font-medium text-gray-700'>
										Yearly Expenses
									</div>
									<div className='text-sm sm:text-lg font-semibold text-red-700 break-words'>
										50,000,000 MMK
									</div>
								</div>
							</div>
						</div>

						<div className='bg-white/50 p-3 sm:p-4 border border-gray-200 rounded-lg'>
							<div className='flex items-center gap-3'>
								<div className='flex-shrink-0 flex items-center justify-center'>
									<BsHandbag
										size={20}
										color='green'
										className='sm:w-6 sm:h-6'
									/>
								</div>
								<div className='flex-1 min-w-0'>
									<div className='text-xs sm:text-sm font-medium text-gray-700'>
										Yearly Saving
									</div>
									<div className='text-sm sm:text-lg font-semibold text-green-700 break-words'>
										50,000,000 MMK
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Second row - responsive grid */}
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-6 lg:mt-10'>
				{/* Current Status section */}
				<div className='lg:col-span-4 xl:col-span-4'>
					<div className='bg-card p-4 sm:p-5 pt-3 flex flex-col rounded-2xl'>
						<div className='mt-1 text-xl sm:text-2xl font-semibold text-center'>
							Current Status
						</div>
						<hr className='mt-3 mb-4' />

						<div className='space-y-4 sm:space-y-6'>
							{current_status.map((item, index) => (
								<div
									key={index}
									className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4'
								>
									<div className='text-sm sm:text-md font-bold text-textBlack flex-shrink-0'>
										{item.title}:
									</div>
									<div
										className={cn(
											'text-sm sm:text-md font-medium text-right break-words',
											getStatusColor(item.title, item.value)
										)}
									>
										{item.value}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Empty sections - hidden on mobile/tablet, visible on large screens */}
				<div className='  lg:col-span-5 xl:col-span-5'>
					{/* Future content placeholder */}
					<div className='bg-card p-5 pt-1 rounded-2xl h-full flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:bg-card/90 hover:translate-y-[-5px]'>
						<DonutChart
							data={dataPieChart}
							w='100%'
							h='100%'
							tooltipProps={{
								content: ({ payload }) => {
									if (!payload || payload.length === 0) return null;

									return (
										<div className='bg-white/90 p-3 border border-gray-200 rounded-lg shadow-lg'>
											{payload.map((item, index) => (
												<p
													key={index}
													className='text-sm '
													style={{ color: item.color }}
												>
													{item.name}: {item.value}
												</p>
											))}
										</div>
									);
								},
							}}
						/>
						<div className='text-md font-semibold mt-2'>
							Monthly Percentages
						</div>
						<div className='w-full text-md flex gap-4 items-center justify-center mt-1 '>
							{dataPieChart.map((item) => (
								<>
									<div className='flex items-center gap-1'>
										<div
											className='text-left h-2 w-2'
											style={{ backgroundColor: item.color }}
										></div>
										<div className='text-right'>{item.name}</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>

				<div className='  lg:col-span-3 xl:col-span-3'>
					{/* Future content placeholder */}
					<div className='bg-card p-5 rounded-2xl h-full flex flex-col  '>
						<div className='text-2xl font-semibold'>Quick Access</div>
						<div className='mt-7 cursor-pointer hover:text-blue-500 transiton-all duration 300 ease-in-out'>
							<span className='w-2 h-2 rounded-full bg-black inline-block mb-0.5 mr-1'>
								{' '}
							</span>{' '}
							Define New Rule
						</div>

						<div className='mt-4 cursor-pointer hover:text-blue-500 transiton-all duration 300 ease-in-out'>
							<span className='w-2 h-2 rounded-full bg-black inline-block mb-0.5 mr-1 '>
								{' '}
							</span>{' '}
							Add Extra Expenses
						</div>

						<div className='mt-4 cursor-pointer hover:text-blue-500 transiton-all duration 300 ease-in-out'>
							<span className='w-2 h-2 rounded-full bg-black inline-block mb-0.5 mr-1 '>
								{' '}
							</span>{' '}
							View Total
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
