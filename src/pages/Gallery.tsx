import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  description?: string;
  created_at: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore moments from our vibrant campus life, events, and achievements
          </p>
        </div>

        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No images available in the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer animate-fade-in"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-hero transition-all duration-300">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full relative animate-scale-in">
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-sm opacity-90 mt-1">{selectedImage.description}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;