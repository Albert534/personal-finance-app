import { Button, Select, Table, type TableData } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Pagination } from '@mantine/core';

const Expenses = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [activePage, setPage] = useState(1);
	const itemsPerPage = 10;

	// Generate years from 2025 onwards (next 10 years)
	const incomingYears = [];
	const startYear = 2025;
	const yearsToGenerate = 10;

	for (let i = 0; i < yearsToGenerate; i++) {
		incomingYears.push((startYear + i).toString());
	}

	// 3-letter month formats
	const monthsShort = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	// Get current year and month as defaults
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear().toString();
	const currentMonth = monthsShort[currentDate.getMonth()];

	// All expense data
	const allExpensesData = [
		['Groceries', '$120.50', 'Weekly shopping', 'Food'],
		['Gas', '$45.00', 'Car fuel', 'Transportation'],
		['Coffee', '$15.30', 'Morning coffee', 'Food'],
		['Utilities', '$180.00', 'Monthly bill', 'Bills'],
		['Entertainment', '$60.00', 'Movie tickets', 'Leisure'],
		['Rent', '$1200.00', 'Monthly rent', 'Bills'],
		['Phone Bill', '$45.99', 'Monthly phone', 'Bills'],
		['Lunch', '$25.75', 'Work lunch', 'Food'],
		['Internet', '$59.99', 'Monthly internet', 'Bills'],
		['Gym', '$30.00', 'Monthly membership', 'Health'],
		['Books', '$25.99', 'Study materials', 'Education'],
		['Taxi', '$18.50', 'Airport ride', 'Transportation'],
		['Medicine', '$45.00', 'Prescription', 'Health'],
		['Clothes', '$89.99', 'Winter jacket', 'Shopping'],
		['Restaurant', '$67.25', 'Date night', 'Food'],
	];

	// Calculate pagination
	const totalPages = Math.ceil(allExpensesData.length / itemsPerPage);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get current page data
	const currentPageData = useMemo(() => {
		return allExpensesData.slice(startIndex, endIndex);
	}, [activePage, startIndex, endIndex]);

	// Table data for desktop
	const tableData: TableData = {
		head: ['Expenses', 'Amount', 'Reason', 'Category'],
		body: currentPageData,
	};

	// Reset to page 1 when filters change
	const handleFilterChange = () => {
		setPage(1);
	};

	// Mobile Card Component
	const ExpenseCard = ({ expense }: { expense: string[] }) => (
		<div className='bg-card rounded-lg p-4 border border-secondary/20 mb-3'>
			<div className='flex justify-between items-start mb-3'>
				<div>
					<h3 className='font-semibold text-lg text-textBlack'>{expense[0]}</h3>
					<p className='text-2xl font-bold text-secondary'>{expense[1]}</p>
				</div>
				<div className='px-3 py-1 bg-secondary/10 rounded-full text-xs font-medium text-secondary'>
					{expense[3]}
				</div>
			</div>

			<div className='text-sm'>
				<span className='text-gray-500'>Reason:</span>
				<p className='text-textBlack font-medium'>{expense[2]}</p>
			</div>
		</div>
	);

	return (
		<>
			<div className='mt-8 md:mt-0 top-0 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div className='text-xl sm:text-2xl font-semibold'>Expenses</div>
				<Link to={'/expenses/addExpenses'}>
					<Button className='!bg-red-700 hover:!bg-red-700/60 transition-all duration-200 !text-sm sm:!text-md w-full sm:w-auto'>
						Add Expenses
					</Button>
				</Link>
			</div>

			<div className='mt-6 sm:mt-10'>
				{/* Filter Section */}
				<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-4'>
					<div className='text-xs sm:text-sm text-gray-600 order-2 sm:order-1'>
						Showing {startIndex + 1}-
						{Math.min(endIndex, allExpensesData.length)} of{' '}
						{allExpensesData.length} expenses
					</div>

					<div className='flex flex-col sm:flex-row gap-2 sm:gap-4 order-1 sm:order-2'>
						<Select
							defaultValue={'All'}
							data={['All', 'Spending', 'Saving', 'Donation']}
							className='w-full sm:w-auto'
							onChange={handleFilterChange}
							styles={{ dropdown: { zIndex: 9999 } }}
						/>
						<div className='flex gap-2'>
							<Select
								placeholder='Month'
								defaultValue={currentMonth}
								data={monthsShort}
								className='flex-1'
								onChange={handleFilterChange}
								styles={{ dropdown: { zIndex: 9999 } }}
							/>
							<Select
								placeholder='Year'
								defaultValue={currentYear}
								data={incomingYears}
								className='flex-1'
								onChange={handleFilterChange}
								styles={{ dropdown: { zIndex: 9999 } }}
							/>
						</div>
					</div>
				</div>

				{/* Desktop Table View */}
				<div className='hidden md:block'>
					<Table
						data={tableData}
						styles={{
							tr: {
								'&:hover': {
									backgroundColor: '#f3f4f6',
								},
							},
						}}
						classNames={{
							table: 'bg-card rounded-lg overflow-hidden',
							thead: 'bg-secondary text-white',
							th: 'text-left font-semibold text-white px-4 py-3',
							td: 'px-4 py-3 text-textBlack border-b border-secondary/50',
						}}
					/>
				</div>

				{/* Mobile Card View */}
				<div className='block md:hidden'>
					{currentPageData.map((expense, index) => (
						<ExpenseCard
							key={startIndex + index}
							expense={expense}
						/>
					))}
				</div>

				{/* Pagination */}
				<div className='flex justify-center mt-6'>
					<Pagination
						color='#513f32'
						value={activePage}
						onChange={setPage}
						total={totalPages}
						size='sm'
						withEdges
					/>
				</div>
			</div>
		</>
	);
};

export default Expenses;
