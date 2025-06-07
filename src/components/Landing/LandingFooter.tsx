
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">AICO</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            © 2024 AICO. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
