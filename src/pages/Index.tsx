import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-28 lg:py-40 text-center px-6">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
          Fixture &amp; Jig Estimating
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.05] max-w-4xl mx-auto">
          Price smarter.<br />Quote faster.
        </h1>
        <p className="mt-6 text-xl text-[#6e6e73] max-w-2xl mx-auto leading-relaxed">
          Stop relying on scattered spreadsheets and senior engineer guesswork. Get structured, repeatable estimates for engineering labor, lead time, and total project cost.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/estimate">
            <button className="rounded-full bg-primary text-white text-lg font-medium px-8 py-4 hover:bg-blue-700 transition-colors">
              Start an Estimate
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-lg font-medium px-8 py-4 hover:bg-gray-200 transition-colors">
              See How It Works
            </button>
          </a>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/[0.06]">
            <img
              src="/fixture-pricing-pro/hero.png"
              alt="Fixture Estimate Assistant showing cost breakdown and engineering hours"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container max-w-6xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest text-center mb-4">Why PricingPro</p>
          <h2 className="text-4xl font-bold text-center text-[#1d1d1f] mb-16 tracking-tight">
            Built for tooling teams who need to move fast.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-5">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-[#1d1d1f] text-xl mb-3">{b.title}</h3>
                <p className="text-[#6e6e73] leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container max-w-6xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest text-center mb-4">How It Works</p>
          <h2 className="text-4xl font-bold text-center text-[#1d1d1f] mb-16 tracking-tight">
            Three steps to a complete estimate.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{s.step}</div>
                <h3 className="font-semibold text-[#1d1d1f] text-xl mb-3">{s.title}</h3>
                <p className="text-[#6e6e73] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Preview */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="container max-w-4xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest text-center mb-4">Sample Output</p>
          <h2 className="text-4xl font-bold text-center text-[#1d1d1f] mb-12 tracking-tight">
            What your estimate looks like.
          </h2>
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Engineering Hours", value: "340 hrs" },
                { label: "Lead Time", value: "12 weeks" },
                { label: "Total Cost", value: "$87,500" },
                { label: "Confidence", value: "Medium-High" },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl bg-[#f5f5f7] p-4 text-center">
                  <p className="text-xs text-[#6e6e73] uppercase tracking-wide mb-1">{m.label}</p>
                  <p className="text-xl font-bold text-[#1d1d1f]">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#f5f5f7] p-6">
                <p className="text-sm font-semibold text-[#1d1d1f] mb-4">Cost Breakdown</p>
                <div className="space-y-3">
                  {[
                    { label: "Engineering Labor", pct: 55 },
                    { label: "Materials & Components", pct: 25 },
                    { label: "Contingency", pct: 12 },
                    { label: "Project Management", pct: 8 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#6e6e73]">{item.label}</span>
                        <span className="text-[#1d1d1f] font-medium">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-200">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-[#f5f5f7] p-6">
                <p className="text-sm font-semibold text-[#1d1d1f] mb-4">Risk Flags</p>
                <ul className="space-y-3 text-sm text-[#6e6e73]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                    Tight tolerances may increase revision cycles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                    No similar past project found for benchmarking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-green-400 flex-shrink-0" />
                    Standard parts reuse is high — reduces lead time
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
          Ready to streamline your quoting?
        </h2>
        <p className="text-xl text-[#6e6e73] mb-10">
          Create your first structured estimate in under 10 minutes.
        </p>
        <Link to="/estimate">
          <button className="rounded-full bg-primary text-white text-lg font-medium px-10 py-4 hover:bg-blue-700 transition-colors">
            Start an Estimate
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-[#6e6e73]">
          © 2026 PricingPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
