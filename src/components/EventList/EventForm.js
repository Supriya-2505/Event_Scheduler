import React, { useState, useEffect } from 'react';
import AlertBox from '../Shared/AlertBox';
import useAlert from '../../hooks/useAlert';
import './EventForm.css';

const EventForm = ({ event, onSave, onCancel, isOpen, existingEvents = [] }) => {
  const { alert, showError, hideAlert } = useAlert();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    place: '',
    attendees: '',
    foodPreferences: '',
    status: 'pending'
  });

  // Event type options from reference image plus others
  const eventTypes = [
    'Wedding',
    'Birthday', 
    'Conference',
    'Meeting',
    'Festival',
  ];

  // Food preferences options
  const foodPreferences = [
    'Veg',
    'Non-Veg',
    'Vegan',
    'Mixed Menu'
  ];

  // Districts in alphabetical order
  const districts = [
    'Chennai',
    'Delhi',
    'Bengaluru',
    'Madurai',
    'Theni',
    'Trichy',
    'Thirutani',
    'Salem',
    'Erode',
    'Namakkal',
    'Karur',
    'Ooty'
  ];

  // Venue data structure with locations for each place
  const venueData = {
    'Chennai': {
      hotels: [
        'Taj Coromandel',
        'ITC Grand Chola',
        'The Leela Palace',
        'Park Hyatt Chennai',
        'Radisson Blu Hotel',
        'Hilton Chennai',
        'Marriott Chennai',
        'Novotel Chennai'
      ],
      mahals: [
        'Chettinad Palace',
        'Thanjavur Palace',
        'Mysore Palace (Chennai Branch)',
        'Royal Heritage Mahal',
        'Grand Palace Chennai',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Chennai Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Celebration Hall',
        'Grandeur Party Palace',
        'Elite Event Hall',
        'Prestige Party Hall'
      ],
      restaurants: [
        'Buhari Hotel',
        'Murugan Idli Shop',
        'Saravana Bhavan',
        'Ratna Cafe',
        'A2B - Adyar Ananda Bhavan',
        'Grand Sweets & Snacks',
        'Hotel Saravana Bhavan'
      ]
    },
    'Delhi': {
      hotels: [
        'The Oberoi Delhi',
        'Taj Palace',
        'The Leela Palace Delhi',
        'ITC Maurya',
        'The Imperial',
        'Hyatt Regency Delhi',
        'Marriott Delhi',
        'Radisson Blu Plaza'
      ],
      mahals: [
        'Red Fort Palace',
        'Humayun\'s Tomb Complex',
        'Qutub Minar Palace',
        'Jama Masjid Palace',
        'Lotus Temple Palace',
        'India Gate Palace'
      ],
      partyHalls: [
        'Delhi Convention Centre',
        'Pragati Maidan',
        'Grand Party Palace',
        'Royal Banquet Hall',
        'Elite Event Centre',
        'Prestige Party Hall',
        'Grandeur Palace'
      ],
      restaurants: [
        'Karim\'s',
        'Bukhara',
        'Indian Accent',
        'Dum Pukht',
        'Khan Chacha',
        'Haldiram\'s',
        'Nirula\'s'
      ]
    },
    'Bengaluru': {
      hotels: [
        'The Oberoi Bengaluru',
        'Taj West End',
        'The Leela Palace Bengaluru',
        'ITC Gardenia',
        'Marriott Bengaluru',
        'Radisson Blu Bengaluru',
        'Hyatt Regency Bengaluru',
        'JW Marriott Bengaluru'
      ],
      mahals: [
        'Bangalore Palace',
        'Tipu Sultan\'s Summer Palace',
        'Vidhana Soudha Palace',
        'Cubbon Park Palace',
        'Lalbagh Palace',
        'Kempegowda Palace'
      ],
      partyHalls: [
        'Bangalore Palace Grounds',
        'Kanteerava Indoor Stadium',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Centre',
        'Prestige Party Palace',
        'Grandeur Hall'
      ],
      restaurants: [
        'MTR',
        'Vidyarthi Bhavan',
        'Brahmins Coffee Bar',
        'CTR - Central Tiffin Room',
        'Koshy\'s',
        'Hallimane',
        'Udupi Garden'
      ]
    },
    'Madurai': {
      hotels: [
        'Heritage Madurai',
        'Fortune Pandiyan Hotel',
        'Hotel Supreme',
        'Madurai Residency',
        'Hotel Germanus',
        'Hotel Park Plaza',
        'Hotel Sangam'
      ],
      mahals: [
        'Thirumalai Nayak Palace',
        'Meenakshi Amman Temple Palace',
        'Madurai Palace',
        'Royal Heritage Mahal',
        'Grand Palace Madurai'
      ],
      partyHalls: [
        'Madurai Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace',
        'Grandeur Hall'
      ],
      restaurants: [
        'Murugan Idli Shop',
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Konar Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Theni': {
      hotels: [
        'Hotel Theni International',
        'Grand Palace Hotel',
        'Hotel Supreme Theni',
        'Theni Regency',
        'Hotel Green Park'
      ],
      mahals: [
        'Theni Palace',
        'Royal Heritage Mahal',
        'Grand Palace Theni',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Theni Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Konar Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Trichy': {
      hotels: [
        'Hotel Breeze',
        'Sangam Hotel',
        'Hotel Rockfort Regency',
        'Trichy Grand',
        'Hotel Supreme Trichy'
      ],
      mahals: [
        'Rockfort Palace',
        'Srirangam Palace',
        'Trichy Palace',
        'Royal Heritage Mahal',
        'Grand Palace Trichy'
      ],
      partyHalls: [
        'Trichy Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Konar Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Thirutani': {
      hotels: [
        'Hotel Thirutani Regency',
        'Grand Palace Hotel',
        'Hotel Supreme Thirutani',
        'Thirutani International'
      ],
      mahals: [
        'Thirutani Palace',
        'Royal Heritage Mahal',
        'Grand Palace Thirutani',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Thirutani Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Salem': {
      hotels: [
        'Hotel Salem Regency',
        'Grand Palace Hotel',
        'Hotel Supreme Salem',
        'Salem International',
        'Hotel Green Park Salem'
      ],
      mahals: [
        'Salem Palace',
        'Royal Heritage Mahal',
        'Grand Palace Salem',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Salem Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Konar Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Erode': {
      hotels: [
        'Hotel Erode Regency',
        'Grand Palace Hotel',
        'Hotel Supreme Erode',
        'Erode International',
        'Hotel Green Park Erode'
      ],
      mahals: [
        'Erode Palace',
        'Royal Heritage Mahal',
        'Grand Palace Erode',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Erode Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Konar Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Namakkal': {
      hotels: [
        'Hotel Namakkal Regency',
        'Grand Palace Hotel',
        'Hotel Supreme Namakkal',
        'Namakkal International'
      ],
      mahals: [
        'Namakkal Palace',
        'Royal Heritage Mahal',
        'Grand Palace Namakkal',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Namakkal Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Karur': {
      hotels: [
        'Hotel Karur Regency',
        'Grand Palace Hotel',
        'Hotel Supreme Karur',
        'Karur International'
      ],
      mahals: [
        'Karur Palace',
        'Royal Heritage Mahal',
        'Grand Palace Karur',
        'Heritage Mahal'
      ],
      partyHalls: [
        'Karur Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall'
      ],
      restaurants: [
        'Hotel Saravana Bhavan',
        'Amma Mess',
        'Hotel Supreme',
        'Buhari Hotel'
      ]
    },
    'Ooty': {
      hotels: [
        'Taj Savoy Hotel',
        'The Nilgiri Palace',
        'Hotel Lakeview',
        'Sterling Ooty',
        'Fortune Resort Sullivan Court',
        'Hotel Gem Park'
      ],
      mahals: [
        'Ooty Palace',
        'Royal Heritage Mahal',
        'Grand Palace Ooty',
        'Heritage Mahal',
        'Nilgiri Palace'
      ],
      partyHalls: [
        'Ooty Convention Centre',
        'Grand Party Hall',
        'Royal Banquet Hall',
        'Elite Event Hall',
        'Prestige Party Palace'
      ],
      restaurants: [
        'Shinkow\'s Chinese Restaurant',
        'Nahar\'s Sidewalk Cafe',
        'Earl\'s Secret',
        'Place To Bee',
        'Hyderabad Biryani House'
      ]
    }
  };

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        place: event.place || '',
        attendees: event.attendees || '',
        foodPreferences: event.foodPreferences || '',
        status: event.status || 'pending'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        place: '',
        attendees: '',
        foodPreferences: '',
        status: 'pending'
      });
    }
  }, [event, isOpen]);

  // Function to get all available locations for a selected place
  const getAvailableLocations = (place) => {
    if (!place || !venueData[place]) return [];
    
    const venues = venueData[place];
    const allLocations = [];
    
    // Add hotels
    venues.hotels.forEach(hotel => {
      allLocations.push({ value: hotel, label: `${hotel} (Hotel)`, category: 'Hotels' });
    });
    
    // Add mahals
    venues.mahals.forEach(mahal => {
      allLocations.push({ value: mahal, label: `${mahal} (Mahal)`, category: 'Mahals' });
    });
    
    // Add party halls
    venues.partyHalls.forEach(hall => {
      allLocations.push({ value: hall, label: `${hall} (Party Hall)`, category: 'Party Halls' });
    });
    
    // Add restaurants
    venues.restaurants.forEach(restaurant => {
      allLocations.push({ value: restaurant, label: `${restaurant} (Restaurant)`, category: 'Restaurants' });
    });
    
    return allLocations;
  };

  // Function to check for conflicts
  const checkForConflicts = (newEventData) => {
    if (!newEventData.date || !newEventData.time || !newEventData.location) {
      return null;
    }

    const conflict = existingEvents.find(existingEvent => {
      // Skip the current event being edited
      if (event && existingEvent.id === event.id) {
        return false;
      }
      
      return (
        existingEvent.date === newEventData.date &&
        existingEvent.time === newEventData.time &&
        existingEvent.location === newEventData.location
      );
    });

    return conflict;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If place is changed, reset location
    if (name === 'place') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        location: '' // Reset location when place changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for conflicts before submitting
    const conflict = checkForConflicts(formData);
    if (conflict) {
      const conflictDate = new Date(conflict.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const errorMessage = `${conflict.location} is already booked for ${conflictDate} at ${conflict.time}. Please choose another venue or timing.`;
      showError(errorMessage, 'Event Conflict');
      return;
    }
    
    const normalized = {
      ...formData,
      attendees: formData.attendees !== '' ? parseInt(formData.attendees, 10) : null,
      status: (formData.status || 'pending').toUpperCase(),
      date: formData.date ? formData.date : null,
      time: formData.time ? formData.time : null
    };
    
    const result = await onSave(normalized);
    if (result && !result.success) {
      // Show error from backend in an alert box
      window.alert(result.error || 'Already booked for the selected time slot. Please choose a different time.');
      return;
    }
    // If save was successful, close the form
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button className="modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Event Title *</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              rows="3"
              placeholder="Enter event description"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="time" className="form-label">Time *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="place" className="form-label">Select Place *</label>
            <select
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Place</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
              disabled={!formData.place}
            >
              <option value="">
                {formData.place ? 'Select Location' : 'First select a place'}
              </option>
              {getAvailableLocations(formData.place).map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="foodPreferences" className="form-label">Food Preferences</label>
            <select
              id="foodPreferences"
              name="foodPreferences"
              value={formData.foodPreferences}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Food Preference</option>
              {foodPreferences.map((preference) => (
                <option key={preference} value={preference}>
                  {preference}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="attendees" className="form-label">Expected Attendees</label>
              <input
                type="number"
                id="attendees"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                className="form-input"
                min="1"
                placeholder="Number of attendees"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
      
      <AlertBox
        type={alert.type}
        title={alert.title}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={hideAlert}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        showConfirmButton={alert.showConfirmButton}
        onConfirm={alert.onConfirm}
      />
    </div>
  );
};

export default EventForm;
