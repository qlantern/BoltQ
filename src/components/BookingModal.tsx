const [bookingData, setBookingData] = useState<BookingData>({
    classType: '',
    date: '',
    time: '',
    duration: 1,
    focusArea: '',
       return bookingData.date !== '' && bookingData.time !== '';
  });
       return bookingData.duration > 0 && bookingData.focusArea !== '';
  const calculatePrice = () => {
    return teacher.pricePerHour * bookingData.duration;
  };
@@ .. @@
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 1.5, 2].map(duration => (
                      <button
                        key={duration}
                        onClick={() => setBookingData(prev => ({ ...prev, duration }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          bookingData.duration === duration
                            ? 'border-coral-500 bg-coral-50 text-coral-600'
                            : 'border-gray-200 hover:border-coral-300'
                        }`}
                      >
                        <div className="font-semibold">{duration === 1 ? '1 hour' : `${duration} hours`}</div>
                        <div className="text-sm text-gray-600">{teacher.pricePerHour * duration} DZD</div>
                      </button>
                    ))}
                  </div>
@@ .. @@
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{bookingData.duration === 1 ? '1 hour' : `${bookingData.duration} hours`}</div>
                  </div>
@@ .. @@
                  <div className="bg-coral-50 border border-coral-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-6 w-6 text-coral-500 mr-2" />
                      <h3 className="text-lg font-semibold text-coral-800">Booking Confirmed!</h3>
                    </div>
                    <p className="text-coral-700 mb-6">
                      Your lesson request with {teacher.name} has been submitted successfully. The teacher will confirm your booking within {teacher.responseTime}.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-coral-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Next Steps:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Wait for teacher confirmation ({teacher.responseTime})
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            You'll receive lesson details and payment instructions
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {bookingData.classType === 'online' ? 'Join the online lesson 5 minutes early' : 'Arrive at the agreed location on time'}
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            Contact {teacher.name} directly if you have questions
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={onClose}
                          className="flex-1 bg-coral-500 text-white py-2 px-4 rounded-lg hover:bg-coral-600 font-medium transition-colors duration-200"
                        >
                          Done
                        </button>
                        <button className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 font-medium transition-colors duration-200">
                          Message Teacher
                        </button>
                      </div>