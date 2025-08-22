import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, SlidersHorizontal } from 'lucide-react';
import EventCard from '../components/EventCard';
import Layout from '../components/Layout';
import { sampleEvents, searchEvents, Event } from '../data/events';

const Events = () => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(sampleEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all',
    'Music',
    'Technology',
    'Food & Drink',
    'Art & Culture',
    'Business',
    'Entertainment'
  ];

  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery) {
      filtered = searchEvents(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price filter
    filtered = filtered.filter(event =>
      event.price >= priceRange.min && event.price <= priceRange.max
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return (b.availableTickets > a.availableTickets) ? 1 : -1;
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleSearchResults = (results: Event[]) => {
    setSearchQuery('');
    setFilteredEvents(results);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('date');
    setFilteredEvents(events);
  };

  return (
    <Layout onSearchResults={handleSearchResults}>
      <div className="min-h-screen">
        {/* Page Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              <span className="gradient-primary bg-clip-text text-transparent">
                All Events
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Discover amazing events happening near you. From concerts to conferences, 
              find your next unforgettable experience.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''}
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Filter Section */}
            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar w-full pl-10"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="search-bar w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="search-bar w-full"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="btn-secondary text-center w-full"
                >
                  Clear Filters
                </button>
              </div>

              {/* Price Range */}
              <div className="gradient-card rounded-lg p-4 border border-border/20">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full accent-primary"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Min: $0</div>
                  </div>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full accent-primary"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Max: $500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="gradient-card rounded-xl p-12 border border-border/20 max-w-md mx-auto">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  No events found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any events matching your criteria. 
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {filteredEvents.length > 0 && filteredEvents.length >= 12 && (
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Load More Events
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-card border-t border-border/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  {sampleEvents.length}+
                </div>
                <div className="text-muted-foreground">Total Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-muted-foreground">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  99%
                </div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Events;