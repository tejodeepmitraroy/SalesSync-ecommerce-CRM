import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { loginPageSchema } from '@/features/users/schema';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { loginService } from '@/features/users/services';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { setUser, user } = useAuth();

	// 1. Define your form.
	const form = useForm<z.infer<typeof loginPageSchema>>({
		resolver: zodResolver(loginPageSchema),
		defaultValues: {
			email: 'tejodeepmitraroy2002@gmail.com',
			password: 'Tejodeep@2002',
		},
	});

	async function onSubmit(values: z.infer<typeof loginPageSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsLoading(true);

		try {
			console.log(values);

			// Simulate login API call
			const response = await loginService({
				email: values.email,
				password: values.password,
			});

			setUser(response.data.data.user);

			console.log(response);

			toast('Login successful!', {
				description: 'Welcome back to VendorSphere',
			});
			navigate(`/store`);
		} catch (error) {
			console.log(error);
			toast('Login failed', {
				description: 'Invalid email or password. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	}

	const toggleShowPassword = () => setShowPassword(!showPassword);

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate('/store', { replace: true });
		}
	}, [user, navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md py-10">
				<CardHeader className="px-10">
					<section className="mb-5 flex items-center gap-2">
						<img
							src="/icons/logo.png"
							alt=""
							className="border-primary h-10 w-10 rounded-lg border"
						/>
					</section>
					<CardTitle className="text-left text-2xl font-bold">Login</CardTitle>
					<CardDescription className="text-left">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent className="px-10">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel htmlFor="email">Email</FormLabel>
										<FormControl>
											<Input
												id="email"
												type="email"
												placeholder="admin@example.com"
												{...field}
												required
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="space-y-2">
								<div className="flex justify-between">
									<Label htmlFor="password">Password</Label>
									<Link to="/forgot-password" className="text-primarynderline">
										Forgot password?
									</Link>
								</div>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="space-y-2">
											{/* <FormLabel htmlFor="password">Email</FormLabel> */}
											<div className="relative">
												<FormControl>
													<Input
														id="password"
														type={showPassword ? 'text' : 'password'}
														placeholder="••••••••"
														{...field}
														required
													/>
												</FormControl>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute top-0 right-0"
													onClick={toggleShowPassword}
												>
													{showPassword ? (
														<EyeOff size={16} />
													) : (
														<Eye size={16} />
													)}
												</Button>
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<span className="flex items-center gap-2">
										<Lock className="h-4 w-4 animate-pulse" />
										Logging in...
									</span>
								) : (
									<span className="flex items-center gap-2">
										<LogIn className="h-4 w-4" />
										Login
									</span>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2 px-10">
					<div className="text-center text-sm">
						Don't have an account?{' '}
						<Link to="/signup" className="text-primary hover:underline">
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginPage;
