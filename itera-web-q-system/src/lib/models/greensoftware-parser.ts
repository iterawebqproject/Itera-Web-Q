export interface GreenSoftwareIssue {
  category: string;
  metricId: string;
  auditId?: string;
  title: string;
  description: string;
  score?: number | null;
  status: "Passed" | "Failed" | "Warning";
  displayValue?: string | number;
  recommendation: string;
}

export interface GreenSoftwareMetrics {
  summary: {
    totalChecks: number;
    failed: number;
    warnings: number;
    passed: number;
  };
  pageInfo: {
    url: string;
    scannedAt: string;
  };
  issues: GreenSoftwareIssue[];

  details: {
    domSize?: number;
    mainThreadTime?: number;
    networkRequests?: number;
    totalTransferSize?: number;
    imageFormats?: Record<string, number>;
  };
}

interface NetworkRequestItem {
  mimeType?: string;
  resourceType?: string;
  transferSize?: number;
  [key: string]: unknown;
}

interface LighthouseAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  numericValue?: number;
  details?: {
    items?: Array<Record<string, unknown>>;
    [key: string]: unknown;
  };
}

interface LighthouseResult {
  audits?: Record<string, LighthouseAudit>;
  requestedUrl?: string;
  finalUrl?: string;
  [key: string]: unknown;
}

export function parseGreenSoftwareMetrics(
  lighthouseResult: LighthouseResult,
): GreenSoftwareMetrics {
  const issues: GreenSoftwareIssue[] = [];
  const audits = lighthouseResult.audits || {};


  const auditChecks = [
    {
      id: "network-dependency-tree",
      title: "Avoid Chaining Critical Requests",
      auditId: ["network-dependency-tree-insight"],
      recommendation:
        'Reduce critical request chains by minimizing render-blocking resources, deferring non-critical scripts and styles, marking JavaScript as async or defer, preloading key assets, and using <link rel="preconnect"> for important external origins when applicable.',
    },
    {
      id: "dom-size",
      title: "Avoid an Excessive DOM Size",
      auditId: ["dom-size-insight"],
      recommendation:
        "Reduce excessive DOM size by creating elements only when needed, removing unused nodes, deferring non-visible content until user interaction, and simplifying CSS selectors to improve rendering performance.",
    },
    {
      id: "third-parties",
      title: "Avoid Tracking Unnecessary Data",
      auditId: ["third-parties-insight"],
      recommendation:
        "Avoid unnecessary tracking and third-party scripts by removing non-essential analytics, reducing JavaScript execution time, minimizing total network payload size, and deferring or asynchronously loading third-party resources to improve performance.",
    },
    {
      id: "unminified-javascript",
      title: "Minify Web Assets (JavaScript & CSS)",
      auditId: ["unminified-javascript", "unminified-css"],
      recommendation:
        "Minify JavaScript and CSS assets by removing comments, whitespace, and unused code to reduce file size, decrease network transfer time, and improve parsing and execution performance.",
    },
    {
      id: "mainthread-work",
      title: "Minimize Main Thread Work",
      auditId: ["mainthread-work-breakdown"],
      recommendation:
        "Reduce JavaScript execution and parsing time, eliminate unused code, implement code splitting, defer non-critical resources, simplify layout calculations, and avoid layout thrashing to minimize main thread workload.",
    },
    {
      id: "image-responsive",
      title: "Optimize Image Size",
      auditId: ["image-size-responsive"],
      recommendation:
        "Serve properly sized images by using responsive images with srcset and sizes attributes, avoid delivering images larger than their rendered dimensions, and use vector formats such as SVG where appropriate to reduce unnecessary data transfer.",
    },
    {
      id: "unused-css",
      title: "Remove Unused CSS Definitions",
      auditId: ["unused-css-rules"],
      recommendation:
        'Eliminate unused CSS rules, inline critical above-the-fold CSS in the document head, and preload non-critical styles using <link rel="preload"> to load them asynchronously and reduce render-blocking.',
    },
    {
      id: "server-response",
      title: "Use Server-Side Rendering for High-Traffic Pages",
      auditId: ["server-response-time"],
      recommendation:
        "Serve the static site through a CDN with edge caching enabled to reduce network latency and minimize Time to First Byte (TTFB).",
    },
  ];

  const failingCheckIds = new Set<string>();

  auditChecks.forEach((check) => {
    check.auditId.forEach((auditKey) => {
      const audit = audits[auditKey];
      if (!audit) return;

      const passed = audit.score !== null && audit.score >= 0.9;
      const status =
        audit.score === null
          ? "Passed"
          : audit.score < 0.5
            ? "Failed"
            : audit.score < 0.9
              ? "Warning"
              : "Passed";

      if (!passed) {
        failingCheckIds.add(check.id);
        issues.push({
          category: "Direct Audit",
          metricId: check.id,
          auditId: check.auditId.join(","),
          title: check.title,
          status: status,
          description: audit.description || audit.title,
          recommendation:
            check.recommendation ||
            "Refer to Lighthouse audit details for recommendations.",
          displayValue:
            audit.displayValue || audit.numericValue?.toString() || "N/A",
        });
      }
    });
  });


  const networkAudit = audits["network-requests"];
  if (networkAudit?.details?.items) {
    const requests = networkAudit.details.items as Array<{
      url?: string;
      resourceType?: string;
      priority?: string;
      transferSize?: number;
      resourceSize?: number;
      mimeType?: string;
    }>;

    const imageRequests = requests.filter(
      (r) => r.resourceType === "image" || r.mimeType?.startsWith("image/"),
    );
    const immediateImages = imageRequests.filter(
      (r) => r.priority === "High" || r.priority === "VeryHigh",
    );

    if (
      imageRequests.length > 0 &&
      immediateImages.length === imageRequests.length
    ) {
      failingCheckIds.add("network-priority");
      issues.push({
        category: "Calculate Metric",
        metricId: "network-priority",
        title: "Defer Offscreen Images",
        status: "Failed",
        description:
          "All images are loaded with high network priority during initial load, increasing unnecessary network activity and energy consumption.",
        recommendation: `Use on-demand loading for images that are not visible during initial page load by applying loading="lazy" to offscreen images and ensuring only above-the-fold images load immediately.`,
        displayValue: "100% High Priority",
      });
    }

    const gifRequests = requests.filter(
      (r) => r.mimeType?.includes("gif") || r.url?.endsWith(".gif"),
    );
    if (gifRequests.length > 0) {
      failingCheckIds.add("network-gif-format");
      issues.push({
        category: "Calculate Metric",
        metricId: "network-gif-format",
        title: "Deprecate GIFs for Animated Content",
        status: "Failed",
        description: `Found ${gifRequests.length} GIF file(s). GIFs are less efficient than modern formats and increase bandwidth and energy usage.`,
        recommendation:
          "Replace GIFs with more efficient formats such as MP4 or WebM video. Where appropriate, consider CSS or SVG animations as lower-energy alternatives to reduce bandwidth usage and energy consumption.",
        displayValue: `${gifRequests.length} GIFs`,
      });
    }

    const uncompressedText = requests.filter((r) => {
      const isText =
        ["Document", "Script", "Stylesheet", "Fetch", "XHR"].includes(
          r.resourceType || "",
        ) || r.mimeType?.match(/(text|json|javascript|css)/);
      return (
        isText &&
        r.resourceSize &&
        r.transferSize &&
        r.transferSize >= r.resourceSize &&
        r.resourceSize > 1024
      );
    });

    if (uncompressedText.length > 0) {
      failingCheckIds.add("text-compression");
      issues.push({
        category: "Calculate Metric",
        metricId: "text-compression",
        title: "Enable Text Compression",
        status: "Warning",
        description: `Found ${uncompressedText.length} text-based resource(s) served without compression. Uncompressed text files increase bandwidth usage and energy consumption.`,
        recommendation:
          "Enable Brotli and Gzip compression on the server for HTML, CSS, JavaScript, and JSON resources to reduce transfer size, bandwidth usage, and energy consumption..",
        displayValue: `${uncompressedText.length} files`,
      });
    }

    if (requests.length > 74) {
      failingCheckIds.add("network-requests-count");
      const isCritical = requests.length > 100;
      issues.push({
        category: "Calculate Metric",
        metricId: "network-requests-count",
        title: "Keep Request Counts Low",
        status: isCritical ? "Failed" : "Warning",
        description: `The page makes ${requests.length} network requests. High request counts increase network overhead, latency, and energy consumption.`,
        recommendation: isCritical
          ? "Significantly reduce network requests by bundling assets, eliminating unused or redundant resources, minimizing third-party scripts, and avoiding unnecessary runtime fetches."
          : "Reduce the number of network requests by consolidating assets, removing unnecessary resources, and minimizing JavaScript-driven fetch calls.",
        displayValue: `${requests.length} items`,
      });
    }

    const legacyImages = imageRequests.filter(
      (r) =>
        r.mimeType?.includes("jpeg") ||
        r.mimeType?.includes("png") ||
        r.url?.match(/\.jpe?g$/i) ||
        r.url?.endsWith(".png"),
    );

    if (legacyImages.length > 0) {
      failingCheckIds.add("image-format-optimization");
      issues.push({
        category: "Calculate Metric",
        metricId: "image-format-optimization",
        title: "Serve Images in Modern Formats",
        status: "Warning",
        description: `Detected ${legacyImages.length} images in legacy formats (JPEG/PNG). Modern image formats such as WebP or AVIF provide better compression ratios, reducing bandwidth, storage, and computing requirements on user devices.`,
        recommendation:
          "Evaluate modern image formats such as WebP or AVIF and serve images in the format that provides the best compression ratio, visual quality, and device support to reduce bandwidth and energy consumption.",
        displayValue: `${legacyImages.length} legacy images`,
      });
    }
  }

  const totalPossibleChecks = 13;
  const totalFailed = failingCheckIds.size;
  const totalPassed = totalPossibleChecks - totalFailed;

  const summary = {
    totalChecks: totalPossibleChecks,
    failed: issues.filter((i) => i.status === "Failed").length,
    warnings: issues.filter((i) => i.status === "Warning").length,
    passed: totalPassed,
  };

  const networkItems =
    (audits["network-requests"]?.details?.items as Array<NetworkRequestItem>) ||
    [];
  const imageFormats: Record<string, number> = networkItems.reduce(
    (acc: Record<string, number>, r: NetworkRequestItem) => {
      const mt =
        (r.mimeType || "").split("/")[1] || r.resourceType || "unknown";
      acc[mt] = (acc[mt] || 0) + 1;
      return acc;
    },
    {},
  );

  const details = {
    domSize: audits["dom-size"]?.numericValue,
    mainThreadTime: audits["mainthread-work-breakdown"]?.numericValue,
    networkRequests: networkItems.length,
    totalTransferSize: networkItems.reduce(
      (s: number, r: NetworkRequestItem) => s + (r.transferSize || 0),
      0,
    ),
    imageFormats,
  };

  return {
    summary,
    pageInfo: {
      url: lighthouseResult.requestedUrl || lighthouseResult.finalUrl || "",
      scannedAt: new Date().toISOString(),
    },
    issues,
    details,
  };
}
