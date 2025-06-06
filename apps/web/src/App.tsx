import React, { Suspense } from 'react';
import './App.css';
import { Loader } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router';
import AdminDashboard from './pages/app/Dashboard/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import { Toaster } from './components/ui/sonner';
import AppLauncher from './pages/app/Dashboard/AppLauncher';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from './pages/NotFound';
import Index from './pages/home/Index';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import CustomerDetails from './pages/app/Customer/CustomerDetails';
import LoginPage from './pages/auth/Login';
import { AuthProvider } from './context/AuthContext';
import ProductDetails from './pages/app/Products/ProductDetails';
import MediaManagement from './pages/app/Media/MediaManagement';
import MediaDetails from './pages/app/Media/MediaDetails';

const queryClient = new QueryClient();
function App() {
	const SignUp = React.lazy(() => import('./pages/auth/Signup'));
	const ForgotPassword = React.lazy(
		() => import('./pages/auth/ForgotPassword')
	);
	const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
	const StoreSelection = React.lazy(
		() => import('./pages/app/Store/StoreSelection')
	);
	const CreateStore = React.lazy(() => import('./pages/app/Store/CreateStore'));
	const Settings = React.lazy(
		() => import('./pages/settings/settings/Settings')
	);
	const ProductManagement = React.lazy(
		() => import('./pages/app/Products/ProductManagement')
	);
	const CreateNewProduct = React.lazy(
		() => import('./pages/app/Products/CreateNewProduct')
	);
	const OrderManagement = React.lazy(
		() => import('./pages/app/Orders/OrderManagement')
	);
	const InventoryManagement = React.lazy(
		() => import('./pages/app/Inventory/InventoryManagement')
	);
	const Notifications = React.lazy(
		() => import('./pages/settings/notifications/Notifications')
	);
	const CustomerManagement = React.lazy(
		() => import('./pages/app/Customer/CustomerManagement')
	);

	const Loading = () => (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center">
				<Loader className="text-primary mb-4 h-10 w-10 animate-spin" />
				<p className="text-lg font-medium">Loading...</p>
			</div>
		</div>
	);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<Toaster />
					<Suspense fallback={<Loading />}>
						<Routes>
							{/* Public routes */}
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/unauthorized" element={<Unauthorized />} />
							<Route path="*" element={<NotFound />} />
							<Route path="/" element={<Index />} />

							{/* Protected admin routes */}
							<Route
								path="/store"
								element={
									<ProtectedRoute>
										<StoreSelection />
									</ProtectedRoute>
								}
							/>
							<Route path="/store/undefined" element={<NotFound />} />
							<Route
								path="/store/create"
								element={
									<ProtectedRoute>
										<CreateStore />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<AppLauncher />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/dashboard"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<AdminDashboard />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/products"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<ProductManagement />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/products/create"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<CreateNewProduct />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/products/:id"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<ProductDetails />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/orders"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<OrderManagement />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/inventory"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<InventoryManagement />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/media"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<MediaManagement />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/media/:fileId"
								element={
									<ProtectedRoute>
										<MediaDetails />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:id/settings"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<Settings />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/notifications"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<Notifications />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/customers"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<CustomerManagement />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
							<Route
								path="/store/:storeId/customers/:customerId"
								element={
									<ProtectedRoute>
										<AdminLayout>
											<CustomerDetails />
										</AdminLayout>
									</ProtectedRoute>
								}
							/>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
