import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, TrendingUp, Target, CheckCircle, ArrowRight, Star, Quote } from "lucide-react";

export default function Landing() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Monitor your website performance with live data and insights."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Revenue Optimization",
      description: "AI-powered recommendations to boost your conversion rates."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Targeting",
      description: "Identify and focus on your highest-value visitors."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO, TechStart",
      company: "TechStart Inc.",
      image: "/placeholder.svg",
      rating: 5,
      text: "AICO transformed our conversion rates completely. We saw a 45% increase in sales within the first month. The AI recommendations were spot-on and easy to implement."
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Marketing Director",
      company: "E-commerce Pro",
      image: "/placeholder.svg",
      rating: 5,
      text: "The real-time analytics dashboard is incredible. We can see exactly what's working and what isn't. AICO pays for itself within weeks."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Founder",
      company: "Digital Solutions",
      image: "/placeholder.svg",
      rating: 5,
      text: "As a small business owner, I needed something that just works. AICO's AI does all the heavy lifting, and I focus on running my business. Highly recommended!"
    }
  ];

  const benefits = [
    "Increase conversion rates by up to 40%",
    "Real-time performance monitoring",
    "AI-powered optimization suggestions",
    "Easy integration with existing websites",
    "Comprehensive analytics dashboard"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AICO
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Optimize Your Website's{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Conversion Rate
            </span>{" "}
            with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Analyze any website, get AI-powered recommendations, and see real-time revenue impact 
            in a beautiful dashboard. Transform visitors into customers effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to optimize your website's performance and maximize revenue.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                activeFeature === index ? 'ring-2 ring-primary' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their businesses with AICO.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardHeader>
                <div className="absolute top-4 right-4 text-primary">
                  <Quote className="w-8 h-8 opacity-20" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose AICO?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/signup">
                <Button size="lg">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">+40%</div>
                  <div className="text-muted-foreground">Average conversion increase</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">$2.3M</div>
                    <div className="text-sm text-muted-foreground">Revenue generated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-sm text-muted-foreground">Websites optimized</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="text-center p-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent>
            <h2 className="text-4xl font-bold mb-4">Ready to Optimize Your Website?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using AICO to boost their conversion rates.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">AICO</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AICO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
