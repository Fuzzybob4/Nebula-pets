// Cost Tracker for Nebula Pets - API Usage & Token Monitoring
// Tracks all external API calls and AI token usage for transparency

export interface ApiCall {
  id: string;
  timestamp: number;
  service: 'openai' | 'anthropic' | 'google' | 'brave' | 'other';
  endpoint: string;
  tokensInput?: number;
  tokensOutput?: number;
  costUsd: number;
  metadata?: Record<string, unknown>;
}

export interface CostSummary {
  totalCalls: number;
  totalCostUsd: number;
  totalTokensInput: number;
  totalTokensOutput: number;
  byService: Record<string, {
    calls: number;
    costUsd: number;
    tokensInput: number;
    tokensOutput: number;
  }>;
  dailyBreakdown: Record<string, number>;
}

// Pricing models (per 1M tokens or per call)
const PRICING = {
  openai: {
    gpt4o: { input: 2.50, output: 10.00 }, // per 1M tokens
    gpt4oMini: { input: 0.15, output: 0.60 },
  },
  anthropic: {
    claude35Sonnet: { input: 3.00, output: 15.00 },
    claude3Haiku: { input: 0.25, output: 1.25 },
  },
  google: {
    gemini15Pro: { input: 3.50, output: 10.50 },
    gemini15Flash: { input: 0.35, output: 1.05 },
  },
  brave: {
    search: 0.003, // per search
  },
};

class CostTracker {
  private calls: ApiCall[] = [];
  private static instance: CostTracker;

  private constructor() {}

  static getInstance(): CostTracker {
    if (!CostTracker.instance) {
      CostTracker.instance = new CostTracker();
    }
    return CostTracker.instance;
  }

  logCall(call: Omit<ApiCall, 'id' | 'timestamp'>): ApiCall {
    const newCall: ApiCall = {
      ...call,
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    this.calls.push(newCall);
    
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log(`[CostTracker] ${call.service} - $${call.costUsd.toFixed(6)}`);
    }
    
    return newCall;
  }

  logOpenAICall(model: string, tokensInput: number, tokensOutput: number, endpoint: string): ApiCall {
    let costPer1MInput = 2.50;
    let costPer1MOutput = 10.00;
    
    if (model.includes('mini')) {
      costPer1MInput = 0.15;
      costPer1MOutput = 0.60;
    }
    
    const inputCost = (tokensInput / 1000000) * costPer1MInput;
    const outputCost = (tokensOutput / 1000000) * costPer1MOutput;
    
    return this.logCall({
      service: 'openai',
      endpoint,
      tokensInput,
      tokensOutput,
      costUsd: inputCost + outputCost,
      metadata: { model },
    });
  }

  logBraveSearch(query: string): ApiCall {
    return this.logCall({
      service: 'brave',
      endpoint: 'search',
      costUsd: 0.003,
      metadata: { query: query.substring(0, 50) },
    });
  }

  getSummary(): CostSummary {
    const byService: CostSummary['byService'] = {};
    const dailyBreakdown: Record<string, number> = {};
    
    let totalTokensInput = 0;
    let totalTokensOutput = 0;
    let totalCostUsd = 0;

    for (const call of this.calls) {
      // By service
      if (!byService[call.service]) {
        byService[call.service] = { calls: 0, costUsd: 0, tokensInput: 0, tokensOutput: 0 };
      }
      byService[call.service].calls++;
      byService[call.service].costUsd += call.costUsd;
      byService[call.service].tokensInput += call.tokensInput || 0;
      byService[call.service].tokensOutput += call.tokensOutput || 0;
      
      // Daily breakdown
      const day = new Date(call.timestamp).toISOString().split('T')[0];
      dailyBreakdown[day] = (dailyBreakdown[day] || 0) + call.costUsd;
      
      // Totals
      totalTokensInput += call.tokensInput || 0;
      totalTokensOutput += call.tokensOutput || 0;
      totalCostUsd += call.costUsd;
    }

    return {
      totalCalls: this.calls.length,
      totalCostUsd,
      totalTokensInput,
      totalTokensOutput,
      byService,
      dailyBreakdown,
    };
  }

  getCalls(): ApiCall[] {
    return [...this.calls];
  }

  clear(): void {
    this.calls = [];
  }

  exportToJSON(): string {
    return JSON.stringify({
      summary: this.getSummary(),
      calls: this.calls,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  }
}

export const costTracker = CostTracker.getInstance();
export default costTracker;
