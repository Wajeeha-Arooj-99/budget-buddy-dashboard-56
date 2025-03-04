
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md animate-fade-in">
        <div className="mb-4">
          <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto">
            <span className="text-4xl text-primary">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. Let's get you back on track.
        </p>
        <Button asChild className="mt-4">
          <Link to="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
