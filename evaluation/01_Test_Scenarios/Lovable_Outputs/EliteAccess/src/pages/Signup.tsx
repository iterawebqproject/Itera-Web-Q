import { useState } from "react";
import { Shield, Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";

const badges = [
  { icon: Shield, label: "256-bit SSL" },
  { icon: Lock, label: "PCI Compliant" },
  { icon: CreditCard, label: "Secure Payments" },
];

interface FormState {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", password: "",
    address: "", city: "", zip: "",
    cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateStep = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (step === 1) {
      if (!form.name.trim()) errs.name = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
      if (form.password.length < 8) errs.password = "Min 8 characters";
    } else if (step === 2) {
      if (!form.address.trim()) errs.address = "Required";
      if (!form.city.trim()) errs.city = "Required";
      if (!form.zip.trim()) errs.zip = "Required";
    } else {
      if (!form.cardNumber.trim()) errs.cardNumber = "Required";
      if (!form.expiry.trim()) errs.expiry = "Required";
      if (!form.cvv.trim()) errs.cvv = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else {
      setDone(true);
      toast.success("Welcome to EliteAccess!");
    }
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: { label: string; field: keyof FormState; type?: string; placeholder?: string }) => {
    const id = `signup-${field}`;
    return (
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">{label}</label>
        <input
          id={id}
          type={type}
          value={form[field]}
          onChange={(e) => update(field, e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!errors[field]}
          aria-describedby={errors[field] ? `${id}-error` : undefined}
          className={`w-full rounded-md border px-3 py-2.5 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
            errors[field] ? "border-destructive" : "border-input"
          }`}
        />
        {errors[field] && <p id={`${id}-error`} className="mt-1 text-xs text-destructive" role="alert">{errors[field]}</p>}
      </div>
    );
  };

  if (done) {
    return (
      <Layout>
        <SEOHead title="Welcome" description="Your EliteAccess membership is now active." />
        <section className="section-padding flex min-h-[60vh] items-center justify-center">
          <div className="mx-auto max-w-md text-center animate-fade-in" role="status">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success" aria-hidden="true">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome Aboard!</h1>
            <p className="text-muted-foreground">Your EliteAccess membership is now active. Check your email for next steps.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Sign Up" description="Create your EliteAccess membership account in three simple steps." />
      <section className="section-padding">
        <div className="container-narrow mx-auto max-w-lg">
          <h1 className="mb-2 text-center text-3xl font-bold text-foreground">Create Your Account</h1>
          <p className="mb-8 text-center text-muted-foreground" aria-live="polite">Step {step} of 3</p>

          {/* Progress */}
          <div className="mb-8 flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className="mb-4 text-lg font-semibold text-foreground">Account Setup</legend>
                <Field label="Full Name" field="name" placeholder="John Doe" />
                <Field label="Email" field="email" type="email" placeholder="john@example.com" />
                <Field label="Password" field="password" type="password" placeholder="Min 8 characters" />
              </fieldset>
            )}
            {step === 2 && (
              <fieldset className="space-y-4">
                <legend className="mb-4 text-lg font-semibold text-foreground">Shipping Details</legend>
                <Field label="Address" field="address" placeholder="123 Main St" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" field="city" placeholder="New York" />
                  <Field label="ZIP Code" field="zip" placeholder="10001" />
                </div>
              </fieldset>
            )}
            {step === 3 && (
              <fieldset className="space-y-4">
                <legend className="mb-4 text-lg font-semibold text-foreground">Payment Information</legend>
                <Field label="Card Number" field="cardNumber" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" field="expiry" placeholder="MM/YY" />
                  <Field label="CVV" field="cvv" placeholder="123" />
                </div>
              </fieldset>
            )}

            <div className="mt-6 flex gap-3">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  Back
                </Button>
              )}
              <Button onClick={next} className="flex-1">
                {step === 3 ? "Complete Signup" : "Continue"}
              </Button>
            </div>
          </div>

          {/* Security badges */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {badges.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <b.icon size={14} aria-hidden="true" />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
