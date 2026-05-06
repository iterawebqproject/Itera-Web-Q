export interface HeuristicIssue {
  checklistId: string;
  checklistItem: string;
  heuristic: string;
  severity: 'essential' | 'pragmatic' | 'hedonic';
  recommendation: string;
  affectedSelectors?: string;
  fileName?: string;
}

interface HeuristicRawResult {
  documentTitle?: string;
  issues: HeuristicIssue[];
}

export interface HeuristicMetrics {
  summary: {
    essential: number;
    pragmatic: number;
    hedonic: number;
    totalIssues: number;
  };
  pageInfo: {
    documentTitle?: string;
    scannedAt: string;
  };
  essentialIssues: HeuristicIssue[];
  pragmaticIssues: HeuristicIssue[];
  hedonicIssues: HeuristicIssue[];
}


export function parseHeuristicReport(rawResult: HeuristicRawResult): HeuristicMetrics {
  const issues = rawResult.issues || [];
  const essentialIssues = issues.filter((issue) => issue.severity === 'essential');
  const pragmaticIssues = issues.filter((issue) => issue.severity === 'pragmatic');
  const hedonicIssues = issues.filter((issue) => issue.severity === 'hedonic');

  return {
    summary: {
      essential: essentialIssues.length,
      pragmatic: pragmaticIssues.length,
      hedonic: hedonicIssues.length,
      totalIssues: issues.length,
    },
    pageInfo: {
      documentTitle: rawResult.documentTitle,
      scannedAt: new Date().toISOString(),
    },
    essentialIssues,
    pragmaticIssues,
    hedonicIssues,
  };
}
