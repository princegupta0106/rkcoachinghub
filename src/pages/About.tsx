import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">About Elite Coaching Center</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Established with a vision to provide quality education and nurture young minds for a brighter future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Elite Coaching Center was founded in 2010 with a simple yet powerful mission: to provide 
                exceptional educational guidance that helps students achieve their academic goals and realize 
                their full potential.
              </p>
              <p>
                Over the years, we have grown from a small coaching institute to a renowned educational 
                institution, helping thousands of students excel in competitive examinations and build 
                successful careers.
              </p>
              <p>
                Our commitment to excellence, personalized attention, and innovative teaching methods 
                has made us a trusted name in education.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Our Mission</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To provide world-class education that empowers students to excel in their chosen fields 
                and become responsible citizens who contribute positively to society.
              </p>
              <p>
                We believe in nurturing not just academic excellence but also character development, 
                critical thinking, and leadership skills that will serve our students throughout their lives.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Experienced Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team consists of highly qualified teachers with years of experience in their respective subjects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  95% success rate in competitive exams with students securing top ranks consistently.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Individual Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Small batch sizes ensure personalized attention and customized learning approaches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center bg-muted/50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Join Our Success Story</h2>
          <p className="text-muted-foreground mb-6">
            Be part of our legacy of excellence and take the first step towards achieving your dreams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;