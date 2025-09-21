import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
	{
		name: 'Starter',
		description: 'Perfect for freelancers just getting started',
		price: 0,
		period: 'month',
		features: [
			'Up to 5 projects',
			'Basic time tracking',
			'Simple invoicing',
			'Client management',
			'Email support',
		],
		limitations: ['No advanced reporting', 'Limited integrations'],
		popular: false,
	},
	{
		name: 'Professional',
		description: 'For established freelancers and small agencies',
		price: 29,
		period: 'month',
		features: [
			'Unlimited projects',
			'Advanced time tracking',
			'Professional invoicing',
			'Contract management',
			'Advanced reporting',
			'Priority support',
			'Team collaboration',
			'Custom branding',
		],
		limitations: [],
		popular: true,
	},
	{
		name: 'Enterprise',
		description: 'For large teams and agencies',
		price: 99,
		period: 'month',
		features: [
			'Everything in Professional',
			'White-label solution',
			'Advanced integrations',
			'Custom workflows',
			'Dedicated account manager',
			'SLA guarantee',
			'Advanced security',
			'API access',
		],
		limitations: [],
		popular: false,
	},
];

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Simple, Transparent Pricing
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Choose the perfect plan for your freelance business. Start free and
						upgrade as you grow.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`relative ${
								plan.popular
									? 'border-blue-500 shadow-lg scale-105'
									: 'border-gray-200'
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<Badge className="bg-blue-500 text-white px-4 py-1">
										Most Popular
									</Badge>
								</div>
							)}

							<CardHeader className="text-center pb-8">
								<CardTitle className="text-2xl font-bold">
									{plan.name}
								</CardTitle>
								<CardDescription className="text-gray-600 mt-2">
									{plan.description}
								</CardDescription>
								<div className="mt-6">
									<span className="text-4xl font-bold text-gray-900">
										${plan.price}
									</span>
									<span className="text-gray-600 ml-2">/{plan.period}</span>
								</div>
							</CardHeader>

							<CardContent className="space-y-6">
								{/* Features */}
								<div className="space-y-3">
									{plan.features.map((feature) => (
										<div key={feature} className="flex items-center">
											<Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
											<span className="text-gray-700">{feature}</span>
										</div>
									))}
								</div>

								{/* Limitations */}
								{plan.limitations.length > 0 && (
									<div className="space-y-3 pt-4 border-t border-gray-200">
										{plan.limitations.map((limitation) => (
											<div key={limitation} className="flex items-center">
												<span className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0">
													×
												</span>
												<span className="text-gray-500 text-sm">
													{limitation}
												</span>
											</div>
										))}
									</div>
								)}

								{/* CTA Button */}
								<Button
									className={`w-full mt-8 ${
										plan.popular
											? 'bg-blue-600 hover:bg-blue-700'
											: 'bg-gray-900 hover:bg-gray-800'
									}`}
									size="lg"
								>
									{plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* FAQ Section */}
				<div className="mt-20 max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						Frequently Asked Questions
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Can I change plans anytime?
								</h3>
								<p className="text-gray-600">
									Yes, you can upgrade or downgrade your plan at any time.
									Changes take effect immediately.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Is there a free trial?
								</h3>
								<p className="text-gray-600">
									All paid plans come with a 14-day free trial. No credit card
									required to start.
								</p>
							</div>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									What payment methods do you accept?
								</h3>
								<p className="text-gray-600">
									We accept all major credit cards, PayPal, and bank transfers
									for Enterprise customers.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Can I cancel anytime?
								</h3>
								<p className="text-gray-600">
									Yes, you can cancel your subscription at any time. Your data
									will be available for 30 days after cancellation.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Ready to get started?
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Join thousands of freelancers who trust FreelancePro to manage their
						business.
					</p>
					<Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
						Start Your Free Trial
					</Button>
				</div>
			</div>
		</div>
	);
}
