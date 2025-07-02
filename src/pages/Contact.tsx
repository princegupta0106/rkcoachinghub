import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdmissionForm from "@/components/AdmissionForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for admissions, queries, or any information about our coaching programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Visit Our Campus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    123 Education Street<br/>
                    Academic District<br/>
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">info@elitecoaching.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br/>
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <AdmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;