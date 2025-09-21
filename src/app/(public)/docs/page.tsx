import { Book, Search, ArrowRight, Play, FileText, Users, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const quickStartGuides = [
	{
		title: 'Getting Started',
		description: 'Set up your account and create your first project',
		icon: Play,
		time: '5 min',
		difficulty: 'Beginner',
	},
	{
		title: 'Project Management',
		description: 'Learn how to organize and track your projects',
		icon: FileText,
		time: '10 min',
		difficulty: 'Beginner',
	},
	{
		title: 'Time Tracking',
		description: 'Track time efficiently and generate accurate reports',
		icon: Zap,
		time: '8 min',
		difficulty: 'Intermediate',
	},
	{
		title: 'Team Collaboration',
		description: 'Invite team members and manage permissions',
		icon: Users,
		time: '12 min',
		difficulty: 'Advanced',
	},
];

const categories = [
	{
		title: 'Getting Started',
		description: 'Everything you need to know to get up and running',
		articles: 12,
		icon: Play,
		color: 'bg-green-100 text-green-600',
	},
	{
		title: 'Project Management',
		description: 'Organize your work and track progress effectively',
		articles: 18,
		icon: FileText,
		color: 'bg-blue-100 text-blue-600',
	},
	{
		title: 'Invoicing & Billing',
		description: 'Create professional invoices and manage payments',
		articles: 15,
		icon: FileText,
		color: 'bg-purple-100 text-purple-600',
	},
	{
		title: 'Time Tracking',
		description: 'Track time accurately and generate detailed reports',
		articles: 10,
		icon: Zap,
		color: 'bg-yellow-100 text-yellow-600',
	},
	{
		title: 'Team Management',
		description: 'Collaborate with team members and clients',
		articles: 8,
		icon: Users,
		color: 'bg-indigo-100 text-indigo-600',
	},
	{
		title: 'Settings & Configuration',
		description: 'Customize FreelancePro to fit your workflow',
		articles: 14,
		icon: Settings,
		color: 'bg-gray-100 text-gray-600',
	},
];

const popularArticles = [
	'How to create your first project',
	'Setting up automated invoicing',
	'Tracking time with the mobile app',
	'Inviting clients to view project progress',
	'Generating financial reports',
	'Customizing invoice templates',
	'Setting up payment gateways',
	'Managing team permissions',
];

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center mb-4">
						<Book className="w-12 h-12 text-blue-600" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Documentation
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						Learn how to make the most of FreelancePro with our comprehensive guides, 
						tutorials, and API documentation.
					</p>
					
					{/* Search Bar */}
					<div className="max-w-md mx-auto relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						<Input 
							placeholder="Search documentation..." 
							className="pl-10 h-12 text-lg"
						/>
					</div>
				</div>

				{/* Quick Start Guides */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Quick Start Guides
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{quickStartGuides.map((guide) => (
							<Card key={guide.title} className="hover:shadow-lg transition-shadow cursor-pointer">
								<CardHeader className="pb-4">
									<div className="flex items-center justify-between mb-2">
										<guide.icon className="w-8 h-8 text-blue-600" />
										<div className="flex gap-2">
											<Badge variant="outline" className="text-xs">
												{guide.time}
											</Badge>
											<Badge 
												variant={guide.difficulty === 'Beginner' ? 'secondary' : 
													guide.difficulty === 'Intermediate' ? 'default' : 'destructive'}
												className="text-xs"
											>
												{guide.difficulty}
											</Badge>
										</div>
									</div>
									<CardTitle className="text-lg">{guide.title}</CardTitle>
									<CardDescription>{guide.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="ghost" className="w-full justify-between p-0">
										Start Guide
										<ArrowRight className="w-4 h-4" />
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Documentation Categories */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Browse by Category
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.map((category) => (
							<Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
								<CardHeader>
									<div className="flex items-center justify-between mb-4">
										<div className={`p-3 rounded-lg ${category.color}`}>
											<category.icon className="w-6 h-6" />
										</div>
										<Badge variant="secondary">
											{category.articles} articles
										</Badge>
									</div>
									<CardTitle className="text-xl">{category.title}</CardTitle>
									<CardDescription>{category.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant="ghost" className="w-full justify-between p-0">
										Browse Articles
										<ArrowRight className="w-4 h-4" />
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Popular Articles & API Reference */}
				<div className="grid lg:grid-cols-2 gap-12 mb-16">
					{/* Popular Articles */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Popular Articles</CardTitle>
							<CardDescription>
								Most viewed articles by our community
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{popularArticles.map((article, index) => (
									<div key={article} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
										<div className="flex items-center">
											<span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
												{index + 1}
											</span>
											<span className="text-gray-700">{article}</span>
										</div>
										<ArrowRight className="w-4 h-4 text-gray-400" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* API Reference */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">API Reference</CardTitle>
							<CardDescription>
								Integrate FreelancePro with your existing tools
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
									<h4 className="font-semibold text-gray-900 mb-2">REST API</h4>
									<p className="text-sm text-gray-600 mb-3">
										Complete REST API documentation with examples
									</p>
									<div className="flex gap-2">
										<Badge variant="outline">v2.0</Badge>
										<Badge variant="secondary">OpenAPI 3.0</Badge>
									</div>
								</div>
								
								<div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
									<h4 className="font-semibold text-gray-900 mb-2">Webhooks</h4>
									<p className="text-sm text-gray-600 mb-3">
										Real-time notifications for your applications
									</p>
									<div className="flex gap-2">
										<Badge variant="outline">Real-time</Badge>
										<Badge variant="secondary">Secure</Badge>
									</div>
								</div>
								
								<div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
									<h4 className="font-semibold text-gray-900 mb-2">SDKs</h4>
									<p className="text-sm text-gray-600 mb-3">
										Official SDKs for popular programming languages
									</p>
									<div className="flex gap-2">
										<Badge variant="outline">JavaScript</Badge>
										<Badge variant="outline">Python</Badge>
										<Badge variant="outline">PHP</Badge>
									</div>
								</div>
							</div>
							
							<Button className="w-full">
								View API Documentation
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Help & Support */}
				<div className="text-center">
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-8 pb-8">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Need More Help?
							</h2>
							<p className="text-xl text-gray-600 mb-8">
								Can't find what you're looking for? Our support team is here to help.
							</p>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="text-center">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
										<FileText className="w-6 h-6 text-blue-600" />
									</div>
									<h3 className="font-semibold mb-2">Submit a Ticket</h3>
									<p className="text-sm text-gray-600 mb-4">
										Get personalized help from our support team
									</p>
									<Button variant="outline" size="sm">
										Create Ticket
									</Button>
								</div>
								
								<div className="text-center">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
										<Users className="w-6 h-6 text-green-600" />
									</div>
									<h3 className="font-semibold mb-2">Community Forum</h3>
									<p className="text-sm text-gray-600 mb-4">
										Connect with other FreelancePro users
									</p>
									<Button variant="outline" size="sm">
										Join Forum
									</Button>
								</div>
								
								<div className="text-center">
									<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
										<Zap className="w-6 h-6 text-purple-600" />
									</div>
									<h3 className="font-semibold mb-2">Live Chat</h3>
									<p className="text-sm text-gray-600 mb-4">
										Get instant help during business hours
									</p>
									<Button variant="outline" size="sm">
										Start Chat
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
