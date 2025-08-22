import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { searchEvents } from '../data/events';

interface LayoutProps {
  children: ReactNode;
  onSearchResults?: (results: any[]) => void;
}

const Layout = ({ children, onSearchResults }: LayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearchResults) {
      const results = searchEvents(query);
      onSearchResults(results);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;