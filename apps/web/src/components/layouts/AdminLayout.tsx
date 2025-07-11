import { Link, Outlet, useParams } from 'react-router';
import { Bell } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../Sidebar/app-sidebar';
import { Button } from '../ui/button';

const AdminLayout = () => {
	// const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
	const { storeId } = useParams<{ storeId: string }>();
	// const setSelectedStore = useStoreStore((state) => state.setSelectedStore);

	// const mainVariants = {
	// 	expanded: {
	// 		marginLeft: '18rem',
	// 		transition: {
	// 			type: 'spring',
	// 			stiffness: 200,
	// 			damping: 30,
	// 		},
	// 	},
	// 	collapsed: {
	// 		marginLeft: '6.5rem',
	// 		transition: {
	// 			type: 'spring',
	// 			stiffness: 200,
	// 			damping: 30,
	// 		},
	// 	},
	// };

	// const contentVariants = {
	// 	initial: { opacity: 0 },
	// 	animate: {
	// 		opacity: 1,
	// 		transition: { duration: 0.3, ease: 'easeInOut' },
	// 	},
	// 	exit: {
	// 		opacity: 0,
	// 		transition: { duration: 0.2, ease: 'easeInOut' },
	// 	},
	// };

	// const pageVariants = {
	// 	initial: { opacity: 0, x: -10 },
	// 	animate: { opacity: 1, x: 0 },
	// 	exit: { opacity: 0, x: 10 },
	// };

	// const pageTransition = {
	// 	type: 'tween',
	// 	ease: 'easeInOut',
	// 	duration: 0.3,
	// };

	// const getStoreDataById = useCallback(async () => {
	// 	try {
	// 		if (!storeId) return;
	// 		// const store = await getStoreDetails({ storeId: storeId });
	// 		// setSelectedStore(store);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, [setSelectedStore, storeId]);

	// useEffect(() => {
	// 	getStoreDataById();
	// }, [getStoreDataById]);

	return (
		<section className="bg-background text-foreground flex min-h-screen w-full">
			{/* <Sidebar
				sidebarOpen={sidebarOpen}
				toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
			/>

			<ChatButton />

			<AnimatePresence mode="wait">
				<motion.main
					key={sidebarOpen ? 'expanded' : 'collapsed'}
					variants={mainVariants}
					initial={false}
					animate={sidebarOpen ? 'expanded' : 'collapsed'}
					// className={`relative h-[calc(100vh-4rem)] w-full flex-1 overflow-y-auto p-4 transition-all duration-300 md:p-6 md:pt-4`}
					className={`relative min-h-dvh w-full overflow-hidden bg-white transition-all duration-300 md:flex-1`}
				>
					<header className="z-50 w-full border-b bg-white py-2">
						<section className="mx-auto flex w-full items-center justify-end gap-5 px-10">
							<Link
								to={`/store/${storeId}/notifications`}
								className="flex h-9 w-9 items-center justify-center rounded-lg border"
							>
								<Bell className="h-5 w-5" />
							</Link>

							<DropdownMenu>
								<DropdownMenuTrigger>
									<div className="flex items-center gap-2">
										<Avatar className="h-9 w-9 rounded-lg border">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<Label className="text-sm font-medium">John Doe</Label>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Billing</DropdownMenuItem>
									<DropdownMenuItem>Team</DropdownMenuItem>
									<DropdownMenuItem>Subscription</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</section>
					</header>

					<motion.section
						initial="initial"
						animate="animate"
						exit="exit"
						variants={contentVariants}
						className="mx-auto h-full w-full overflow-y-auto p-4 md:p-6 md:pt-4"
					>
						<AnimatePresence mode="wait">
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								<Outlet />
							</motion.div>
						</AnimatePresence>
					</motion.section>
				</motion.main>
			</AnimatePresence> */}
			<SidebarProvider>
				<AppSidebar />
				<main
					className={`relative min-h-dvh w-full overflow-hidden bg-white transition-all duration-300 md:flex-1`}
				>
					<header className="fixed z-50 w-full border-b bg-white py-2">
						<section className="mx-auto flex w-full items-center justify-between gap-5 px-10">
							<Button variant="ghost" size="icon">
								<SidebarTrigger />
							</Button>
							<Link
								to={`/store/${storeId}/notifications`}
								className="flex h-9 w-9 items-center justify-center rounded-lg border"
							>
								<Bell className="h-5 w-5" />
							</Link>
						</section>
					</header>
					<section className="mx-auto mt-12 h-full w-full overflow-y-auto p-4 md:p-6 md:pt-4">
						<Outlet />
					</section>
				</main>
			</SidebarProvider>
		</section>
	);
};

export default AdminLayout;
