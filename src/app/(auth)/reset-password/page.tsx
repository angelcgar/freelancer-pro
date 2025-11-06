export default function ResetPasswordPage() {
	return (
		<main className="flex min-h-screen items-center justify-center px-4">
			<div className="max-w-md text-center space-y-4">
				<p className="text-lg text-gray-600">Este componente ha sido comentado - Reset Password</p>
			</div>
		</main>
	);
}

export default function ResetPasswordPage() {
	const [step, setStep] = useState<'request' | 'reset'>('request');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const emailId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		token: '', // This would come from URL params in real implementation
	});

	const handleRequestReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// TODO: Implement password reset request logic
		// This would typically send a request to your backend

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 2000));

		setIsLoading(false);
		// For demo purposes, move to reset step
		// In real implementation, this would show a success message
		setStep('reset');
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// TODO: Implement password reset logic
		// This would typically verify the token and update the password

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 2000));

		setIsLoading(false);
		// In real implementation, redirect to login with success message
	};

	if (step === 'request') {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					{/* Back to Login */}
					<div className="mb-8">
						<Link
							href="/login"
							className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Login
						</Link>
					</div>

					<Card className="shadow-lg">
						<CardHeader className="text-center">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Mail className="w-6 h-6 text-blue-600" />
							</div>
							<CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
							<CardDescription>
								Enter your email address and we'll send you a link to reset your password.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<form onSubmit={handleRequestReset} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={emailId}>Email Address</Label>
									<Input
										id={emailId}
										type="email"
										placeholder="Enter your email"
										value={formData.email}
										onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
										required
										disabled={isLoading}
									/>
								</div>

								<Button
									type="submit"
									className="w-full"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											Sending Reset Link...
										</>
									) : (
										'Send Reset Link'
									)}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-gray-600">
									Remember your password?{' '}
									<Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
										Sign in
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Help Text */}
					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500">
							Having trouble? Contact our{' '}
							<Link href="/contact" className="text-blue-600 hover:text-blue-500">
								support team
							</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Reset Password Form (when user clicks the reset link)
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Back to Login */}
				<div className="mb-8">
					<Link
						href="/login"
						className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Login
					</Link>
				</div>

				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Lock className="w-6 h-6 text-green-600" />
						</div>
						<CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
						<CardDescription>
							Enter your new password below. Make sure it's strong and secure.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleResetPassword} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor={passwordId}>New Password</Label>
								<div className="relative">
									<Input
										id={passwordId}
										type={showPassword ? 'text' : 'password'}
										placeholder="Enter new password"
										value={formData.password}
										onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
										required
										disabled={isLoading}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor={confirmPasswordId}>Confirm New Password</Label>
								<div className="relative">
									<Input
										id={confirmPasswordId}
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder="Confirm new password"
										value={formData.confirmPassword}
										onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
										required
										disabled={isLoading}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
							</div>

							{/* Password Requirements */}
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
								<ul className="text-xs text-gray-600 space-y-1">
									<li>• At least 8 characters</li>
									<li>• One uppercase letter</li>
									<li>• One lowercase letter</li>
									<li>• One number</li>
									<li>• One special character</li>
								</ul>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Updating Password...
									</>
								) : (
									'Update Password'
								)}
							</Button>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-gray-600">
								Remember your password?{' '}
								<Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
									Sign in
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
