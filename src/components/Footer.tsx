import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="gradient-card border-t border-border/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <Calendar className="h-8 w-8 text-primary group-hover:animate-glow transition-all" />
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                EventTicket
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your premier destination for discovering and booking amazing events. 
              From concerts to conferences, we connect you with unforgettable experiences.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-3" />
                <span>contact@eventticket.com</span>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="h-4 w-4 mr-3" />
                <span>123 Event Street, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Login / Sign Up
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Music & Concerts
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Technology
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Food & Drink
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Art & Culture
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>© 2024 EventTicket. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;