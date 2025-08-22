import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../data/events';

// Import event images
import musicFestival from '../assets/music-festival.jpg';
import techConference from '../assets/tech-conference.jpg';
import wineTasting from '../assets/wine-tasting.jpg';
import artGallery from '../assets/art-gallery.jpg';
import startupPitch from '../assets/startup-pitch.jpg';
import comedyNight from '../assets/comedy-night.jpg';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
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
    return imageMap[imagePath] || musicFestival; // fallback to music festival
  };

  const formatDate = (dateString: string, time: string) => {
    const date = new Date(`${dateString}T${time}`);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const dateInfo = formatDate(event.date, event.time);

  return (
    <Link to={`/event/${event.id}`}>
      <div className="event-card group animate-fade-in">
        {/* Event Image */}
        <div className="relative overflow-hidden rounded-t-lg mb-4">
          <img
            src={getImageSrc(event.image)}
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold animate-glow">
              Featured
            </div>
          )}
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border/20">
            {event.category}
          </div>

          {/* Date Box */}
          <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-center border border-border/20">
            <div className="text-primary font-bold text-sm">{dateInfo.month}</div>
            <div className="text-foreground font-bold text-lg leading-none">{dateInfo.day}</div>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Event Meta Information */}
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>{dateInfo.weekday}, {dateInfo.time}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span>{event.availableTickets} tickets available</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border/20">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary mr-1" />
              <span className="text-2xl font-bold text-foreground">
                {event.price.toFixed(2)}
              </span>
            </div>
            
            <div className="btn-primary text-sm py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
            </div>
          </div>

          {/* Organizer */}
          <div className="text-xs text-muted-foreground pt-2 border-t border-border/10">
            Organized by {event.organizer}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;