import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BarChart3, DollarSign, FileText, Settings, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const benefits = [
  {
    icon: Clock,
    title: "Faster Quoting",
    description: "Generate first-pass estimates in minutes instead of hours. Reduce quote turnaround and win more business.",
  },
  {
    icon: BarChart3,
    title: "More Consistent Estimates",
    description: "Replace gut-feel pricing with structured logic. Every estimate follows the same proven methodology.",
  },
  {
    icon: DollarSign,
    title: "Clearer Cost Drivers",
    description: "See exactly what drives cost — complexity, tolerances, revision risk — so you can price with confidence.",
  },
];

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Enter Project Details",
    description: "Provide fixture type, scope, complexity, and commercial inputs through a guided workflow.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Review Estimate Logic",
    description: "The system applies structured estimation rules based on your inputs and historical benchmarks.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Generate Estimate Summary",
    description: "Receive a detailed breakdown of labor, lead time, cost, confidence level, and risk flags.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
            Estimate jig and fixture projects faster with more consistency
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop relying on scattered spreadsheets and senior engineer guesswork. Get structured, repeatable estimates for engineering labor, lead time, and total project cost.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/estimate">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                Start an Estimate
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-12">
            Why teams use Fixture Estimate Assistant
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <Card key={b.title} className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6 px-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Preview */}
      <section className="py-16 bg-surface">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
            What your estimate looks like
          </h2>
          <Card className="bg-card border shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Engineering Hours", value: "340 hrs" },
                  { label: "Lead Time", value: "12 weeks" },
                  { label: "Total Cost", value: "$87,500" },
                  { label: "Confidence", value: "Medium-High" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-surface p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{m.label}</p>
                    <p className="text-xl font-bold text-foreground">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-surface p-4">
                  <p className="text-sm font-medium text-foreground mb-3">Cost Breakdown</p>
                  <div className="space-y-2">
                    {[
                      { label: "Engineering Labor", pct: 55 },
                      { label: "Materials & Components", pct: 25 },
                      { label: "Contingency", pct: 12 },
                      { label: "Project Management", pct: 8 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground font-medium">{item.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-border">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-surface p-4">
                  <p className="text-sm font-medium text-foreground mb-3">Risk Flags</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-warning flex-shrink-0" />
                      Tight tolerances may increase revision cycles
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-warning flex-shrink-0" />
                      No similar past project found for benchmarking
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-success flex-shrink-0" />
                      Standard parts reuse is high — reduces lead time
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Ready to streamline your quoting process?
          </h2>
          <p className="text-muted-foreground mb-8">
            Create your first structured estimate in under 10 minutes.
          </p>
          <Link to="/estimate">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Start an Estimate
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 Fixture Estimate Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
