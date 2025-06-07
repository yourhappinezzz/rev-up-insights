
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, ArrowRight, Star } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small businesses and personal websites",
      badge: null,
      features: [
        "1 website analysis",
        "Basic AI recommendations",
        "Weekly performance reports",
        "Email support",
        "Dashboard access"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: 99,
      description: "Ideal for growing businesses and marketing teams",
      badge: "Most Popular",
      features: [
        "5 website analyses",
        "Advanced AI recommendations",
        "Real-time analytics",
        "A/B testing suggestions",
        "Priority support",
        "Custom reports",
        "Integration support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const
    },
    {
      name: "Agency",
      price: 299,
      description: "For agencies and enterprises managing multiple clients",
      badge: "Enterprise",
      features: [
        "Unlimited website analyses",
        "White-label reports",
        "Advanced competitor analysis",
        "Custom AI model training",
        "24/7 dedicated support",
        "API access",
        "Multi-user collaboration",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AICO
            </span>
          </Link>
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
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Scale your conversion optimization with AI-powered insights. 
            Start with a 14-day free trial, no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative transition-all duration-300 hover:shadow-lg flex flex-col ${
                plan.badge === "Most Popular" 
                  ? "ring-2 ring-primary scale-105 shadow-xl" 
                  : "hover:scale-105"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    className={`px-3 py-1 text-sm font-medium ${
                      plan.badge === "Most Popular"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    }`}
                  >
                    {plan.badge === "Most Popular" && <Star className="w-4 h-4 mr-1" />}
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-xl text-muted-foreground ml-1">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Billed monthly</p>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 mt-auto">
                  {plan.name === "Agency" ? (
                    <Link to="/contact">
                      <Button 
                        variant={plan.buttonVariant} 
                        className="w-full text-base py-6"
                        size="lg"
                      >
                        {plan.buttonText}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/signup">
                      <Button 
                        variant={plan.buttonVariant} 
                        className="w-full text-base py-6"
                        size="lg"
                      >
                        {plan.buttonText}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-6">
            All plans include a 14-day free trial. No setup fees, cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any charges or credits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What happens after my free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                After your 14-day free trial, you'll be automatically enrolled in the plan you selected. 
                You can cancel anytime during the trial without being charged.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer custom enterprise solutions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we offer custom enterprise solutions with dedicated support, custom integrations, 
                and tailored AI models. Contact our sales team to discuss your specific needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">AICO</span>
            </Link>
            <div className="text-sm text-muted-foreground">
              © 2024 AICO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
