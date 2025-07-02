import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  created_at: string;
}

interface Admission {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  created_at: string;
}

const Admin = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Form states
  const [updateForm, setUpdateForm] = useState({
    title: "",
    content: "",
    image_url: ""
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    image_url: "",
    description: ""
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [updatesData, galleryData, admissionsData] = await Promise.all([
        supabase.from('updates').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('admissions').select('*').order('created_at', { ascending: false })
      ]);

      setUpdates(updatesData.data || []);
      setGalleryItems(galleryData.data || []);
      setAdmissions(admissionsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updateForm.title || !updateForm.content) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('updates')
        .insert([{
          title: updateForm.title,
          content: updateForm.content,
          image_url: updateForm.image_url || null
        }]);

      if (error) throw error;

      toast({
        title: "Update added successfully!"
      });

      setUpdateForm({ title: "", content: "", image_url: "" });
      fetchAllData();
    } catch (error) {
      console.error('Error adding update:', error);
      toast({
        title: "Error adding update",
        variant: "destructive"
      });
    }
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!galleryForm.title || !galleryForm.image_url) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('gallery')
        .insert([galleryForm]);

      if (error) throw error;

      toast({
        title: "Gallery item added successfully!"
      });

      setGalleryForm({ title: "", image_url: "", description: "" });
      fetchAllData();
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast({
        title: "Error adding gallery item",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Update deleted successfully!"
      });

      fetchAllData();
    } catch (error) {
      console.error('Error deleting update:', error);
      toast({
        title: "Error deleting update",
        variant: "destructive"
      });
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Gallery item deleted successfully!"
      });

      fetchAllData();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Error deleting gallery item",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAdmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Admission entry deleted successfully!"
      });

      fetchAllData();
    } catch (error) {
      console.error('Error deleting admission:', error);
      toast({
        title: "Error deleting admission",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Admin Panel</h1>
          <p className="text-muted-foreground">Manage updates, gallery, and admission enquiries</p>
        </div>

        <Tabs defaultValue="updates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
          </TabsList>

          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Update</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-title">Title *</Label>
                    <Input
                      id="update-title"
                      value={updateForm.title}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Update title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-content">Content *</Label>
                    <Textarea
                      id="update-content"
                      value={updateForm.content}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Update content"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-image">Image URL (optional)</Label>
                    <Input
                      id="update-image"
                      value={updateForm.image_url}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Update</Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {updates.map((update) => (
                <Card key={update.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <Badge variant="secondary">
                        {new Date(update.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{update.content}</p>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteUpdate(update.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Gallery Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGalleryItem} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery-title">Title *</Label>
                    <Input
                      id="gallery-title"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Image title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gallery-image">Image URL *</Label>
                    <Input
                      id="gallery-image"
                      value={galleryForm.image_url}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gallery-description">Description (optional)</Label>
                    <Textarea
                      id="gallery-description"
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Image description"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">Add to Gallery</Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <Card key={item.id}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {admissions.map((admission) => (
                <Card key={admission.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{admission.name}</CardTitle>
                      <Badge variant="secondary">
                        {new Date(admission.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Email:</strong> {admission.email}</p>
                    <p><strong>Phone:</strong> {admission.phone}</p>
                    <p><strong>Course:</strong> {admission.course}</p>
                    {admission.message && (
                      <p><strong>Message:</strong> {admission.message}</p>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteAdmission(admission.id)}
                      className="mt-4"
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;