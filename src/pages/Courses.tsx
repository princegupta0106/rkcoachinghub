import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Courses = () => {
  const courses = [
    {
      title: "JEE Main & Advanced",
      duration: "2 Years",
      description: "Comprehensive preparation for Engineering entrance exams with Physics, Chemistry, and Mathematics.",
      features: ["Expert Faculty", "Mock Tests", "Study Material", "Doubt Sessions"]
    },
    {
      title: "NEET Preparation",
      duration: "2 Years", 
      description: "Complete Medical entrance exam preparation covering Physics, Chemistry, and Biology.",
      features: ["Medical Experts", "Practice Tests", "Lab Sessions", "Revision Classes"]
    },
    {
      title: "Class 10 Foundation",
      duration: "1 Year",
      description: "Strong foundation building for board exams and future competitive preparations.",
      features: ["Board Focused", "Concept Building", "Regular Tests", "Parent Meetings"]
    },
    {
      title: "Class 11 Science",
      duration: "1 Year",
      description: "Bridge course for smooth transition from Class 10 to advanced science subjects.",
      features: ["PCM/PCB Streams", "Practical Labs", "Project Guidance", "Career Counseling"]
    },
    {
      title: "Class 12 Science",
      duration: "1 Year", 
      description: "Board exam excellence with competitive exam readiness for final year students.",
      features: ["Board + JEE/NEET", "Intensive Revision", "Previous Papers", "Time Management"]
    },
    {
      title: "Competitive Exam Prep",
      duration: "Flexible",
      description: "Specialized courses for various competitive examinations and entrance tests.",
      features: ["Multiple Exams", "Flexible Timing", "Online Support", "Result Oriented"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Courses</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses designed to help students excel in academics and competitive examinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="shadow-card hover:shadow-hero transition-shadow h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-primary">{course.title}</CardTitle>
                  <Badge variant="secondary">{course.duration}</Badge>
                </div>
                <p className="text-muted-foreground">{course.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3">Course Features:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link to="/contact">Enquire Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted/50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Need Help Choosing?</h2>
          <p className="text-muted-foreground mb-6">
            Our counselors are here to help you select the right course based on your goals and current academic level.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Get Free Counseling</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;