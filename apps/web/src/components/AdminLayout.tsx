import React, { useState } from 'react';

import Sidebar from '@/components/layouts/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

	const mainVariants = {
		expanded: {
			marginLeft: '18rem',
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 30,
			},
		},
		collapsed: {
			marginLeft: '6.5rem',
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 30,
			},
		},
	};

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeInOut' },
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.2, ease: 'easeInOut' },
		},
	};

	const pageVariants = {
		initial: { opacity: 0, x: -10 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 10 },
	};

	const pageTransition = {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.3,
	};
	return (
		<section className="bg-background text-foreground flex min-h-screen w-full">
			<Sidebar
				sidebarOpen={sidebarOpen}
				toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
			/>

			<AnimatePresence mode="wait">
				<motion.main
					key={sidebarOpen ? 'expanded' : 'collapsed'}
					variants={mainVariants}
					initial={false}
					animate={sidebarOpen ? 'expanded' : 'collapsed'}
					// className={`relative h-[calc(100vh-4rem)] w-full flex-1 overflow-y-auto p-4 transition-all duration-300 md:p-6 md:pt-4`}
					className={`relative min-h-dvh w-full flex-1 overflow-y-auto p-4 transition-all duration-300 md:p-6 md:pt-4`}
				>
					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={contentVariants}
						className="mx-auto h-full w-full"
					>
						<AnimatePresence mode="wait">
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								{children}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</motion.main>
			</AnimatePresence>
		</section>
	);
};

export default AdminLayout;
