
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About ElimuTech</h1>
            <p className="text-xl opacity-90 mb-8">
              Transforming education through accessible, innovative learning experiences.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/courses">Explore Our Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                ElimuTech is on a mission to make high-quality education accessible to everyone, regardless of their location or background. We believe that knowledge should be a right, not a privilege.
              </p>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-700">
                To create a global learning community where students and educators collaborate to solve the world's most pressing challenges through continuous education and skill development.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                alt="Students learning" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Founder & CEO",
                bio: "With over 15 years in educational technology, Sarah is dedicated to democratizing education globally.",
                avatar: "/placeholder.svg"
              },
              {
                name: "Michael Chen",
                role: "Chief Technology Officer",
                bio: "Michael brings a decade of experience developing innovative learning platforms focused on user experience.",
                avatar: "/placeholder.svg"
              },
              {
                name: "Priya Patel",
                role: "Head of Curriculum",
                bio: "As a former professor, Priya ensures our courses maintain the highest academic standards and relevance.",
                avatar: "/placeholder.svg"
              }
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto rounded-full overflow-hidden w-24 h-24 mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Take the first step towards a better future with ElimuTech's innovative courses and supportive community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
