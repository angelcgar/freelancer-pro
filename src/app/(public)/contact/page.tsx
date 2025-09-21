'use client';

import { useState, useId } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	
	const nameId = useId();
	const emailId = useId();
	const subjectId = useId();
	const messageId = useId();
	const typeId = useId();
	
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		type: '',
		message: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		setSubmitted(true);
		setIsSubmitting(false);
		
		// Reset form after 3 seconds
		setTimeout(() => {
			setSubmitted(false);
			setFormData({
				name: '',
				email: '',
				subject: '',
				type: '',
				message: '',
			});
		}, 3000);
	};

	if (submitted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
				<Card className="w-full max-w-md mx-4">
					<CardContent className="pt-6 text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Send className="w-8 h-8 text-green-600" />
						</div>
						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							Message Sent!
						</h2>
						<p className="text-gray-600">
							Thank you for contacting us. We'll get back to you within 24 hours.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Get in Touch
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Have questions about FreelancePro? We're here to help. 
						Reach out to us and we'll respond as soon as possible.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
					{/* Contact Information */}
					<div className="lg:col-span-1 space-y-8">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<MessageSquare className="w-5 h-5 mr-2" />
									Contact Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-start space-x-3">
									<Mail className="w-5 h-5 text-blue-600 mt-1" />
									<div>
										<p className="font-medium text-gray-900">Email</p>
										<p className="text-gray-600">support@freelancepro.com</p>
									</div>
								</div>
								
								<div className="flex items-start space-x-3">
									<Phone className="w-5 h-5 text-blue-600 mt-1" />
									<div>
										<p className="font-medium text-gray-900">Phone</p>
										<p className="text-gray-600">+1 (555) 123-4567</p>
									</div>
								</div>
								
								<div className="flex items-start space-x-3">
									<MapPin className="w-5 h-5 text-blue-600 mt-1" />
									<div>
										<p className="font-medium text-gray-900">Address</p>
										<p className="text-gray-600">
											123 Business Ave<br />
											San Francisco, CA 94105
										</p>
									</div>
								</div>
								
								<div className="flex items-start space-x-3">
									<Clock className="w-5 h-5 text-blue-600 mt-1" />
									<div>
										<p className="font-medium text-gray-900">Business Hours</p>
										<p className="text-gray-600">
											Mon - Fri: 9:00 AM - 6:00 PM PST<br />
											Weekend: Emergency support only
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Quick Help */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Help</CardTitle>
								<CardDescription>
									Looking for immediate assistance?
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Button variant="outline" className="w-full justify-start">
									📚 Browse Documentation
								</Button>
								<Button variant="outline" className="w-full justify-start">
									💬 Live Chat Support
								</Button>
								<Button variant="outline" className="w-full justify-start">
									🎥 Video Tutorials
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle>Send us a Message</CardTitle>
								<CardDescription>
									Fill out the form below and we'll get back to you as soon as possible.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor={nameId}>Full Name *</Label>
											<Input
												id={nameId}
												type="text"
												value={formData.name}
												onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
												placeholder="Your full name"
												required
											/>
										</div>
										
										<div className="space-y-2">
											<Label htmlFor={emailId}>Email Address *</Label>
											<Input
												id={emailId}
												type="email"
												value={formData.email}
												onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
												placeholder="your@email.com"
												required
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor={typeId}>Inquiry Type</Label>
										<Select
											value={formData.type}
											onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select inquiry type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="general">General Question</SelectItem>
												<SelectItem value="support">Technical Support</SelectItem>
												<SelectItem value="billing">Billing & Pricing</SelectItem>
												<SelectItem value="feature">Feature Request</SelectItem>
												<SelectItem value="partnership">Partnership</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor={subjectId}>Subject *</Label>
										<Input
											id={subjectId}
											type="text"
											value={formData.subject}
											onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
											placeholder="Brief description of your inquiry"
											required
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor={messageId}>Message *</Label>
										<Textarea
											id={messageId}
											value={formData.message}
											onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
											placeholder="Please provide details about your inquiry..."
											rows={6}
											required
										/>
									</div>

									<Button 
										type="submit" 
										className="w-full bg-blue-600 hover:bg-blue-700" 
										size="lg"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
												Sending...
											</>
										) : (
											<>
												<Send className="w-4 h-4 mr-2" />
												Send Message
											</>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Additional Info */}
				<div className="mt-16 text-center">
					<Card className="max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Need Immediate Help?
							</h3>
							<p className="text-gray-600 mb-6">
								For urgent technical issues or billing questions, our support team is available 24/7.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button variant="outline" size="lg">
									📞 Call Support: +1 (555) 123-4567
								</Button>
								<Button variant="outline" size="lg">
									💬 Start Live Chat
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
