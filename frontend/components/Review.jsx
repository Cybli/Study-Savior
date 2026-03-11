import { useEffect, useState } from 'react';
import { Star, Send, AlertCircle } from 'lucide-react';
import API_URL from '../config';

export function Review({ location, onClose, userId }) {
  const [rating, setRating] = useState({
    noise_rating: 0,
    comfort_rating: 0,
    crowded_rating: 0
  });
  const [written_rating, setWritten_rating] = useState('');
  const [hovered_rating, setHovered_rating] = useState({
    noise: 0,
    comfort: 0,
    crowded: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ratingCategories = [
    { key: 'crowded', label: 'Availability', description: 'How available are seats/spots?', stateKey: 'crowded_rating' },
    { key: 'noise', label: 'Quietness', description: 'How quiet is this location?', stateKey: 'noise_rating' },
    { key: 'comfort', label: 'Comfort', description: 'How comfortable is this location?', stateKey: 'comfort_rating' }
  ];

  const handleRatingClick = (category, value) => {
    setRating(prev => ({
      ...prev,
      [category.stateKey]: value
    }));
  };

  const handleRatingHover = (category, value) => {
    setHovered_rating(prev => ({
      ...prev,
      [category.key]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating.noise_rating === 0 || rating.comfort_rating === 0 || rating.crowded_rating === 0) {
      setError('Please rate all categories from 1 - 5');
      return;
    }

    // Validate user is still logged in before submitting
    try {
      const authCheck = await fetch(`${API_URL}/me`, { credentials: 'include' });
      if (!authCheck.ok) {
        setError('You must be logged in to submit a review. Please log in and try again.');
        return;
      }
    } catch (err) {
      setError('Unable to verify login status. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_location: location.id_location,
          noise_rating: rating.noise_rating,
          comfort_rating: rating.comfort_rating,
          crowded_rating: rating.crowded_rating,
          written_rating: written_rating.trim()
        })
      });

      if(!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to submit review');
        }
        const text = await response.text();
        throw new Error(text || 'Failed to submit review');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose()
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ category, rating, hovered }) => {
    const displayRating = hovered || rating;
    const stars = Array.from({ length :  5 }, (_, i) => i < displayRating ? '★': '☆');
    return (
      <div
        className="flex gap-2 cursor-pointer"
        onMouseLeave={() => handleRatingHover(category, 0)}
      >
        {stars.map((star, i) => (
          <span
            key={i}
            onClick={() => handleRatingClick(category, i + 1)}
            onMouseEnter={() => handleRatingHover(category, i + 1)}
            className={`text-3xl transition-all ${
              displayRating > i ? 'text-yellow-400 scale-110' : 'text-gray-300'
            } hover:scale-125`}
          >
            {star}
          </span>
        ))}
      </div>
    );
  };

  if(success) {
    return(
      <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-[2001]">
        <div className="bg-white rounded-lg p-8 max-w-sm text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your review has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-[2001]">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white p-6 sticky top-0 z-10">
          <h2 className="text-2xl font-bold">Leave a Review</h2>
          <p className="text-orange-100 text-sm mt-1">{location.name_location}</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Rating Categories */}
          <div className="space-y-3 mb-4">
            {ratingCategories.map(category => (
              <div key={category.key} className="border-b border-gray-200 pb-3 last:border-b-0">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <StarRating
                  category={category}
                  rating={rating[category.stateKey]}
                  hovered={hovered_rating[category.key]}
                />
              </div>
            ))}
          </div>

          {/* Written Review */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Your Review
            </label>
            <textarea
              value={written_rating}
              onChange={(e) => setWritten_rating(e.target.value)}
              placeholder="Share your experience at this location... (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="3"
            />
            <p className="text-xs text-gray-500 mt-1">
              {written_rating.length} characters
            </p>
          </div>
           {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              <Send size={18} />
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}