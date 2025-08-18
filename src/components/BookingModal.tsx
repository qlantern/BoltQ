@@ .. @@
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What would you like to focus on? *
                    </label>
                    <select
                      value={bookingData.focusArea}
                      onChange={(e) => setBookingData(prev => ({ ...prev, focusArea: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                      required
                    >
                      <option value="">Select focus area</option>
                      {teacher.specialties.map(specialty => (
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
                      rows={3}
                      placeholder="Any specific topics, goals, or requests for your lesson..."
                    />
@@ .. @@
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{bookingData.duration === 1 ? '1 hour' : `${bookingData.duration} hours`}</div>
                  </div>