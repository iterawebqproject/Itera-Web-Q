export interface Pa11yIssue {
  code: string;
  type: 'error' | 'warning';
  message: string;
  context: string;
  selector: string;
  runner: string;
}

interface Pa11yRawResult {
  documentTitle?: string;
  pageUrl?: string;
  issues: Pa11yIssue[];
}

export interface Pa11yMetrics {
  summary: {
    errors: number;
    warnings: number;
    totalIssues: number;
  };
  pageInfo: {
    url: string;
    documentTitle?: string;
    scannedAt: string;
  };
  errorIssues: Pa11yIssue[];
  warningIssues: Pa11yIssue[];
}

export function parsePa11yReport(rawResult: Pa11yRawResult): Pa11yMetrics {
  const issues = rawResult.issues || [];

  const errorIssues = issues.filter((issue) => issue.type === 'error');
  const warningIssues = issues.filter((issue) => issue.type === 'warning');

  return {
    summary: {
      errors: errorIssues.length,
      warnings: warningIssues.length,
      totalIssues: errorIssues.length + warningIssues.length,
    },
    pageInfo: {
      url: rawResult.pageUrl || '',
      documentTitle: rawResult.documentTitle,
      scannedAt: new Date().toISOString(),
    },
    errorIssues,
    warningIssues,
  };
}
