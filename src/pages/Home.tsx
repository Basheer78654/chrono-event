import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import Layout from '../components/Layout';
import { sampleEvents, getFeaturedEvents, searchEvents, Event } from '../data/events';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>(sampleEvents);
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    setFeaturedEvents(getFeaturedEvents());
  }, []);

  const handleSearchResults = (results: Event[]) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0 || results.length === 0);
  };

  const displayEvents = isSearchActive ? searchResults : allEvents;

  return (
    <Layout onSearchResults={handleSearchResults}>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            {/* Floating background elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
              <div className="absolute top-40 right-10 w-72 h-72 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 left-1/2 w-72 h-72 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-primary bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="text-foreground">Amazing Events</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                From intimate concerts to grand conferences, find and book tickets for experiences that inspire, connect, and entertain.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/events" className="btn-primary inline-flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Explore All Events
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <button className="btn-secondary inline-flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trending Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="gradient-card rounded-xl p-8 border border-border/20">
                  <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">1000+</div>
                  <div className="text-muted-foreground">Events Available</div>
                </div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="gradient-card rounded-xl p-8 border border-border/20">
                  <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">50K+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="gradient-card rounded-xl p-8 border border-border/20">
                  <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">500+</div>
                  <div className="text-muted-foreground">Trusted Organizers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        {!isSearchActive && featuredEvents.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center">
                    <Star className="h-8 w-8 text-primary mr-3" />
                    Featured Events
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Hand-picked events you don't want to miss
                  </p>
                </div>
                <Link 
                  to="/events" 
                  className="hidden md:inline-flex items-center text-primary hover:text-primary-glow transition-colors"
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Events / Search Results Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center">
                  <Calendar className="h-8 w-8 text-primary mr-3" />
                  {isSearchActive ? 'Search Results' : 'All Events'}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {isSearchActive 
                    ? `Found ${searchResults.length} event${searchResults.length !== 1 ? 's' : ''}` 
                    : 'Discover exciting events happening near you'
                  }
                </p>
              </div>
            </div>
            
            {displayEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayEvents.map((event, index) => (
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
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all events
                </p>
                <Link to="/events" className="btn-primary mt-6 inline-flex items-center">
                  Browse All Events
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;