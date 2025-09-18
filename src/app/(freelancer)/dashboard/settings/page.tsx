import { Save, Settings, User } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
	// TODO: Use React Hook Form
	// TODO: Get user data from Clerk
	const id = useId();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
					<p className="text-muted-foreground">
						Manage your account settings and preferences.
					</p>
				</div>
			</div>

			<div className="grid gap-6">
				{/* Profile Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Profile Information
						</CardTitle>
						<CardDescription>
							Update your personal information and profile details
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor={`${id}firstName`}>First Name</Label>
								<Input
									id={`${id}firstName`}
									placeholder="Enter your first name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}lastName`}>Last Name</Label>
								<Input
									id={`${id}lastName`}
									placeholder="Enter your last name"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor={`${id}email`}>Email</Label>
							<Input
								id={`${id}email`}
								type="email"
								placeholder="Enter your email"
								disabled
							/>
							<p className="text-sm text-muted-foreground">
								Email is managed by your authentication provider
							</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor={`${id}timezone`}>Timezone</Label>
							<Input id={`${id}timezone`} placeholder="UTC" />
						</div>
						<Button>
							<Save className="mr-2 h-4 w-4" />
							Save Changes
						</Button>
					</CardContent>
				</Card>

				{/* Business Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="h-5 w-5" />
							Business Settings
						</CardTitle>
						<CardDescription>
							Configure your business information and preferences
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor={`${id}businessName`}>Business Name</Label>
							<Input
								id={`${id}businessName`}
								placeholder="Enter your business name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor={`${id}businessAddress`}>Business Address</Label>
							<Input
								id={`${id}businessAddress`}
								placeholder="Enter your business address"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor={`${id}defaultHourlyRate`}>
									Default Hourly Rate
								</Label>
								<Input
									id={`${id}defaultHourlyRate`}
									type="number"
									placeholder="0.00"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}currency`}>Currency</Label>
								<Input id={`${id}currency`} placeholder="USD" />
							</div>
						</div>
						<Button>
							<Save className="mr-2 h-4 w-4" />
							Save Changes
						</Button>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>
							Manage your email and notification preferences
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Email Notifications</p>
									<p className="text-sm text-muted-foreground">
										Receive email updates about your projects and invoices
									</p>
								</div>
								<Button variant="outline" size="sm">
									Configure
								</Button>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Invoice Reminders</p>
									<p className="text-sm text-muted-foreground">
										Automatic reminders for overdue invoices
									</p>
								</div>
								<Button variant="outline" size="sm">
									Configure
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
