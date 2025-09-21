import { FileText, Calendar, Shield, AlertTriangle } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center mb-4">
						<FileText className="w-12 h-12 text-blue-600" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Terms of Service
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Please read these terms carefully before using FreelancePro.
					</p>
					<div className="flex items-center justify-center mt-6 text-sm text-gray-500">
						<Calendar className="w-4 h-4 mr-2" />
						Last updated: December 1, 2024
					</div>
				</div>

				{/* Quick Summary */}
				<Card className="max-w-4xl mx-auto mb-12 border-blue-200 bg-blue-50">
					<CardHeader>
						<CardTitle className="flex items-center text-blue-900">
							<AlertTriangle className="w-5 h-5 mr-2" />
							Quick Summary
						</CardTitle>
					</CardHeader>
					<CardContent className="text-blue-800">
						<p>
							By using FreelancePro, you agree to these terms. We provide a platform for freelancers 
							to manage their business, and you're responsible for your content and compliance with laws. 
							We respect your privacy and data. You can cancel anytime.
						</p>
					</CardContent>
				</Card>

				{/* Terms Content */}
				<div className="max-w-4xl mx-auto space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>1. Acceptance of Terms</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								By accessing and using FreelancePro ("the Service"), you accept and agree to be bound by 
								the terms and provision of this agreement. If you do not agree to abide by the above, 
								please do not use this service.
							</p>
							<p>
								These Terms of Service ("Terms") govern your use of our website located at freelancepro.com 
								(the "Service") operated by FreelancePro Inc. ("us", "we", or "our").
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>2. Description of Service</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								FreelancePro is a comprehensive platform designed to help freelancers and small agencies 
								manage their business operations, including:
							</p>
							<ul>
								<li>Project and client management</li>
								<li>Time tracking and invoicing</li>
								<li>Contract management</li>
								<li>Financial reporting and analytics</li>
								<li>Team collaboration tools</li>
							</ul>
							<p>
								We reserve the right to modify, suspend, or discontinue the Service at any time 
								with or without notice.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>3. User Accounts and Registration</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								To access certain features of the Service, you must register for an account. 
								When you register, you agree to:
							</p>
							<ul>
								<li>Provide accurate, current, and complete information</li>
								<li>Maintain and update your information to keep it accurate</li>
								<li>Maintain the security of your password</li>
								<li>Accept responsibility for all activities under your account</li>
								<li>Notify us immediately of any unauthorized use of your account</li>
							</ul>
							<p>
								We reserve the right to refuse service, terminate accounts, or cancel orders 
								at our sole discretion.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>4. User Content and Conduct</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								You retain ownership of any content you submit, post, or display on the Service. 
								By submitting content, you grant us a worldwide, non-exclusive, royalty-free license 
								to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and 
								distribute such content.
							</p>
							<p>You agree not to use the Service to:</p>
							<ul>
								<li>Upload or transmit viruses or malicious code</li>
								<li>Spam, phish, or send unsolicited messages</li>
								<li>Violate any laws or regulations</li>
								<li>Infringe on intellectual property rights</li>
								<li>Harass, abuse, or harm other users</li>
								<li>Attempt to gain unauthorized access to our systems</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>5. Payment Terms</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								Paid subscriptions are billed in advance on a monthly or annual basis. 
								All fees are non-refundable except as required by law or as specifically 
								stated in these Terms.
							</p>
							<ul>
								<li>Subscription fees are charged at the beginning of each billing cycle</li>
								<li>Price changes will be communicated 30 days in advance</li>
								<li>You can cancel your subscription at any time</li>
								<li>Upon cancellation, you'll retain access until the end of your billing period</li>
								<li>Failed payments may result in service suspension</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>6. Privacy and Data Protection</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								Your privacy is important to us. Our Privacy Policy explains how we collect, 
								use, and protect your information when you use our Service. By using our Service, 
								you agree to the collection and use of information in accordance with our Privacy Policy.
							</p>
							<p>
								We implement appropriate security measures to protect your personal information 
								against unauthorized access, alteration, disclosure, or destruction.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>7. Intellectual Property</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								The Service and its original content, features, and functionality are and will remain 
								the exclusive property of FreelancePro Inc. and its licensors. The Service is protected 
								by copyright, trademark, and other laws.
							</p>
							<p>
								Our trademarks and trade dress may not be used in connection with any product or 
								service without our prior written consent.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>8. Limitation of Liability</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								In no event shall FreelancePro Inc., nor its directors, employees, partners, agents, 
								suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
								or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
								or other intangible losses, resulting from your use of the Service.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>9. Termination</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								We may terminate or suspend your account and bar access to the Service immediately, 
								without prior notice or liability, under our sole discretion, for any reason whatsoever 
								and without limitation, including but not limited to a breach of the Terms.
							</p>
							<p>
								If you wish to terminate your account, you may simply discontinue using the Service 
								or contact us to request account deletion.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>10. Changes to Terms</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
								If a revision is material, we will provide at least 30 days notice prior to any new terms 
								taking effect.
							</p>
							<p>
								Your continued use of the Service after we post any modifications to the Terms on this 
								page will constitute your acknowledgment of the modifications and your consent to abide 
								and be bound by the modified Terms.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>11. Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								If you have any questions about these Terms of Service, please contact us:
							</p>
							<ul>
								<li>Email: legal@freelancepro.com</li>
								<li>Phone: +1 (555) 123-4567</li>
								<li>Address: 123 Business Ave, San Francisco, CA 94105</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				{/* Footer Notice */}
				<div className="mt-16 text-center">
					<Card className="max-w-2xl mx-auto border-amber-200 bg-amber-50">
						<CardContent className="pt-6">
							<div className="flex items-center justify-center mb-4">
								<Shield className="w-8 h-8 text-amber-600" />
							</div>
							<h3 className="text-lg font-semibold text-amber-900 mb-2">
								Legal Notice
							</h3>
							<p className="text-amber-800 text-sm">
								These terms constitute a legally binding agreement. If you do not agree with any part 
								of these terms, you must not use our Service. For questions about these terms, 
								please contact our legal team.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
