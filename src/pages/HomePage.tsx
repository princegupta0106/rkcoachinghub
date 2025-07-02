import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdmissionForm from "@/components/AdmissionForm";
import { supabase } from "@/integrations/supabase/client";
import heroBuilding from "@/assets/hero-building.jpg";

interface Update {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  description?: string;
}

const HomePage = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetchUpdates();
    fetchGalleryItems();
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setUpdates(data || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const scrollToAdmission = () => {
    document.getElementById('admission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBuilding})` }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            RK Coaching Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Empowering students to achieve their dreams through excellence in education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-accent hover:bg-accent-light text-accent-foreground"
              onClick={scrollToAdmission}
            >
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-black  hover:bg-primary-foreground hover:text-primary"
              onClick={scrollToAdmission}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Elite Coaching?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive education with experienced faculty and proven results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn from highly qualified and experienced teachers who are passionate about your success.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  95% success rate in competitive exams with top ranks achieved by our students.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-hero transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Modern Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  State-of-the-art classrooms with digital learning tools and comfortable environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      {updates.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Latest Updates</h2>
              <p className="text-muted-foreground">Stay informed with our recent announcements</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {updates.map((update) => (
                <Card key={update.id} className="shadow-card hover:shadow-hero transition-shadow">
                  {update.image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={update.image_url} 
                        alt={update.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(update.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{update.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {galleryItems.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Gallery</h2>
              <p className="text-muted-foreground">Glimpses of our vibrant campus life</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-hero transition-shadow">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Admission Form */}
      <section id="admission" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Start Your Journey</h2>
            <p className="text-muted-foreground">Take the first step towards academic excellence</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AdmissionForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;