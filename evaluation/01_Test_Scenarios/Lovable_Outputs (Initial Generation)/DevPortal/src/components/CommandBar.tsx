import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const searchItems = [
  { label: "Quick Start Guide", path: "/support/getting-started", group: "Guides" },
  { label: "Authentication Setup", path: "/support/authentication", group: "Guides" },
  { label: "REST API Endpoints", path: "/api-reference", group: "API" },
  { label: "Error Code Reference", path: "/api-reference", group: "API" },
  { label: "Billing & Plans", path: "/support", group: "Support" },
  { label: "Infrastructure Status", path: "/support", group: "Support" },
  { label: "Contact Engineering", path: "/contact", group: "Support" },
];

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full max-w-md rounded-lg border bg-card px-3 py-2.5 text-sm text-muted-foreground hover:border-primary/30 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search documentation...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search docs, guides, API references..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {["Guides", "API", "Support"].map((group) => (
            <CommandGroup key={group} heading={group}>
              {searchItems
                .filter((i) => i.group === group)
                .map((item) => (
                  <CommandItem
                    key={item.label}
                    onSelect={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
