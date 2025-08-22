import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Calendar, User } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Calendar className="h-8 w-8 text-primary group-hover:animate-glow transition-all" />
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              EventTicket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/events') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/login" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/login') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Login
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 pt-4 pb-4 animate-slide-up">
            <div className="space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-medium transition-colors hover:text-primary ${
                  isActive('/events') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Events
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center py-2 font-medium transition-colors hover:text-primary ${
                  isActive('/login') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;