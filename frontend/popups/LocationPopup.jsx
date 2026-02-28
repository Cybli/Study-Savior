/*

DEV NOTE: Sam 
This entire file is now obselete
Originally I planned on using the leaflet popups and binding this html content to it, however that posed an issue as the sidebar was not possible with that setup.
This is used as a reference for making the sidebar.jsx file in the same folder as I like the styling!


import '../App.css'
import { Tag } from 'lucide-react';

const StarRating = ({ rating, maxStars = 5 }) => {
  const stars = Array.from({ length: maxStars }, (_, i) => i < rating ? '★' : '☆');
  return stars.join('');
};

export const createPopup = async (location) => {
  try {
    // Fetch tags for this location
    const response = await fetch(`http://localhost:4000/locations/${location.id_location}/tags`);
    const tags = await response.json();

    // Create tag HTML with Tailwind styling
    const tagColors = [
      'bg-orange-400 text-white',
      'bg-blue-400 text-white',
      'bg-green-400 text-white',
      'bg-purple-400 text-white',
      'bg-pink-400 text-white'
    ];
    
    const tagsHTML = tags.length > 0
      ? tags.map((tag, i) => {
        const colorClass = tagColors[i % tagColors.length];
        return `<span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass} mr-2 mb-2">${tag.name_tag}</span>`;
      }).join('')
      : <Tag/> 
      '<p class="text-gray-500 text-sm">No tags</p>';

    // Get ratings (default to 0 if not available)
    const availability = location.average_crowded_location || 0;
    const quietness = location.average_noise_location || 0;
    const comfort = location.average_comfort_location || 0;

    const popupHTML = `
      <div class="w-80 bg-white rounded-lg overflow-hidden shadow-lg">
        <!-- Header -->
        <div class="bg-linear-to-r from-orange-600 to-orange-500 text-white p-4">
          <h2 class="text-xl font-bold m-0">${location.name_location}</h2>
          ${location.hall_location ? `<p class="text-orange-100 text-sm m-1">${location.hall_location}</p>` : ''}
        </div>

        <!-- Ratings Section -->
        <div class="bg-gray-50 border-b border-gray-200 p-3">
          <div class="flex justify-between items-center text-sm mb-2">
            <span class="font-semibold text-gray-700">Availability:</span>
            <span class="text-lg text-yellow-500 letter-spacing-1">${StarRating({ rating: Math.round(availability) })}</span>
          </div>
          <div class="flex justify-between items-center text-sm mb-2">
            <span class="font-semibold text-gray-700">Quietness:</span>
            <span class="text-lg text-yellow-500 letter-spacing-1">${StarRating({ rating: Math.round(quietness) })}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="font-semibold text-gray-700">Comfort:</span>
            <span class="text-lg text-yellow-500 letter-spacing-1">${StarRating({ rating: Math.round(comfort) })}</span>
          </div>
        </div>

        <!-- Tags Section -->
        <div class="bg-gray-50 border-b border-gray-200 p-3">
          <h3 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Top Tags</h3>
          <div class="flex flex-wrap gap-1">
            ${tagsHTML}
          </div>
        </div>

        <!-- Description -->
        <div class="p-3 border-b border-gray-200 text-sm text-gray-600 max-h-20 overflow-y-auto">
          ${location.description_location || 'No description available'}
        </div>

        <!-- Review Button -->
        <div class="p-3">
          <button class="w-full py-2 px-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm" onclick="alert('Review feature coming soon!')">
            Leave a review!
          </button>
        </div>
      </div>
    `;

    return popupHTML;
  } catch (err) {
    console.error('Failed to create popup content:', err);
    return `<p>${location.name_location}</p>`;
  }
};



*/