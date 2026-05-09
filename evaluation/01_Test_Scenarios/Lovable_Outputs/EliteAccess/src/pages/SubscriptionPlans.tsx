import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Essential",
    monthly: 49,
    yearly: 470,
    features: ["Basic concierge support", "Partner discounts", "Monthly newsletter", "Community forum access"],
    popular: false,
  },
  {
    name: "Professional",
    monthly: 99,
    yearly: 950,
    features: ["Priority 24/7 support", "All partner discounts", "Networking events", "Dedicated manager", "Quarterly strategy call"],
    popular: true,
  },
  {
    name: "Elite",
    monthly: 199,
    yearly: 1900,
    features: ["White-glove concierge", "All benefits included", "VIP networking events", "Dedicated team", "Annual retreat access", "Custom integrations"],
    popular: false,
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your membership at any time. Changes take effect at the start of your next billing cycle." },
  { q: "Is there a free trial?", a: "We offer a 14-day money-back guarantee on all plans so you can try risk-free." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, wire transfers, and ACH payments for annual plans." },
  { q: "Can I cancel my subscription?", a: "Absolutely. You can cancel anytime from your account dashboard with no cancellation fees." },
];

const SubscriptionPlans = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <Layout>
      <SEOHead title="Membership Plans" description="Compare EliteAccess membership tiers: Essential, Professional, and Elite. Monthly and yearly pricing available." />
      <section className="section-padding" aria-labelledby="plans-heading">
        <div className="container-narrow text-center">
          <h1 id="plans-heading" className="mb-2 text-4xl font-bold text-foreground">Membership Plans</h1>
          <p className="mb-8 text-muted-foreground">Choose the tier that matches your ambitions</p>

          {/* Toggle */}
          <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1" role="radiogroup" aria-label="Billing frequency">
            <button
              onClick={() => setYearly(false)}
              role="radio"
              aria-checked={!yearly}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              role="radio"
              aria-checked={yearly}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Yearly <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>

          {/* Plans */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 text-left transition-shadow hover:shadow-lg ${
                  plan.popular ? "border-primary shadow-md" : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground" aria-label={`${yearly ? plan.yearly : plan.monthly} dollars per ${yearly ? "year" : "month"}`}>
                    ${yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/{yearly ? "year" : "mo"}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                  <Link to="/signup">Subscribe</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface" aria-labelledby="faq-heading">
        <div className="container-narrow max-w-2xl">
          <h2 id="faq-heading" className="mb-8 text-center text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border bg-card px-5">
                <AccordionTrigger className="text-sm font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default SubscriptionPlans;
