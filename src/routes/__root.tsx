// src/routes/__root.tsx
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import ScrollToTop from '../utils/ScrollToTop';
import { Link } from '@tanstack/react-router';
import { Button, Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { BsArrowLeft} from 'react-icons/bs';


export const Route = createRootRoute({
	

	beforeLoad: ({ location }) => {
		let isAuthenticated ;
		const islocal = localStorage.getItem('logged');
		if(islocal === 'true'){
			isAuthenticated = true;
			
		}
		else {
			isAuthenticated = false;
		}
		
		 // Replace with your actual auth check
		const unprotected = [
			'/login',
			'/signup',
			'/forgotPassword',
			'/change_password',
			'/verify',
		];

		// Redirect unauthenticated users to login (except for auth pages)
		if (!isAuthenticated && !unprotected.includes(location.pathname)) {
			throw redirect({
				to: '/login',
				search: { redirect: location.pathname },
			});
		}

		// Redirect authenticated users away from auth pages to dashboard
		if (isAuthenticated && unprotected.includes(location.pathname)) {
			throw redirect({
				to: '/',
			});
		}
	},
	component: RootComponent,
});

function RootComponent() {
let isAuthenticated ;
		const islocal = localStorage.getItem('logged');
		if(islocal === 'true'){
			isAuthenticated = true;
			
		}
		else {
			isAuthenticated = false;
		}
		console.log('isAuthenticated', isAuthenticated);
	const [open, setOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	useEffect(() => {}, []);

	// If not authenticated, just show auth routes (login/signup will be rendered by Outlet)
	if (!isAuthenticated) {
		return <Outlet />;
	}

	console.log(isSmallScreen);

	// Authenticated dashboard layout
	return (
		<>
			<div className='flex min-h-screen'>
				{/* Fixed Sidebar for larger screens */}
				<div className='hidden md:flex flex-col fixed top-0 left-0 h-screen w-[240px] bg-secondary border-r border-gray-200 z-30'>
					{/* Sidebar header */}
					<div className='p-4 border-b border-gray-300/20'>
						<div className='text-2xl text-text font-semibold text-white'>
							My Finance App
						</div>
					</div>

					{/* Sidebar navigation - scrollable if needed */}
					<div className='flex-1 overflow-y-auto p-4'>
						<nav className='flex flex-col gap-3'>
							<Link
								to='/'
								className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
							>
								Dashboard
							</Link>
              		<Link
									to='/job-information'
									onClick={() => setOpen(false)}
									className='text-white [&.active]:bg-primary  [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Job Information
								</Link>
							<Link
								to='/percentages'
								className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
							>
								Percentages
							</Link>
							<Link
								to='/expenses'
								className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
							>
								Expenses
							</Link>
							<Link
								to='/total'
								className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
							>
								Total
							</Link>
						</nav>
            
					</div>
          <div className='p-4 text-white font-medium' onClick={() => console.log('Logout')}>
    <span className='flex gap-2 hover:text-red-500 cursor-pointer'><div className='mt-0.5'><BsArrowLeft/></div>Log Out</span>
  </div>
				</div>

				{/* Mobile menu button and drawer */}
				{isSmallScreen && (
					<>
						<div className='fixed top-4 left-4 z-50 md:hidden'>
							<Button
								onClick={() => {
									setOpen(true);
								}}
								className='!w-fit !p-2 !bg-secondary hover:!bg-secondary/50 transition-all duration-200 shadow-lg'
							>
								<IconMenu2 />
							</Button>
						</div>

						<Drawer
							offset={6}
							radius='none'
							position='left'
							opened={open}
							onClose={() => {
								setOpen(false);
							}}
							size='280px'
							styles={{
								content: {
									backgroundColor: '#513f32',
								},
								header: {
									backgroundColor: '#513f32',
									color: 'white',
									fontSize: 30,
								},
								title: {
									color: 'white',
									fontSize: 28,
									fontWeight: 600,
								},
								close: {
									color: 'white',
									backgroundColor: 'inherit',
									pointerEvents: 'auto',
									marginTop: 5,
								},
							}}
							title='My Finance App'
						>
							<div className='mt-5 flex flex-col gap-4 text-white/90'>
								<Link
									to='/'
									onClick={() => setOpen(false)}
									className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Dashboard
								</Link>


                	<Link
									to='/job-information'
									onClick={() => setOpen(false)}
									className='[&.active]:bg-primary  [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Job
								</Link>
								<Link
									to='/percentages'
									onClick={() => setOpen(false)}
									className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Percentages
								</Link>
								<Link
									to='/expenses'
									onClick={() => setOpen(false)}
									className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Usages
								</Link>
								<Link
									to='/total'
									onClick={() => setOpen(false)}
									className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
								>
									Total
								</Link>
     
							</div>
                   <div className=' text-white font-medium hover:text-red-500 cursor-pointer absolute bottom-0' onClick={() => console.log('Logout')}>
    <span className='flex gap-2 mb-2'><div className='mt-0.5'><BsArrowLeft/></div>Log Out</span>
  </div>
						</Drawer>
            
					</>
				)}

				{/* Main content area - with left margin to account for fixed sidebar */}
				<div className='flex-1 md:ml-[240px]  mt-14 md:mt-6'>
					{/* Mobile top spacing to account for floating menu button */}
					<div className='px-4 sm:px-6 lg:px-8 pb-5 pt-1'>
						<ScrollToTop>
							<Outlet />
						</ScrollToTop>
					</div>
				</div>
			</div>
		</>
	);
}
