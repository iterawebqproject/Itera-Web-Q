import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageMeta from "@/components/PageMeta";

const endpoints = [
  {
    id: "get-users",
    method: "GET",
    path: "/v1/users",
    description: "Retrieve a list of all users in your organization.",
    params: [
      { name: "limit", type: "integer", required: false, desc: "Max results (default 25, max 100)" },
      { name: "offset", type: "integer", required: false, desc: "Pagination offset" },
    ],
    response: `{\n  "data": [\n    {\n      "id": "usr_abc123",\n      "email": "dev@example.com",\n      "role": "admin",\n      "created_at": "2026-01-15T08:30:00Z"\n    }\n  ],\n  "meta": { "total": 42, "limit": 25, "offset": 0 }\n}`,
  },
  {
    id: "create-user",
    method: "POST",
    path: "/v1/users",
    description: "Create a new user in your organization.",
    params: [
      { name: "email", type: "string", required: true, desc: "User email address" },
      { name: "role", type: "string", required: false, desc: "User role (default: member)" },
    ],
    response: `{\n  "data": {\n    "id": "usr_def456",\n    "email": "new@example.com",\n    "role": "member"\n  }\n}`,
  },
  {
    id: "get-api-keys",
    method: "GET",
    path: "/v1/api-keys",
    description: "List all API keys for the authenticated account.",
    params: [],
    response: `{\n  "data": [\n    {\n      "id": "key_xyz789",\n      "name": "Production",\n      "prefix": "dp_live_...",\n      "created_at": "2026-03-01T10:00:00Z"\n    }\n  ]\n}`,
  },
  {
    id: "create-webhook",
    method: "POST",
    path: "/v1/webhooks",
    description: "Register a new webhook endpoint.",
    params: [
      { name: "url", type: "string", required: true, desc: "Webhook delivery URL" },
      { name: "events", type: "string[]", required: true, desc: "Event types to subscribe" },
    ],
    response: `{\n  "data": {\n    "id": "wh_abc123",\n    "url": "https://example.com/webhook",\n    "events": ["user.created", "user.deleted"],\n    "active": true\n  }\n}`,
  },
];

const errorCodes = [
  { code: 400, name: "Bad Request", desc: "The request body or parameters are invalid." },
  { code: 401, name: "Unauthorized", desc: "Missing or invalid API key." },
  { code: 403, name: "Forbidden", desc: "Insufficient permissions for this resource." },
  { code: 404, name: "Not Found", desc: "The requested resource does not exist." },
  { code: 429, name: "Rate Limited", desc: "Too many requests. Retry after the Retry-After header." },
  { code: 500, name: "Server Error", desc: "An internal error occurred. Contact support if persistent." },
];

const methodColors: Record<string, string> = {
  GET: "bg-success/10 text-success",
  POST: "bg-info/10 text-info",
  PUT: "bg-warning/10 text-warning",
  DELETE: "bg-destructive/10 text-destructive",
};

export default function ApiReferencePage() {
  const [selected, setSelected] = useState(endpoints[0].id);
  const current = endpoints.find((e) => e.id === selected)!;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
      <PageMeta
        title="API Reference"
        description="Explore DevPortal REST API endpoints, authentication, and error codes."
        path="/api-reference"
      />
      {/* Left Pane: Endpoint Nav */}
      <nav className="w-56 border-r overflow-y-auto p-4 space-y-1 shrink-0 hidden md:block" aria-label="API endpoints">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Endpoints
        </h3>
        {endpoints.map((ep) => (
          <button
            key={ep.id}
            onClick={() => setSelected(ep.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selected === ep.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Badge variant="secondary" className={`${methodColors[ep.method]} mr-2 text-[10px] px-1.5`}>
              {ep.method}
            </Badge>
            <span className="font-mono text-xs">{ep.path}</span>
          </button>
        ))}

        <Separator className="my-4" />

        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Reference
        </h3>
        <a href="#auth" className="block px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md">
          Authentication
        </a>
        <a href="#errors" className="block px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md">
          Error Codes
        </a>
      </nav>

      {/* Center Pane: Specs */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={`${methodColors[current.method]} text-xs`}>
              {current.method}
            </Badge>
            <code className="text-lg font-mono font-semibold">{current.path}</code>
          </div>
          <p className="text-sm text-muted-foreground">{current.description}</p>
        </div>

        {current.params.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Parameters</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-2 font-medium">Name</th>
                    <th className="text-left px-4 py-2 font-medium">Type</th>
                    <th className="text-left px-4 py-2 font-medium">Required</th>
                    <th className="text-left px-4 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {current.params.map((p) => (
                    <tr key={p.name} className="border-b last:border-0">
                      <td className="px-4 py-2 font-mono text-xs">{p.name}</td>
                      <td className="px-4 py-2 text-muted-foreground">{p.type}</td>
                      <td className="px-4 py-2">
                        {p.required ? (
                          <Badge variant="secondary" className="bg-destructive/10 text-destructive text-[10px]">Required</Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">Optional</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Auth Section */}
        <section id="auth" className="space-y-3">
          <h3 className="text-sm font-semibold">Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Include your API key in the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header:
          </p>
          <pre className="code-block">
            <code>{`Authorization: Bearer dp_live_your_api_key`}</code>
          </pre>
        </section>

        {/* Error Codes */}
        <section id="errors" className="space-y-3">
          <h3 className="text-sm font-semibold">Error Codes</h3>
          <Accordion type="multiple" className="space-y-1">
            {errorCodes.map((err) => (
              <AccordionItem key={err.code} value={String(err.code)} className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-mono text-xs">{err.code}</Badge>
                    <span className="font-medium">{err.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {err.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* Right Pane: Code Example */}
      <aside className="w-80 border-l overflow-y-auto p-6 space-y-4 shrink-0 hidden lg:block bg-card">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Response Example
        </h3>
        <pre className="code-block text-xs">
          <code>{current.response}</code>
        </pre>

        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6">
          cURL Example
        </h3>
        <pre className="code-block text-xs">
          <code>{`curl -X ${current.method} \\\n  https://api.devportal.io${current.path} \\\n  -H "Authorization: Bearer dp_live_..." \\\n  -H "Content-Type: application/json"`}</code>
        </pre>
      </aside>
    </div>
  );
}
