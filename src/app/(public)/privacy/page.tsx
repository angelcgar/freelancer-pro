import { Shield, Eye, Lock, Database, Calendar, Mail } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center mb-4">
						<Shield className="w-12 h-12 text-green-600" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Privacy Policy
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Your privacy is important to us. This policy explains how we collect, 
						use, and protect your personal information.
					</p>
					<div className="flex items-center justify-center mt-6 text-sm text-gray-500">
						<Calendar className="w-4 h-4 mr-2" />
						Last updated: December 1, 2024
					</div>
				</div>

				{/* Privacy Highlights */}
				<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
					<Card className="text-center border-green-200 bg-green-50">
						<CardContent className="pt-6">
							<Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
							<h3 className="font-semibold text-green-900 mb-2">Data Security</h3>
							<p className="text-sm text-green-800">
								Your data is encrypted and stored securely with industry-standard protection.
							</p>
						</CardContent>
					</Card>
					
					<Card className="text-center border-blue-200 bg-blue-50">
						<CardContent className="pt-6">
							<Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
							<h3 className="font-semibold text-blue-900 mb-2">Transparency</h3>
							<p className="text-sm text-blue-800">
								We're clear about what data we collect and how we use it.
							</p>
						</CardContent>
					</Card>
					
					<Card className="text-center border-purple-200 bg-purple-50">
						<CardContent className="pt-6">
							<Database className="w-8 h-8 text-purple-600 mx-auto mb-3" />
							<h3 className="font-semibold text-purple-900 mb-2">Your Control</h3>
							<p className="text-sm text-purple-800">
								You can access, update, or delete your data at any time.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Privacy Policy Content */}
				<div className="max-w-4xl mx-auto space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>1. Information We Collect</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<h4 className="font-semibold mb-3">Personal Information</h4>
							<p>When you create an account, we collect:</p>
							<ul>
								<li>Name and email address</li>
								<li>Profile information (company, timezone, etc.)</li>
								<li>Payment information (processed securely by our payment providers)</li>
								<li>Communication preferences</li>
							</ul>
							
							<h4 className="font-semibold mb-3 mt-6">Usage Information</h4>
							<p>We automatically collect:</p>
							<ul>
								<li>Device and browser information</li>
								<li>IP address and location data</li>
								<li>Usage patterns and feature interactions</li>
								<li>Performance and error logs</li>
							</ul>

							<h4 className="font-semibold mb-3 mt-6">Content Data</h4>
							<p>Information you create within the platform:</p>
							<ul>
								<li>Projects, clients, and contracts</li>
								<li>Time entries and invoices</li>
								<li>Files and documents you upload</li>
								<li>Messages and communications</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>2. How We Use Your Information</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>We use your information to:</p>
							<ul>
								<li><strong>Provide the Service:</strong> Enable core functionality and features</li>
								<li><strong>Improve the Service:</strong> Analyze usage patterns and optimize performance</li>
								<li><strong>Communicate:</strong> Send important updates, support responses, and notifications</li>
								<li><strong>Security:</strong> Detect and prevent fraud, abuse, and security issues</li>
								<li><strong>Legal Compliance:</strong> Meet legal obligations and protect rights</li>
								<li><strong>Marketing:</strong> Send promotional content (with your consent)</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>3. Information Sharing</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>We do not sell your personal information. We may share information in these situations:</p>
							
							<h4 className="font-semibold mb-3">Service Providers</h4>
							<p>We work with trusted third parties who help us operate our service:</p>
							<ul>
								<li>Cloud hosting providers (AWS, Google Cloud)</li>
								<li>Payment processors (Stripe, PayPal)</li>
								<li>Email service providers</li>
								<li>Analytics and monitoring tools</li>
							</ul>

							<h4 className="font-semibold mb-3 mt-6">Legal Requirements</h4>
							<p>We may disclose information when required by law or to:</p>
							<ul>
								<li>Comply with legal processes</li>
								<li>Protect our rights and property</li>
								<li>Ensure user safety</li>
								<li>Investigate potential violations</li>
							</ul>

							<h4 className="font-semibold mb-3 mt-6">Business Transfers</h4>
							<p>
								If we're involved in a merger, acquisition, or sale of assets, your information 
								may be transferred as part of that transaction.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>4. Data Security</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>We implement comprehensive security measures:</p>
							<ul>
								<li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
								<li><strong>Access Controls:</strong> Strict employee access policies</li>
								<li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
								<li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
								<li><strong>Compliance:</strong> SOC 2 Type II and other security certifications</li>
							</ul>
							<p>
								While we use industry-standard security measures, no method of transmission 
								over the internet is 100% secure. We cannot guarantee absolute security.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>5. Your Privacy Rights</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>You have the following rights regarding your personal information:</p>
							<ul>
								<li><strong>Access:</strong> Request a copy of your personal data</li>
								<li><strong>Correction:</strong> Update or correct inaccurate information</li>
								<li><strong>Deletion:</strong> Request deletion of your personal data</li>
								<li><strong>Portability:</strong> Export your data in a machine-readable format</li>
								<li><strong>Restriction:</strong> Limit how we process your information</li>
								<li><strong>Objection:</strong> Object to certain types of processing</li>
							</ul>
							<p>
								To exercise these rights, contact us at privacy@freelancepro.com. 
								We'll respond within 30 days.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>6. Data Retention</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>We retain your information for as long as necessary to:</p>
							<ul>
								<li>Provide the Service to you</li>
								<li>Comply with legal obligations</li>
								<li>Resolve disputes and enforce agreements</li>
								<li>Improve our services</li>
							</ul>
							<p>
								When you delete your account, we'll delete your personal information within 30 days, 
								except where we're required to retain it for legal purposes.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>7. International Data Transfers</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								FreelancePro is based in the United States. If you're located outside the US, 
								your information may be transferred to and processed in the US or other countries 
								where our service providers operate.
							</p>
							<p>
								We ensure appropriate safeguards are in place for international transfers, 
								including Standard Contractual Clauses and adequacy decisions.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>8. Cookies and Tracking</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>We use cookies and similar technologies to:</p>
							<ul>
								<li>Remember your preferences and settings</li>
								<li>Analyze how you use our service</li>
								<li>Provide personalized content</li>
								<li>Improve security and prevent fraud</li>
							</ul>
							<p>
								You can control cookies through your browser settings. However, disabling 
								cookies may affect the functionality of our service.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>9. Children's Privacy</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								Our Service is not intended for children under 16. We do not knowingly collect 
								personal information from children under 16. If we become aware that we have 
								collected personal information from a child under 16, we will take steps to 
								delete that information.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>10. Changes to This Policy</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								We may update this Privacy Policy from time to time. We'll notify you of any 
								material changes by email or through our service. Your continued use of the 
								service after changes become effective constitutes acceptance of the new policy.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>11. Contact Us</CardTitle>
						</CardHeader>
						<CardContent className="prose prose-gray max-w-none">
							<p>
								If you have questions about this Privacy Policy or our privacy practices, 
								please contact us:
							</p>
							<div className="grid md:grid-cols-2 gap-4 mt-4">
								<div>
									<h4 className="font-semibold mb-2">Privacy Team</h4>
									<ul className="space-y-1 text-sm">
										<li>Email: privacy@freelancepro.com</li>
										<li>Phone: +1 (555) 123-4567</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold mb-2">Mailing Address</h4>
									<p className="text-sm">
										FreelancePro Inc.<br />
										123 Business Ave<br />
										San Francisco, CA 94105<br />
										United States
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Contact CTA */}
				<div className="mt-16 text-center">
					<Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
						<CardContent className="pt-6">
							<div className="flex items-center justify-center mb-4">
								<Mail className="w-8 h-8 text-green-600" />
							</div>
							<h3 className="text-lg font-semibold text-green-900 mb-2">
								Questions About Your Privacy?
							</h3>
							<p className="text-green-800 mb-4">
								Our privacy team is here to help. Contact us with any questions or concerns 
								about how we handle your personal information.
							</p>
							<Button className="bg-green-600 hover:bg-green-700">
								Contact Privacy Team
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
