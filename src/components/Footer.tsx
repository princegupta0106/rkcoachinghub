import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">RK</span>
              </div>
              <span className="text-xl font-bold">RK Coaching Hub</span>
            </div>
            <p className="text-primary-foreground/80">
              Empowering students to achieve their dreams through excellence in education.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About Us</Link></li>
              <li><Link to="/courses" className="text-primary-foreground/80 hover:text-primary-foreground">Courses</Link></li>
              <li><Link to="/updates" className="text-primary-foreground/80 hover:text-primary-foreground">Updates</Link></li>
              <li><Link to="/gallery" className="text-primary-foreground/80 hover:text-primary-foreground">Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>123 Education Street</li>
              <li>+91 98765 43210</li>
              <li>info@rkcoachinghub.com</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Office Hours</h3>
            <div className="text-primary-foreground/80">
              <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 RK Coaching Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;