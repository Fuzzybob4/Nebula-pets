"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Activity, 
  Zap, 
  Globe, 
  Download,
  RefreshCw,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { costTracker, CostSummary, ApiCall } from "@/lib/cost-tracker";

// Demo data to show what tracking looks like
const demoCalls: ApiCall[] = [
  {
    id: "call_1",
    timestamp: Date.now() - 3600000,
    service: "brave",
    endpoint: "search",
    costUsd: 0.003,
    metadata: { query: "Lonestar Pet Supply wholesale" },
  },
  {
    id: "call_2",
    timestamp: Date.now() - 3500000,
    service: "brave",
    endpoint: "search",
    costUsd: 0.003,
    metadata: { query: "Texas aquarium suppliers" },
  },
  {
    id: "call_3",
    timestamp: Date.now() - 3400000,
    service: "brave",
    endpoint: "fetch",
    costUsd: 0.003,
    metadata: { url: "aquariumsupplydistribution.com" },
  },
  {
    id: "call_4",
    timestamp: Date.now() - 3300000,
    service: "openai",
    endpoint: "chat/completions",
    tokensInput: 2450,
    tokensOutput: 1850,
    costUsd: 0.02495,
    metadata: { model: "gpt-4o" },
  },
  {
    id: "call_5",
    timestamp: Date.now() - 100000,
    service: "openai",
    endpoint: "chat/completions",
    tokensInput: 1200,
    tokensOutput: 950,
    costUsd: 0.01245,
    metadata: { model: "gpt-4o" },
  },
];

export default function CostDashboardPage() {
  const [summary, setSummary] = useState<CostSummary | null>(null);
  const [calls, setCalls] = useState<ApiCall[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load demo data
    demoCalls.forEach((call) => costTracker.logCall(call));
    updateData();
  }, []);

  const updateData = () => {
    setSummary(costTracker.getSummary());
    setCalls(costTracker.getCalls());
  };

  const handleExport = () => {
    const json = costTracker.exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nebula-pets-costs-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    if (confirm("Clear all cost tracking data?")) {
      costTracker.clear();
      updateData();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-purple-400" />
            <Badge variant="outline" className="border-purple-400/30 text-purple-400">
              Developer Dashboard
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">API Cost Tracker</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of API usage and token consumption during Nebula Pets development.
          </p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <Card className="glass-card border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">
                    ${summary.totalCostUsd.toFixed(4)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all services
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Total Calls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {summary.totalCalls}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    API requests made
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Tokens In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {summary.totalTokensInput.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Input tokens
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Tokens Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {summary.totalTokensOutput.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Output tokens
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* By Service Breakdown */}
        {summary && Object.keys(summary.byService).length > 0 && (
          <Card className="glass-card border-0 mb-8">
            <CardHeader>
              <CardTitle>Cost by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(summary.byService).map(([service, data]) => (
                  <div key={service} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={`
                          ${service === 'openai' ? 'bg-green-500/20 text-green-400' : ''}
                          ${service === 'anthropic' ? 'bg-orange-500/20 text-orange-400' : ''}
                          ${service === 'brave' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${service === 'google' ? 'bg-red-500/20 text-red-400' : ''}
                        `}
                      >
                        {service.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {data.calls} calls
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${data.costUsd.toFixed(4)}</div>
                      {(data.tokensInput > 0 || data.tokensOutput > 0) && (
                        <div className="text-xs text-muted-foreground">
                          {data.tokensInput.toLocaleString()} / {data.tokensOutput.toLocaleString()} tokens
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Calls */}
        <Card className="glass-card border-0 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent API Calls</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={updateData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {calls.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No API calls recorded yet.
                </p>
              ) : (
                calls.slice().reverse().map((call) => (
                  <div 
                    key={call.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {call.service}
                      </Badge>
                      <span className="text-muted-foreground">{call.endpoint}</span>
                      {call.metadata?.model ? (
                        <span className="text-xs text-blue-400">{String(call.metadata.model)}</span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-4">
                      {(call.tokensInput || call.tokensOutput) && (
                        <span className="text-xs text-muted-foreground">
                          {call.tokensInput?.toLocaleString()} → {call.tokensOutput?.toLocaleString()}
                        </span>
                      )}
                      <span className="font-mono text-green-400">
                        ${call.costUsd.toFixed(6)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(call.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="destructive" onClick={handleClear} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear Data
          </Button>
        </div>

        {/* Pricing Reference */}
        <Separator className="my-8 bg-white/10" />
        
        <div className="text-sm text-muted-foreground">
          <h3 className="font-semibold text-white mb-2">Pricing Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-white">OpenAI GPT-4o</p>
              <p>$2.50 / 1M input tokens | $10.00 / 1M output tokens</p>
            </div>
            <div>
              <p className="font-medium text-white">OpenAI GPT-4o-mini</p>
              <p>$0.15 / 1M input tokens | $0.60 / 1M output tokens</p>
            </div>
            <div>
              <p className="font-medium text-white">Brave Search API</p>
              <p>$0.003 per search</p>
            </div>
            <div>
              <p className="font-medium text-white">Web Fetch</p>
              <p>$0.003 per fetch (estimated)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
