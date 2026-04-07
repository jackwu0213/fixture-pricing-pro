import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Download, Save, ArrowLeft, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = [
  "hsl(213, 56%, 34%)",
  "hsl(38, 92%, 50%)",
  "hsl(152, 56%, 40%)",
  "hsl(215, 12%, 50%)",
];

// Mock estimate generation
function generateEstimate(form: Record<string, string>) {
  const baseHours = 200;
  const stations = parseInt(form.stations) || 4;
  const qty = parseInt(form.quantity) || 1;
  const rate = parseInt(form.hourlyRate) || 125;
  const contingency = parseInt(form.contingencyPct) || 10;

  const complexityMult: Record<string, number> = { Low: 0.7, Medium: 1, High: 1.4, "Very High": 1.8 };
  const scopeMult: Record<string, number> = { "Design Only": 0.6, "Design + Engineering Support": 0.85, "Full Package (Design + Build Support)": 1.2 };
  const customMult: Record<string, number> = { "Mostly Standard": 0.7, "Moderate Customization": 1, "Highly Custom": 1.3, "Ground-Up Design": 1.6 };

  const cm = complexityMult[form.designComplexity] || 1;
  const sm = scopeMult[form.designScope] || 1;
  const cust = customMult[form.customDesignLevel] || 1;

  const hours = Math.round(baseHours * stations * cm * sm * cust * (qty > 1 ? 0.7 + qty * 0.3 : 1));
  const laborCost = hours * rate;
  const materialMap: Record<string, number> = { "< $10,000": 7500, "$10,000 - $25,000": 17500, "$25,000 - $50,000": 37500, "$50,000 - $100,000": 75000, "> $100,000": 125000 };
  const materialCost = materialMap[form.materialCostRange] || 25000;
  const pmCost = Math.round(laborCost * 0.1);
  const contingencyCost = Math.round((laborCost + materialCost + pmCost) * contingency / 100);
  const totalCost = laborCost + materialCost + pmCost + contingencyCost;

  const weeksBase = Math.ceil(hours / 40);
  const leadTime = Math.max(6, Math.min(weeksBase + 2, 24));

  // Confidence
  let confidence = "Medium";
  if (form.similarPastProject?.includes("Very similar") && cm <= 1 && form.cadAvailability?.includes("Full")) confidence = "High";
  else if (form.similarPastProject?.includes("New territory") || cm > 1.3) confidence = "Low";

  // Risks
  const risks: { type: "warning" | "success" | "info"; text: string }[] = [];
  if (form.toleranceRequirement?.includes("Very Tight") || form.toleranceRequirement?.includes("Ultra")) risks.push({ type: "warning", text: "Tight tolerances may increase revision cycles and inspection time" });
  if (form.revisionRisk?.includes("High")) risks.push({ type: "warning", text: "High revision risk — consider adding buffer to schedule" });
  if (form.similarPastProject?.includes("New territory")) risks.push({ type: "warning", text: "No similar past project for benchmarking" });
  if (form.cadAvailability?.includes("No CAD")) risks.push({ type: "warning", text: "No CAD data available — design effort will be higher" });
  if (form.standardPartsReuse?.includes("High")) risks.push({ type: "success", text: "High standard parts reuse reduces lead time and cost" });
  if (form.similarPastProject?.includes("Very similar")) risks.push({ type: "success", text: "Similar past project exists — estimate confidence is higher" });
  if (risks.length === 0) risks.push({ type: "info", text: "No significant risk flags identified" });

  return {
    hours, leadTime, totalCost, confidence, risks,
    breakdown: [
      { name: "Engineering Labor", value: laborCost },
      { name: "Materials & Components", value: materialCost },
      { name: "Project Management", value: pmCost },
      { name: "Contingency", value: contingencyCost },
    ],
    assumptions: [
      `Engineering rate: $${rate}/hr`,
      `Contingency: ${contingency}%`,
      `${stations} station(s), ${qty} fixture(s)`,
      `Design scope: ${form.designScope || "Not specified"}`,
      `Complexity: ${form.designComplexity || "Medium"}`,
    ],
    nextSteps: [
      "Review estimate with engineering lead for validation",
      "Confirm material specifications and vendor pricing",
      "Schedule kick-off meeting with customer",
      "Finalize delivery timeline based on shop capacity",
    ],
  };
}

const EstimateResults = () => {
  const [estimate, setEstimate] = useState<ReturnType<typeof generateEstimate> | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("estimateForm");
    if (stored) {
      const parsed = JSON.parse(stored);
      setForm(parsed);
      setEstimate(generateEstimate(parsed));
    } else {
      // Demo data
      const demo = {
        fixtureType: "Welding Fixture", projectType: "New Program", customer: "Ford", partFamily: "Body Side",
        quantity: "4", stations: "6", designScope: "Full Package (Design + Build Support)",
        customDesignLevel: "Moderate Customization", cadAvailability: "Full 3D CAD Available",
        standardPartsReuse: "High (>70%)", designComplexity: "Medium", toleranceRequirement: "Tight (±0.25mm)",
        revisionRisk: "Medium — Some changes expected", similarPastProject: "Yes — Somewhat similar",
        hourlyRate: "125", materialCostRange: "$25,000 - $50,000", contingencyPct: "10", specialNotes: "",
        targetDelivery: "",
      };
      setForm(demo);
      setEstimate(generateEstimate(demo));
    }
  }, []);

  if (!estimate) return null;

  const fmt = (n: number) => "$" + n.toLocaleString();
  const riskIcon = { warning: AlertTriangle, success: CheckCircle, info: Info };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-5xl py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/estimate" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Estimate
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Estimate Summary</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {form.fixtureType} — {form.projectType} — {form.customer || "Customer"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Save className="h-4 w-4 mr-1" /> Save Estimate</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export PDF</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Engineering Hours", value: `${estimate.hours} hrs` },
            { label: "Lead Time", value: `${estimate.leadTime} weeks` },
            { label: "Total Cost", value: fmt(estimate.totalCost) },
            { label: "Confidence Level", value: estimate.confidence },
          ].map((kpi) => (
            <Card key={kpi.label} className="bg-card border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Cost Chart */}
          <Card className="bg-card border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={estimate.breakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                    {estimate.breakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => fmt(val)} />
                  <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {estimate.breakdown.map((item, i) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </span>
                    <span className="font-medium text-foreground">{fmt(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risks */}
          <Card className="bg-card border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Risk Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {estimate.risks.map((r, i) => {
                  const Icon = riskIcon[r.type];
                  const colorClass = r.type === "warning" ? "text-warning" : r.type === "success" ? "text-success" : "text-info";
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colorClass}`} />
                      <span className="text-muted-foreground">{r.text}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            <CardHeader className="pb-2 pt-4 border-t">
              <CardTitle className="text-base">Similar Historical Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-surface p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Reference: {form.similarPastProject || "N/A"}</p>
                <p>Historical comparison data will be available in a future release. This section will show matched projects from your database.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Assumptions */}
          <Card className="bg-card border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Assumptions Used</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {estimate.assumptions.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-card border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {estimate.nextSteps.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EstimateResults;
