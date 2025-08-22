// Sample event data for the ticket system
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  price: number;
  category: string;
  availableTickets: number;
  image: string;
  organizer: string;
  featured: boolean;
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'Join us for the ultimate summer music experience featuring top artists from around the world. Dance the night away under the stars with amazing performances, food trucks, and unforgettable memories.',
    date: '2024-07-15',
    time: '18:00',
    venue: 'Central Park Amphitheater',
    address: '123 Park Avenue, New York, NY 10001',
    price: 89.99,
    category: 'Music',
    availableTickets: 500,
    image: '/src/assets/music-festival.jpg',
    organizer: 'MegaEvents Inc.',
    featured: true
  },
  {
    id: '2',
    title: 'Tech Innovation Conference',
    description: 'Discover the latest in technology and innovation. Network with industry leaders, attend inspiring keynotes, and explore cutting-edge demos from startups and established companies.',
    date: '2024-06-20',
    time: '09:00',
    venue: 'Convention Center Hall A',
    address: '456 Tech Boulevard, San Francisco, CA 94105',
    price: 299.99,
    category: 'Technology',
    availableTickets: 200,
    image: '/src/assets/tech-conference.jpg',
    organizer: 'TechForward',
    featured: true
  },
  {
    id: '3',
    title: 'Food & Wine Tasting Evening',
    description: 'An elegant evening of gourmet food pairings and wine tastings from renowned chefs and sommeliers. Experience culinary artistry in an intimate setting.',
    date: '2024-06-28',
    time: '19:30',
    venue: 'The Grand Ballroom',
    address: '789 Culinary Street, Los Angeles, CA 90210',
    price: 149.99,
    category: 'Food & Drink',
    availableTickets: 80,
    image: '/src/assets/wine-tasting.jpg',
    organizer: 'Gourmet Experiences',
    featured: false
  },
  {
    id: '4',
    title: 'Art Gallery Opening Night',
    description: 'Celebrate contemporary art with local and international artists. Enjoy live performances, interactive installations, and meet the artists behind the masterpieces.',
    date: '2024-07-03',
    time: '20:00',
    venue: 'Modern Art Museum',
    address: '321 Gallery Lane, Chicago, IL 60601',
    price: 45.00,
    category: 'Art & Culture',
    availableTickets: 150,
    image: '/src/assets/art-gallery.jpg',
    organizer: 'Cultural Arts Society',
    featured: false
  },
  {
    id: '5',
    title: 'Startup Pitch Competition',
    description: 'Watch promising startups pitch their innovative ideas to a panel of investors. Network with entrepreneurs, investors, and tech enthusiasts in this dynamic event.',
    date: '2024-06-25',
    time: '14:00',
    venue: 'Innovation Hub Auditorium',
    address: '555 Startup Avenue, Austin, TX 78701',
    price: 25.00,
    category: 'Business',
    availableTickets: 300,
    image: '/src/assets/startup-pitch.jpg',
    organizer: 'Entrepreneur Network',
    featured: false
  },
  {
    id: '6',
    title: 'Comedy Night Spectacular',
    description: 'Get ready for an evening of non-stop laughter with acclaimed comedians. Perfect for a fun night out with friends or a unique date night experience.',
    date: '2024-07-10',
    time: '21:00',
    venue: 'The Comedy Club',
    address: '888 Laugh Street, New York, NY 10002',
    price: 35.00,
    category: 'Entertainment',
    availableTickets: 120,
    image: '/src/assets/comedy-night.jpg',
    organizer: 'Laugh Factory',
    featured: false
  }
];

// Function to get events by category
export const getEventsByCategory = (category: string): Event[] => {
  return sampleEvents.filter(event => 
    event.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to search events
export const searchEvents = (query: string): Event[] => {
  const searchTerm = query.toLowerCase();
  return sampleEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm) ||
    event.description.toLowerCase().includes(searchTerm) ||
    event.venue.toLowerCase().includes(searchTerm) ||
    event.category.toLowerCase().includes(searchTerm)
  );
};

// Function to get featured events
export const getFeaturedEvents = (): Event[] => {
  return sampleEvents.filter(event => event.featured);
};

// Function to get event by ID
export const getEventById = (id: string): Event | undefined => {
  return sampleEvents.find(event => event.id === id);
};