import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Clock, User, ArrowLeft, Share2, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import { getEventById, Event } from '../data/events';

// Import event images
import musicFestival from '../assets/music-festival.jpg';
import techConference from '../assets/tech-conference.jpg';
import wineTasting from '../assets/wine-tasting.jpg';
import artGallery from '../assets/art-gallery.jpg';
import startupPitch from '../assets/startup-pitch.jpg';
import comedyNight from '../assets/comedy-night.jpg';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundEvent = getEventById(id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        navigate('/404');
      }
    }
  }, [id, navigate]);

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Map image paths to actual imports
  const getImageSrc = (imagePath: string) => {
    const imageMap: { [key: string]: string } = {
      '/src/assets/music-festival.jpg': musicFestival,
      '/src/assets/tech-conference.jpg': techConference,
      '/src/assets/wine-tasting.jpg': wineTasting,
      '/src/assets/art-gallery.jpg': artGallery,
      '/src/assets/startup-pitch.jpg': startupPitch,
      '/src/assets/comedy-night.jpg': comedyNight,
    };
    return imageMap[imagePath] || musicFestival;
  };

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(`${dateString}T${time}`);
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const dateInfo = formatDate(event.date, event.time);
  const totalPrice = event.price * ticketQuantity;

  const handleBookNow = () => {
    navigate(`/purchase/${event.id}`, { 
      state: { 
        event, 
        quantity: ticketQuantity,
        totalPrice 
      } 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={getImageSrc(event.image)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex space-x-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-background/80 text-foreground hover:bg-background'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-background/80 text-foreground hover:bg-background backdrop-blur-sm transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Event Badge */}
          {event.featured && (
            <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold animate-glow">
              Featured Event
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="animate-fade-in">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground text-sm">
                    Organized by {event.organizer}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {event.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Date & Time</h3>
                      <p className="text-muted-foreground text-sm">
                        {dateInfo.full}
                      </p>
                      <p className="text-foreground font-medium">
                        {dateInfo.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-foreground font-medium mb-1">
                        {event.venue}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <div className="flex items-start space-x-4">
                    <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Availability</h3>
                      <p className="text-foreground font-medium">
                        {event.availableTickets} tickets available
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Limited seats remaining
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <div className="flex items-start space-x-4">
                    <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Organizer</h3>
                      <p className="text-foreground font-medium">
                        {event.organizer}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Trusted event organizer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 animate-fade-in">
                <div className="gradient-card rounded-xl p-8 border border-border/20 shadow-card">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Price per ticket</span>
                      <div className="flex items-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <span className="text-3xl font-bold text-foreground">
                          {event.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>+ Service fees included</span>
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Tickets
                      </label>
                      <select
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(Number(e.target.value))}
                        className="w-full search-bar"
                      >
                        {[...Array(Math.min(10, event.availableTickets))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Ticket{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t border-border/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      
                      <button
                        onClick={handleBookNow}
                        className="w-full btn-primary text-center block"
                      >
                        Book Now
                      </button>
                      
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Free cancellation up to 24 hours before the event
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;