import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = ["Project Basics", "Technical Scope", "Complexity & Risk", "Commercial Inputs"];

interface FormData {
  // Step 1
  fixtureType: string;
  projectType: string;
  customer: string;
  partFamily: string;
  quantity: string;
  targetDelivery: string;
  // Step 2
  stations: string;
  designScope: string;
  customDesignLevel: string;
  cadAvailability: string;
  standardPartsReuse: string;
  // Step 3
  designComplexity: string;
  toleranceRequirement: string;
  revisionRisk: string;
  similarPastProject: string;
  specialNotes: string;
  // Step 4
  hourlyRate: string;
  materialCostRange: string;
  contingencyPct: string;
}

const defaultForm: FormData = {
  fixtureType: "", projectType: "", customer: "", partFamily: "", quantity: "", targetDelivery: "",
  stations: "", designScope: "", customDesignLevel: "", cadAvailability: "", standardPartsReuse: "",
  designComplexity: "", toleranceRequirement: "", revisionRisk: "", similarPastProject: "", specialNotes: "",
  hourlyRate: "", materialCostRange: "", contingencyPct: "",
};

const EstimateWorkflow = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const navigate = useNavigate();

  const update = (key: keyof FormData, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    // Store form data for results page
    sessionStorage.setItem("estimateForm", JSON.stringify(form));
    navigate("/estimate/results");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-2xl py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className={`hidden sm:inline text-sm ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        <Card className="bg-card border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">{STEPS[step]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {step === 0 && (
              <>
                <Field label="Fixture Type">
                  <Select value={form.fixtureType} onValueChange={(v) => update("fixtureType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select fixture type" /></SelectTrigger>
                    <SelectContent>
                      {["Welding Fixture", "Assembly Fixture", "Inspection Fixture", "Machining Fixture", "CMM Fixture", "Other"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Project Type">
                  <Select value={form.projectType} onValueChange={(v) => update("projectType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select project type" /></SelectTrigger>
                    <SelectContent>
                      {["New Program", "Engineering Change", "Refurbishment", "Prototype"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Customer / OEM">
                  <Input value={form.customer} onChange={(e) => update("customer", e.target.value)} placeholder="e.g. Ford, GM, Toyota" />
                </Field>
                <Field label="Part Family">
                  <Input value={form.partFamily} onChange={(e) => update("partFamily", e.target.value)} placeholder="e.g. Body Side, Underbody, Closure" />
                </Field>
                <Field label="Quantity of Fixtures">
                  <Input type="number" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g. 4" />
                </Field>
                <Field label="Target Delivery Date">
                  <Input type="date" value={form.targetDelivery} onChange={(e) => update("targetDelivery", e.target.value)} />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <Field label="Number of Stations">
                  <Input type="number" value={form.stations} onChange={(e) => update("stations", e.target.value)} placeholder="e.g. 6" />
                </Field>
                <Field label="Design Scope">
                  <Select value={form.designScope} onValueChange={(v) => update("designScope", v)}>
                    <SelectTrigger><SelectValue placeholder="Select scope" /></SelectTrigger>
                    <SelectContent>
                      {["Design Only", "Design + Engineering Support", "Full Package (Design + Build Support)"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Level of Custom Design">
                  <Select value={form.customDesignLevel} onValueChange={(v) => update("customDesignLevel", v)}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      {["Mostly Standard", "Moderate Customization", "Highly Custom", "Ground-Up Design"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="CAD Data Availability">
                  <Select value={form.cadAvailability} onValueChange={(v) => update("cadAvailability", v)}>
                    <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                    <SelectContent>
                      {["Full 3D CAD Available", "Partial CAD / 2D Drawings", "No CAD Data", "Pending"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Standard Parts Reuse Level">
                  <Select value={form.standardPartsReuse} onValueChange={(v) => update("standardPartsReuse", v)}>
                    <SelectTrigger><SelectValue placeholder="Select reuse level" /></SelectTrigger>
                    <SelectContent>
                      {["High (>70%)", "Medium (30-70%)", "Low (<30%)"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label="Design Complexity">
                  <Select value={form.designComplexity} onValueChange={(v) => update("designComplexity", v)}>
                    <SelectTrigger><SelectValue placeholder="Select complexity" /></SelectTrigger>
                    <SelectContent>
                      {["Low", "Medium", "High", "Very High"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tolerance Requirement">
                  <Select value={form.toleranceRequirement} onValueChange={(v) => update("toleranceRequirement", v)}>
                    <SelectTrigger><SelectValue placeholder="Select tolerance level" /></SelectTrigger>
                    <SelectContent>
                      {["Standard (±0.5mm)", "Tight (±0.25mm)", "Very Tight (±0.1mm)", "Ultra-Precision (<±0.05mm)"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Expected Revision Risk">
                  <Select value={form.revisionRisk} onValueChange={(v) => update("revisionRisk", v)}>
                    <SelectTrigger><SelectValue placeholder="Select risk level" /></SelectTrigger>
                    <SelectContent>
                      {["Low — Stable design", "Medium — Some changes expected", "High — Significant changes likely"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Similar Past Project Exists?">
                  <Select value={form.similarPastProject} onValueChange={(v) => update("similarPastProject", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Yes — Very similar", "Yes — Somewhat similar", "No — New territory"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Special Notes">
                  <Textarea value={form.specialNotes} onChange={(e) => update("specialNotes", e.target.value)} placeholder="Any additional context, constraints, or requirements..." rows={3} />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label="Engineering Hourly Rate ($)">
                  <Input type="number" value={form.hourlyRate} onChange={(e) => update("hourlyRate", e.target.value)} placeholder="e.g. 125" />
                </Field>
                <Field label="Material Cost Range">
                  <Select value={form.materialCostRange} onValueChange={(v) => update("materialCostRange", v)}>
                    <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                    <SelectContent>
                      {["< $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "> $100,000"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Contingency Percentage (%)">
                  <Input type="number" value={form.contingencyPct} onChange={(e) => update("contingencyPct", e.target.value)} placeholder="e.g. 10" />
                </Field>
              </>
            )}

            {/* Nav */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={() => setStep(step + 1)}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit}>
                  Generate Estimate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    {children}
  </div>
);

export default EstimateWorkflow;
