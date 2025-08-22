import { Button, Select, Table, type TableData } from '@mantine/core';
import { useState, useMemo } from 'react';
import { Pagination } from '@mantine/core';
import ClaimModal from './ClaimModal';
import { useGetSalary } from '../../apis/query/salaryQuery';

const Salaries = () => {
	const { data = [] } = useGetSalary();
	console.log(data);
	const [value, setValue] = useState<Date | null>(null);
	const [activePage, setPage] = useState(1);
	const itemsPerPage = 10;
	const [isIncreaseModal, setIsIncreaseModal] = useState(false);
	const [isDecreaseModal, setIsDecreaseModal] = useState(false);
	const [id, setId] = useState();
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

	// Action buttons component
	const ActionButtons = ({ index }: { index: number }) => (
		<div className='flex gap-2'>
			<Button
				size='xs'
				variant='outline'
				className='!bg-green-600 hover:!bg-green-600/60 transition-all duration-200 !text-xs !border-none !text-white !px-2'
				onClick={() => handleEdit(index)}
			>
				Claim
			</Button>
			<Button
				size='xs'
				variant='outline'
				className='!bg-red-700 hover:!bg-red-700/60 transition-all duration-200 !text-xs !border-none !text-white !px-2'
				onClick={() => handleDelete(index)}
			>
				Reduce
			</Button>
		</div>
	);

	// All expense data
	const allExpensesData = [
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
		['Groceries', '$120.50', 'Weekly shopping'],
	];

	// Calculate pagination
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get current page data
	const currentPageData = useMemo(() => {
		return data.slice(startIndex, endIndex);
	}, [activePage, startIndex, endIndex]);

	// Table data for desktop
	const tableData: TableData = {
		head: ['Job Title', 'Amount', 'Monthly Income', 'Action'],
		body: currentPageData.map((row, index) => [
			row.title,
			row.salary,
			row.isMonthly,

			<ActionButtons
				index={startIndex + index}
				key={startIndex + index}
			/>,
		]),
	};

	// Handle edit action
	const handleEdit = (index: number) => {
		console.log('Edit item at index:', index);
		setId(index);
		setIsIncreaseModal(true);
	};

	// Handle delete action
	const handleDelete = (index: number) => {
		console.log('Delete item at index:', index);
		setId(index);
		setIsIncreaseModal(true);
	};

	// Reset to page 1 when filters change
	const handleFilterChange = () => {
		setPage(1);
	};

	// Mobile Card Component
	const ExpenseCard = ({
		expense,
		index,
	}: {
		expense: string[];
		index: number;
	}) => (
		<div className='bg-card rounded-lg p-4 border border-secondary/20 mb-3'>
			<div className='flex justify-between items-start mb-3'>
				<div>
					<h3 className='font-semibold text-lg text-textBlack'>{expense[0]}</h3>
					<p className='text-2xl font-bold text-secondary'>{expense[1]}</p>
				</div>
				<div className='text-sm text-gray-500'>{expense[4]}</div>
			</div>

			<div className='grid grid-cols-2 gap-2 mb-3 text-sm'>
				<div>
					<span className='text-gray-500'>Reason:</span>
					<p className='text-textBlack font-medium'>{expense[2]}</p>
				</div>
				<div>
					<span className='text-gray-500'>Category:</span>
					<p className='text-textBlack font-medium'>{expense[3]}</p>
				</div>
			</div>

			<div className='flex justify-end'>
				<ActionButtons index={index} />
			</div>
		</div>
	);

	return (
		<>
			<div className='mt-8 md:mt-0 top-0 z-40 flex justify-between items-center'>
				<div className='text-xl sm:text-2xl font-semibold'>Add Salaries</div>
			</div>

			<div className='mt-6 sm:mt-10'>
				{/* Filter Section */}
				<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-4'>
					<div className='text-xs sm:text-sm text-gray-600 order-2 sm:order-1'>
						Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{' '}
						{data.length} expenses
					</div>

					<div className='flex flex-col sm:flex-row gap-2 sm:gap-4 order-1 sm:order-2'>
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
							index={startIndex + index}
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
			{isIncreaseModal && (
				<ClaimModal
					id={id}
					setIsIncreaseModal={setIsIncreaseModal}
					title=''
				/>
			)}
		</>
	);
};

export default Salaries;
