import { Heart, Users, Target, Award, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
	{ number: '50K+', label: 'Active Freelancers' },
	{ number: '1M+', label: 'Projects Completed' },
	{ number: '150+', label: 'Countries' },
	{ number: '99.9%', label: 'Uptime' },
];

const values = [
	{
		icon: Heart,
		title: 'Freelancer First',
		description: 'Everything we build is designed with freelancers in mind. Your success is our success.',
		color: 'bg-red-100 text-red-600',
	},
	{
		icon: Zap,
		title: 'Simplicity',
		description: 'Complex problems deserve simple solutions. We make business management effortless.',
		color: 'bg-yellow-100 text-yellow-600',
	},
	{
		icon: Globe,
		title: 'Global Community',
		description: 'We believe in connecting freelancers worldwide and breaking down geographical barriers.',
		color: 'bg-blue-100 text-blue-600',
	},
	{
		icon: CheckCircle,
		title: 'Reliability',
		description: 'Your business depends on us, so we build with enterprise-grade reliability and security.',
		color: 'bg-green-100 text-green-600',
	},
];

const team = [
	{
		name: 'Sarah Chen',
		role: 'CEO & Co-founder',
		bio: 'Former freelance designer who experienced the pain of managing clients and projects firsthand.',
		image: '👩‍💼',
	},
	{
		name: 'Marcus Rodriguez',
		role: 'CTO & Co-founder',
		bio: 'Ex-Google engineer passionate about building tools that empower independent workers.',
		image: '👨‍💻',
	},
	{
		name: 'Emily Watson',
		role: 'Head of Product',
		bio: 'Product strategist with 10+ years experience building user-centric business tools.',
		image: '👩‍🎨',
	},
	{
		name: 'David Kim',
		role: 'Head of Engineering',
		bio: 'Full-stack architect focused on scalable, secure, and performant systems.',
		image: '👨‍🔧',
	},
];

const milestones = [
	{
		year: '2020',
		title: 'The Beginning',
		description: 'Founded by two freelancers frustrated with existing tools',
	},
	{
		year: '2021',
		title: 'First 1,000 Users',
		description: 'Reached our first milestone with overwhelmingly positive feedback',
	},
	{
		year: '2022',
		title: 'Series A Funding',
		description: 'Raised $10M to accelerate product development and team growth',
	},
	{
		year: '2023',
		title: 'Global Expansion',
		description: 'Launched in 50+ countries with multi-language support',
	},
	{
		year: '2024',
		title: 'AI Integration',
		description: 'Introduced AI-powered features for smarter business insights',
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
			<div className="container mx-auto px-4 py-16">
				{/* Hero Section */}
				<div className="text-center mb-20">
					<Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
						About FreelancePro
					</Badge>
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
						Empowering Freelancers
						<br />
						<span className="text-purple-600">Worldwide</span>
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						We're on a mission to give every freelancer and small business owner the tools 
						they need to succeed. Born from our own freelancing struggles, FreelancePro is 
						built by freelancers, for freelancers.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="bg-purple-600 hover:bg-purple-700">
							Start Your Journey
						</Button>
						<Button size="lg" variant="outline">
							Watch Our Story
						</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
								{stat.number}
							</div>
							<div className="text-gray-600 font-medium">{stat.label}</div>
						</div>
					))}
				</div>

				{/* Mission Statement */}
				<Card className="mb-20 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
					<CardContent className="pt-12 pb-12 text-center">
						<Target className="w-16 h-16 text-purple-600 mx-auto mb-6" />
						<h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
						<p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
							To democratize business management tools and make professional-grade 
							project management, invoicing, and client relationship tools accessible 
							to every freelancer and small business owner, regardless of their size or budget.
						</p>
					</CardContent>
				</Card>

				{/* Our Values */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Our Values
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							The principles that guide everything we do
						</p>
					</div>
					
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value) => (
							<Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
								<CardHeader>
									<div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}>
										<value.icon className="w-8 h-8" />
									</div>
									<CardTitle className="text-xl">{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">{value.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Our Story Timeline */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Our Journey
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							From a small idea to a global platform
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						{milestones.map((milestone, index) => (
							<div key={milestone.year} className="flex items-start mb-8 last:mb-0">
								<div className="flex-shrink-0 w-20 text-right mr-8">
									<div className="text-2xl font-bold text-purple-600">{milestone.year}</div>
								</div>
								<div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-2 mr-8 relative">
									{index < milestones.length - 1 && (
										<div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-purple-200"></div>
									)}
								</div>
								<div className="flex-grow">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
									<p className="text-gray-600">{milestone.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Team Section */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Meet Our Team
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							The passionate people behind FreelancePro
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{team.map((member) => (
							<Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
								<CardHeader>
									<div className="text-6xl mb-4">{member.image}</div>
									<CardTitle className="text-xl">{member.name}</CardTitle>
									<CardDescription className="text-purple-600 font-medium">
										{member.role}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 text-sm">{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Recognition */}
				<Card className="mb-20 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
					<CardContent className="pt-12 pb-12 text-center">
						<Award className="w-16 h-16 text-amber-600 mx-auto mb-6" />
						<h2 className="text-3xl font-bold text-gray-900 mb-6">Recognition</h2>
						<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									Best Freelance Tool 2024
								</h3>
								<p className="text-gray-600">Freelancer's Choice Awards</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									Top 50 SaaS Startups
								</h3>
								<p className="text-gray-600">TechCrunch 2023</p>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									4.9/5 User Rating
								</h3>
								<p className="text-gray-600">Based on 10,000+ reviews</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Join Us Section */}
				<div className="text-center mb-20">
					<Card className="max-w-4xl mx-auto border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
						<CardContent className="pt-12 pb-12">
							<Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Join Our Growing Team
							</h2>
							<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
								We're always looking for talented individuals who share our passion 
								for empowering freelancers and small businesses.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
									View Open Positions
								</Button>
								<Button size="lg" variant="outline">
									Learn About Our Culture
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<Card className="max-w-4xl mx-auto border-purple-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
						<CardContent className="pt-12 pb-12">
							<h2 className="text-3xl font-bold mb-4">
								Ready to Transform Your Freelance Business?
							</h2>
							<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
								Join thousands of freelancers who have already streamlined their 
								business operations with FreelancePro.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
									Start Free Trial
									<ArrowRight className="ml-2 w-4 h-4" />
								</Button>
								<Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
									Schedule a Demo
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
