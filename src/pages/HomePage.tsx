import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, GraduationCap, Users, BookCheck, Brain } from 'lucide-react';
import Logo from '@/components/common/Logo';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-border hover:border-primary/20 hover:shadow-lg transition-all">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/courses" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Courses
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/register" className="hidden sm:block">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-elimu-primary/10 to-elimu-accent/10 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-elimu-primary/10 px-3 py-1 text-sm text-elimu-primary">
                Introducing ElimuTech LMS
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Transform Your Learning Experience with AI
              </h1>
              <p className="text-muted-foreground md:text-xl">
                An advanced learning management system with AI tutoring, M-Pesa integration, and mobile optimization designed for Kenyan learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 lg:flex-shrink-0 lg:overflow-hidden rounded-xl border shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Students learning with technology"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Everything you need to enhance your learning experience
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<BookOpen size={24} />}
              title="Interactive Courses"
              description="Engaging multimedia courses with videos, quizzes, and downloadable resources."
            />
            <FeatureCard
              icon={<Brain size={24} />}
              title="AI Tutor Chatbot"
              description="24/7 AI assistant that helps answer questions and explains concepts."
            />
            <FeatureCard
              icon={<GraduationCap size={24} />}
              title="Verified Certificates"
              description="Earn certificates upon course completion with secure verification."
            />
            <FeatureCard
              icon={<BookCheck size={24} />}
              title="Progress Tracking"
              description="Track your learning progress with detailed analytics and insights."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Students Say</h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Success stories from students across Kenya
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background p-6 rounded-lg shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">{String.fromCharCode(64 + i)}</span>
                  </div>
                  <div>
                    <p className="font-medium">Student Name</p>
                    <p className="text-sm text-muted-foreground">Web Development Course</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "ElimuTech has transformed my learning experience. The AI tutor helped me understand difficult concepts, and the mobile access made it easy to study anywhere."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-elimu-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of students already learning on ElimuTech LMS. Access courses anytime, anywhere.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-elimu-primary hover:bg-white/90">
              Sign Up for Free
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground">
                A comprehensive learning management system with AI integration and Mpesa payment support
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link to="/courses" className="text-muted-foreground hover:text-primary">Courses</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/cookie" className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Nairobi, Kenya</li>
                <li className="text-muted-foreground">info@elimutech.co.ke</li>
                <li className="text-muted-foreground">+254 700 000000</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 ElimuTech LMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
