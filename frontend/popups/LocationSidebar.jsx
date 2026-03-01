import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Tag } from 'lucide-react';

export function LocationSidebar({ location, onClose }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags([]); // Clear old tags when location changes
    if (location) {
      fetch(`http://localhost:4000/locations/${location.id_location}/tags`)
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) return;
          setTags(data);
        })
        .catch(err => console.error('Failed to fetch tags:', err));
    }
  }, [location]);

  if (!location) return null;

  const StarRating = ({ rating, maxStars = 5 }) => {
    const stars = Array.from({ length: maxStars }, (_, i) => i < rating ? '★' : '☆');
    return <span className="text-lg text-yellow-500">{stars.join('')}</span>;
  };

  const tagColors = [
    'bg-orange-200 text-black',
    'bg-blue-200 text-black',
    'bg-green-200 text-black',
    'bg-purple-200 text-black',
    'bg-pink-200 text-black'
  ];

  const availability = location.average_crowded_location || 0;
  const quietness = location.average_noise_location || 0;
  const comfort = location.average_comfort_location || 0;

  return (
    <div className="fixed left-4 top-24 bottom-4 w-96 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col z-1000 border-2 border-black">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 z-10"
      >
        <X size={20} className="text-gray-600" />
      </button>

      {/* Image */}
      {location.image_path_location ? (
        <img
          src={location.image_path_location}
          alt={location.name_location}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
          No image available
        </div>
      )}

      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white p-4">
        <h2 className="text-xl font-bold m-0 pr-8">{location.name_location}</h2>
        {location.hall_location && (
          <p className="text-orange-100 text-sm mt-1">{location.hall_location}</p>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Ratings Section */}
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-semibold text-black">Availability:</span>
            <StarRating rating={Math.round(availability)} />
          </div>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-semibold text-black">Quietness:</span>
            <StarRating rating={Math.round(quietness)} />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-black">Comfort:</span>
            <StarRating rating={Math.round(comfort)} />
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Top Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag, i) => (
                <span
                  key={tag.id_tag}
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 border-black ${tagColors[i % tagColors.length]}`}
                >
                  {tag.name_tag}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm"><Tag/>No tags</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="p-3 border-b border-gray-200 text-sm text-black">
          {location.description_location || 'No description available'}
        </div>

        {/* Review Button */}
        <div className="p-3">
          <button 
            className="w-full py-2 px-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm"
            onClick={() => alert('Review feature coming soon!')}
          >
            Leave a review!
          </button>
        </div>
      </div>
    </div>
  );
}