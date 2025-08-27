import React from 'react';
import { Search, Star, Users, BookOpen, Award } from 'lucide-react';

interface HeroProps {
	onSearchClick?: () => void;
	onBecomeTeacherClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
	// const { user, isAuthenticated } = useAuth();
	return (
		<div className="relative bg-gradient-to-br from-coral-500 via-coral-400 to-orange-400">
			<div className="absolute inset-0 bg-black opacity-10"></div>
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
						Find Your Perfect
						<span className="block text-yellow-200">English Teacher</span>
					</h1>
					<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
						Connect with qualified English teachers from around the world. 
						Learn at your own pace, anytime, anywhere.
					</p>

					{/* Enhanced Search Bar */}
					<div className="max-w-4xl mx-auto mb-12">
						<div className="bg-white rounded-xl shadow-2xl p-2">
							<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
								<div className="flex-1 w-full">
									<input
										type="text"
										placeholder="What do you want to learn? (Business English, IELTS, Conversation...)"
										className="w-full px-6 py-4 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
									/>
								</div>
								<button
									className="w-full md:w-auto bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center justify-center font-semibold"
									onClick={onSearchClick}
								>
									<Search className="h-5 w-5 mr-2" />
									Search Teachers
								</button>
							</div>
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
								<Users className="h-6 w-6 text-white" />
							</div>
							<div className="text-3xl font-bold text-white">2,500+</div>
							<div className="text-white/80">Qualified Teachers</div>
						</div>
						<div className="text-center">
							<div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
								<BookOpen className="h-6 w-6 text-white" />
							</div>
							<div className="text-3xl font-bold text-white">50,000+</div>
							<div className="text-white/80">Lessons Completed</div>
						</div>
						<div className="text-center">
							<div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
								<Star className="h-6 w-6 text-white" />
							</div>
							<div className="text-3xl font-bold text-white">4.9/5</div>
							<div className="text-white/80">Average Rating</div>
						</div>
						<div className="text-center">
							<div className="bg-white/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
								<Award className="h-6 w-6 text-white" />
							</div>
							<div className="text-3xl font-bold text-white">98%</div>
							<div className="text-white/80">Success Rate</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;