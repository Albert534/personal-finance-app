import { Button, Select, Table, type TableData, Input } from '@mantine/core';
import { useState, useMemo, useEffect } from 'react';
import { Pagination } from '@mantine/core';
import ClaimModal from './ClaimModal';
import { useGetSalary } from '../../apis/query/salaryQuery';
import { useUserDetailQuery } from '../../apis/query/user_detailQuery';
import { useUserDetailMutation } from '../../apis/mutation/userDetailMutation';
import EditModal from './EditModal';

const Salaries = () => {
	const { data: userData = [] } = useUserDetailQuery();
	const { mutate: editBalance } = useUserDetailMutation();

	console.log('data', userData);
	console.log('userData', userData.total_balance);

	// ✅ FIXED: Keep salary as string and initialize properly
	const [salary, setSalary] = useState('');

	// ✅ Initialize salary when userData loads
	useEffect(() => {
		if (userData[0]?.total_balance !== undefined) {
			setSalary(userData[0].total_balance.toString());
		}
	}, [userData]);

	console.log('salary', salary);

	const [activePage, setPage] = useState(1);
	const itemsPerPage = 10;
	const [isIncreaseModal, setIsIncreaseModal] = useState(false);
	const [isEditModal, setIsEditModal] = useState(false);
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState('');

	// Generate years from 2025 onwards (next 10 years)
	const incomingYears = [];
	const startYear = 2025;
	const yearsToGenerate = 10;

	for (let i = 0; i < yearsToGenerate; i++) {
		incomingYears.push((startYear + i).toString());
	}

	// 3-letter month formats

	// Get current year and month as defaults

	const { data = [] } = useGetSalary();

	// Action buttons component
	const ActionButtons = ({
		index,
		title,
	}: {
		index: number;
		title: string;
	}) => (
		<div className='flex gap-2'>
			<Button
				size='xs'
				variant='outline'
				className='!bg-green-600 hover:!bg-green-600/60 transition-all duration-200 !text-xs !border-none !text-white !px-3 text-24'
				onClick={() => handleEdit(index, title)}
			>
				Claim
			</Button>
		</div>
	);

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
		body: currentPageData.map(
			(
				row: { title: string; salary: number; isMonthly: boolean; id: number },
				index: number
			) => [
				row.title,
				row.salary,
				row.isMonthly ? 'Yes' : 'No',

				<ActionButtons
					index={row.id}
					key={startIndex + index}
					title={row.title}
				/>,
			]
		),
	};

	// Handle edit action
	const handleEdit = (index: number, title: string) => {
		console.log('Edit item at index:', index);
		setId(index);
		setIsIncreaseModal(true);
		setTitle(title);
	};

	// ✅ FIXED: Handle salary input change properly
	const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setSalary(value); // Keep as string
	};

	// ✅ FIXED: Handle form submission with proper validation
	const handleSalarySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsEditModal(true);
	};

	// Reset to page 1 when filters change

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
				<ActionButtons
					index={index}
					title={expense[0]}
				/>
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
				</div>

				{/* ✅ FIXED: Total Remaining Income Section */}
				<div className='mb-5 flex items-center gap-2 '>
					<span className='mb-1'>Total Remaining Income </span>

					<span>
						<form onSubmit={handleSalarySubmit}>
							<Input
								type='number'
								value={salary}
								onChange={handleSalaryChange}
								placeholder='Enter amount'
								className='!text-textBlack'
							/>
						</form>
					</span>
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
					{currentPageData.map((expense: string[], index: number) => (
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
					opened={isIncreaseModal}
					close={() => {
						setIsIncreaseModal(false);
					}}
					title={title}
				/>
			)}
			{isEditModal && (
				<EditModal
					opened={isEditModal}
					close={() => setIsEditModal(false)}
					salary={Number(salary)}
					title={title}
				/>
			)}
		</>
	);
};

export default Salaries;
