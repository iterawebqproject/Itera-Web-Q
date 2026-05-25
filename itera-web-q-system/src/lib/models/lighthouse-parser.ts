interface LighthouseRawAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  details?: {
    type?: string;
    items?:
      | Array<{
          selector?: string;
          node?: {
            type?: string;
            selector?: string;
            snippet?: string;
            value?: string;
            nodeLabel?: string;
          };
          [key: string]: unknown;
        }>
      | Record<
          string,
          {
            label?: string;
            value?: unknown;
            [key: string]: unknown;
          }
        >;
    [key: string]: unknown;
  };
}

type LighthouseArrayDetailItem = {
  selector?: string;
  node?: {
    type?: string;
    selector?: string;
    snippet?: string;
    value?: string;
    nodeLabel?: string;
  };
  [key: string]: unknown;
};

type LighthouseChecklistDetailItem = {
  label?: string;
  value?: unknown;
  [key: string]: unknown;
};

type LighthouseNormalizedDetailItem = LighthouseArrayDetailItem & {
  key?: string;
  label?: string;
  value?: unknown;
};

interface LighthouseRawJSON {
  fetchTime?: string;
  requestedUrl?: string;
  finalUrl?: string;
  environment?: {
    benchmarkIndex?: number;
  };
  categories?: {
    performance?: {
      score: number;
      auditRefs?: Array<{ id: string; weight?: number }>;
    };
    accessibility?: {
      score: number;
      auditRefs?: Array<{ id: string; weight?: number }>;
    };
    "best-practices"?: {
      score: number;
      auditRefs?: Array<{ id: string; weight?: number }>;
    };
    seo?: {
      score: number;
      auditRefs?: Array<{ id: string; weight?: number }>;
    };
  };
  audits?: {
    [auditId: string]: LighthouseRawAudit;
  };
}

export interface FailedAudit {
  categoryType: string;
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  affectedElements: string[];
  detailsItems?: Array<Record<string, string>>;
}

export interface LighthouseMetrics {
  summaryScores?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };

  allPageScores?: Array<{
    performance: number;
    accessibility: number;
    seo: number;
    bestPractices: number;
  }>;
  pageInfo: {
    url: string;
    finalUrl?: string;
    scannedAt: string;
  };
  failedAudits: FailedAudit[];
  environment?: {
    benchmarkIndex?: number;
  };
}


function findAuditCategory(
  auditId: string,
  categories: LighthouseRawJSON["categories"],
): string {
  if (!categories) return "uncategorized";

  for (const [categoryKey, categoryData] of Object.entries(categories)) {
    if (categoryData?.auditRefs?.some((ref) => ref.id === auditId)) {
      return categoryKey === "best-practices" ? "bestPractices" : categoryKey;
    }
  }

  return "uncategorized";
}

function normalizeAuditDetailsItems(
  items?:
    | LighthouseArrayDetailItem[]
    | Record<string, LighthouseChecklistDetailItem>,
): LighthouseNormalizedDetailItem[] {
  if (!items) return [];
  if (Array.isArray(items)) return items;

  return Object.entries(items).map(([key, value]) => ({
    key,
    ...(typeof value === "object" && value !== null ? value : { value }),
  }));
}

function flattenNestedInsightItems(
  items: LighthouseNormalizedDetailItem[],
): LighthouseNormalizedDetailItem[] {
  const flattened: LighthouseNormalizedDetailItem[] = [];

  const visit = (item: LighthouseNormalizedDetailItem) => {
    const itemType = typeof item.type === "string" ? item.type : undefined;
    const nestedItems = item.items;

    if (
      Array.isArray(nestedItems) &&
      (itemType === "list" || itemType === "table")
    ) {
      nestedItems.forEach((nested) => {
        if (typeof nested === "object" && nested !== null) {
          visit(nested as LighthouseNormalizedDetailItem);
        }
      });
      return;
    }

    flattened.push(item);
  };

  items.forEach(visit);
  return flattened;
}

export function parseLighthouseReport(
  rawJson: LighthouseRawJSON,
): LighthouseMetrics {
  const categories = rawJson.categories || {};
  const audits = rawJson.audits || {};

  const summaryScores = {
    performance: (categories.performance?.score ?? 0) * 100,
    accessibility: (categories.accessibility?.score ?? 0) * 100,
    bestPractices: (categories["best-practices"]?.score ?? 0) * 100,
    seo: (categories.seo?.score ?? 0) * 100,
  };

  const pageInfo = {
    url: rawJson.requestedUrl || "",
    finalUrl: rawJson.finalUrl,
    scannedAt: rawJson.fetchTime || new Date().toISOString(),
  };

  const failedAudits: FailedAudit[] = [];

  Object.entries(audits).forEach(([auditId, audit]) => {
    if (audit.score !== null && audit.score < 1) {
      const affectedElements: string[] = [];
      const detailsItems: Array<Record<string, string>> = [];

      const normalizedItems = normalizeAuditDetailsItems(audit.details?.items);
      const flattenedItems = flattenNestedInsightItems(normalizedItems);

      if (flattenedItems.length > 0) {
        flattenedItems.forEach((item) => {
          if (item.node?.selector) {
            affectedElements.push(item.node.selector);
          } else if (item.selector) {
            affectedElements.push(item.selector);
          }

          const detailItem: Record<string, string> = {};

          Object.entries(item).forEach(([key, value]) => {
            if (key === "selector" || key === "node" || key === "type") {
              return;
            }
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              detailItem[key] = String(value);
            }
          });

          if (item.node?.value) {
            detailItem.nodeValue = item.node.value;
          }

          if (item.node?.selector) {
            detailItem.selector = item.node.selector;
          }

          if (item.node?.nodeLabel) {
            detailItem.nodeLabel = item.node.nodeLabel;
          }

          if (item.node?.snippet) {
            detailItem.snippet = item.node.snippet;
          }

          if (Object.keys(detailItem).length > 0) {
            detailsItems.push(detailItem);

            const hasSelector = Boolean(item.node?.selector || item.selector);
            if (!hasSelector) {
              const summary = Object.entries(detailItem)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
              if (summary) {
                affectedElements.push(summary);
              }
            }
          }
        });
      }

      const uniqueAffectedElements = Array.from(new Set(affectedElements));

      failedAudits.push({
        categoryType: findAuditCategory(auditId, categories),
        id: audit.id,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        displayValue: audit.displayValue,
        affectedElements: uniqueAffectedElements,
        detailsItems: detailsItems.length > 0 ? detailsItems : undefined,
      });
    }
  });

  return {
    summaryScores,
    pageInfo,
    failedAudits,
    environment: rawJson.environment,
  };
}
