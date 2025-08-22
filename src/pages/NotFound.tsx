import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '../components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <h1 className="text-9xl font-bold gradient-primary bg-clip-text text-transparent">404</h1>
            <div className="text-4xl font-bold text-foreground mt-4">Oops! Page not found</div>
            <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto">
              The page you're looking for seems to have wandered off to another event.
            </p>
          </div>
          
          <div className="space-y-4">
            <a 
              href="/" 
              className="btn-primary inline-flex items-center"
            >
              Return to Home
            </a>
            <div className="text-muted-foreground">
              Or <a href="/events" className="text-primary hover:text-primary-glow transition-colors">browse all events</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
