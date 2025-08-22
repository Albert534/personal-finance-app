import { createRootRoute, Outlet } from '@tanstack/react-router';
import ScrollToTop from '../utils/ScrollToTop';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Drawer, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthenticationStore } from '../store/authenticationStore';
import { useMeQuery } from '../apis/query/meQuery';
import { useUserStore } from '../store/userStore';
export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const navigate = useNavigate();
	const { setUser } = useUserStore();
	const isAuthenticated = useAuthenticationStore(
		(state) => state.authenticated
	);
	const { data } = useMeQuery(isAuthenticated);
	console.log('This is data', data?.userInfo[0]);
	// NEW: splash loading state
	const [loadingAfterLogin, setLoadingAfterLogin] = useState(false);

	// Trigger 3s loading only when user just logged in
	useEffect(() => {
		if (isAuthenticated) {
			setLoadingAfterLogin(true);

			const timer = setTimeout(() => setLoadingAfterLogin(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [isAuthenticated]);

	// Redirect unauthenticated users
	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: '/login' });
		}
	}, [isAuthenticated, navigate]);

	const [open, setOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
	useEffect(() => {
		if (data?.userInfo?.[0]) {
			setUser(data.userInfo[0]);
		}
	}, [data, setUser]);

	// Handle screen resize
	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Handle protected routes
	useEffect(() => {
		const unprotected = [
			'/login',
			'/signup',
			'/forgotPassword',
			'/change_password',
			'/verify',
		];

		const currentPath = window.location.pathname;

		if (!isAuthenticated && !unprotected.includes(currentPath)) {
			navigate({ to: '/login', search: { redirect: currentPath } });
		}

		if (isAuthenticated && unprotected.includes(currentPath)) {
			navigate({ to: '/' });
		}
	}, [isAuthenticated, navigate]);

	const handleLogout = () => {
		localStorage.removeItem('logged');
		navigate({ to: '/login' });
	};

	// Show auth routes only (login/signup, etc.)
	if (!isAuthenticated) return <Outlet />;

	// Show 3 sec splash loader after login
	if (loadingAfterLogin) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-secondary text-white'>
				<Loader
					color='white'
					size='lg'
				/>
				<span className='ml-3 text-lg'>Loading your dashboard...</span>
			</div>
		);
	}

	// Sidebar links
	const NavLinks = ({ onClick }: { onClick?: () => void }) => (
		<>
			<Link
				to='/'
				onClick={onClick}
				className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
			>
				Dashboard
			</Link>
			<Link
				to='/job-information'
				onClick={onClick}
				className='text-white [&.active]:bg-primary  [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md font-medium'
			>
				Job Information
			</Link>
			<Link
				to='/percentages'
				onClick={onClick}
				className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
			>
				Percentages
			</Link>
			<Link
				to='/expenses'
				onClick={onClick}
				className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
			>
				Expenses
			</Link>
			<Link
				to='/total'
				onClick={onClick}
				className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
			>
				Total
			</Link>
			<Link
				to='/salaries'
				onClick={onClick}
				className='[&.active]:bg-primary [&.active]:text-black transition-all duration-200 hover:bg-secondary/50 p-3 rounded-md text-white font-medium'
			>
			  Salaries
			</Link>
		</>
	);

	// Authenticated dashboard layout
	return (
		<div className='flex min-h-screen'>
			{/* Sidebar for larger screens */}
			<div className='hidden md:flex flex-col fixed top-0 left-0 h-screen w-[240px] bg-secondary border-r border-gray-200 z-30'>
				<div className='p-4 border-b border-gray-300/20'>
					<div className='text-2xl font-semibold text-white'>
						My Finance App
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-4'>
					<nav className='flex flex-col gap-3'>
						<NavLinks />
					</nav>
				</div>

				<div
					className='p-4 text-white font-medium cursor-pointer hover:text-red-500'
					onClick={handleLogout}
				>
					<span className='flex gap-2'>
						<BsArrowLeft className='mt-0.5' /> Log Out
					</span>
				</div>
			</div>

			{/* Mobile menu button + drawer */}
			{isSmallScreen && (
				<>
					<div className='fixed top-4 left-4 z-50 md:hidden'>
						<Button
							onClick={() => setOpen(true)}
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
						onClose={() => setOpen(false)}
						size='280px'
						styles={{
							content: { backgroundColor: '#513f32' },
							header: {
								backgroundColor: '#513f32',
								color: 'white',
								fontSize: 30,
							},
							title: { color: 'white', fontSize: 28, fontWeight: 600 },
							close: {
								color: 'white',
								backgroundColor: 'inherit',
								marginTop: 5,
							},
						}}
						title='My Finance App'
					>
						<div className='mt-5 flex flex-col gap-4 text-white/90'>
							<NavLinks onClick={() => setOpen(false)} />
						</div>
						<div
							className='text-white font-medium hover:text-red-500 cursor-pointer absolute bottom-0 mb-3'
							onClick={handleLogout}
						>
							<span className='flex gap-2'>
								<BsArrowLeft className='mt-0.5' /> Log Out
							</span>
						</div>
					</Drawer>
				</>
			)}

			{/* Main content */}
			<div className='flex-1 md:ml-[240px] mt-14 md:mt-6'>
				<div className='px-4 sm:px-6 lg:px-8 pb-5 pt-1'>
					<ScrollToTop>
						<Outlet />
					</ScrollToTop>
				</div>
			</div>
		</div>
	);
}
