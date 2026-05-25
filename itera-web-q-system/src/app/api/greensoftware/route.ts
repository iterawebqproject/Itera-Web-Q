import { type NextRequest, NextResponse } from 'next/server';
import { parseGreenSoftwareMetrics } from '@/lib/models/greensoftware-parser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lighthouseResult = body?.lighthouseResult || body?.raw;

    if (!lighthouseResult) {
      return NextResponse.json(
        { error: 'Missing lighthouseResult in request body' },
        { status: 400 }
      );
    }

    const metrics = parseGreenSoftwareMetrics(lighthouseResult);

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error: unknown) {
    console.error('[GreenSoftware] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze green software metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
