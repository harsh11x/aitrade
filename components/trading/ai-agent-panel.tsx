"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  Settings,
  Activity,
  Brain,
  Shield,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  BarChart3,
  Gauge,
  Eye,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  type AIAgentConfig,
  type AgentState,
  type MarketAnalysis,
  type TradeSignal,
  DEFAULT_AGENT_CONFIG,
  STRATEGIES,
  generateMarketAnalysis,
  generateTradeSignal,
  formatCurrency,
} from "@/lib/ai-trading-agent"

import { useTrading } from "@/lib/context/TradingContext"

export function AIAgentPanel() {
  const { currentPrice, openPosition, setMarketTrend } = useTrading()
  const [config, setConfig] = useState<AIAgentConfig>(DEFAULT_AGENT_CONFIG)
  const [agentState, setAgentState] = useState<AgentState>({
    isRunning: false,
    mode: "hybrid",
    currentAnalysis: null,
    activeSignals: [],
    recentDecisions: [],
    performance: {
      totalTrades: 1247,
      winRate: 88.4,
      profitFactor: 4.85,
      sharpeRatio: 3.2,
      maxDrawdown: 2.1,
      averageRR: 3.5,
      expectancy: 0.82,
      todayPnL: 5240.32,
      weekPnL: 28621.45,
      monthPnL: 142432.12,
    },
    safetyStatus: {
      dailyLossUsed: 0.8,
      drawdownCurrent: 2.1,
      isTrading: true,
      pauseReason: null,
      volatilityLevel: "normal",
      marketRegime: "trending",
    },
  })

  const [currentSignal, setCurrentSignal] = useState<TradeSignal | null>(null)
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)

  // Simulate real-time analysis updates
  useEffect(() => {
    if (!agentState.isRunning) return

    const interval = setInterval(() => {
      const newAnalysis = generateMarketAnalysis("BTC/USDT", currentPrice)
      setAnalysis(newAnalysis)
      setAgentState((prev) => ({ ...prev, currentAnalysis: newAnalysis }))

      // Generate signal if conditions are met
      if (Math.random() > 0.6) {
        const signal = generateTradeSignal(newAnalysis)
        if (signal) {
          setCurrentSignal(signal)
          setAgentState((prev) => ({
            ...prev,
            activeSignals: [signal, ...prev.activeSignals.slice(0, 4)],
          }))

          // Autonomous Execution
          if (config.mode === 'autonomous') {
            // Calculate leverage (default 20x for AI)
            const leverage = 20
            // Calculate margin amount (e.g. 5% of 100k = 5k)
            const margin = 1000 // Fixed 1k margin for safety in demo

            // Execute Trade
            const sideEnum = signal.side === 'long' ? 'LONG' : 'SHORT'
            openPosition(signal.symbol, sideEnum, margin, leverage, signal.stopLoss, signal.takeProfit[1])

            // Manipulate Market (The "Better Algorithm")
            setMarketTrend(signal.side === 'long' ? 'bullish' : 'bearish')

            // Reset Trend after a while to avoid infinite pump/dump? 
            // Or keep it until next signal? Let's keep it until next signal or manual intervention.
          }
        }
      }
    }, 3000) // Faster updates

    return () => clearInterval(interval)
  }, [agentState.isRunning, config.mode, currentPrice]) // metrics updated

  const toggleAgent = () => {
    setAgentState((prev) => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const updateConfig = (key: keyof AIAgentConfig, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Trading Agent</h3>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${agentState.isRunning ? "bg-[hsl(145,70%,50%)] animate-pulse" : "bg-muted-foreground"
                    }`}
                />
                <span className="text-xs text-muted-foreground">{agentState.isRunning ? "Active" : "Paused"}</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant={agentState.isRunning ? "destructive" : "default"}
            onClick={toggleAgent}
            className="h-8"
          >
            {agentState.isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-1" /> Stop
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1" /> Start
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Mode:</span>
        {(["autonomous", "hybrid", "manual"] as const).map((mode) => (
          <Button
            key={mode}
            size="sm"
            variant={config.mode === mode ? "secondary" : "ghost"}
            className="h-6 text-xs capitalize"
            onClick={() => updateConfig("mode", mode)}
          >
            {mode}
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="status" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-3 mt-2 grid grid-cols-4 h-8">
          <TabsTrigger value="status" className="text-xs">
            <Activity className="w-3 h-3 mr-1" /> Status
          </TabsTrigger>
          <TabsTrigger value="signals" className="text-xs">
            <Target className="w-3 h-3 mr-1" /> Signals
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs">
            <Eye className="w-3 h-3 mr-1" /> Analysis
          </TabsTrigger>
          <TabsTrigger value="config" className="text-xs">
            <Settings className="w-3 h-3 mr-1" /> Config
          </TabsTrigger>
        </TabsList>

        {/* Status Tab */}
        <TabsContent value="status" className="flex-1 overflow-y-auto p-3 space-y-3 mt-0">
          {/* Safety Status */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Safety Status</span>
              </div>
              <Badge variant={agentState.safetyStatus.isTrading ? "default" : "destructive"} className="text-xs">
                {agentState.safetyStatus.isTrading ? "Trading Active" : "Paused"}
              </Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Daily Loss Used</span>
                <span>
                  {agentState.safetyStatus.dailyLossUsed}% / {config.maxDailyLoss}%
                </span>
              </div>
              <Progress value={(agentState.safetyStatus.dailyLossUsed / config.maxDailyLoss) * 100} className="h-1.5" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Current Drawdown</span>
                <span>
                  {agentState.safetyStatus.drawdownCurrent}% / {config.maxDrawdown}%
                </span>
              </div>
              <Progress
                value={(agentState.safetyStatus.drawdownCurrent / config.maxDrawdown) * 100}
                className="h-1.5"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-muted-foreground">Volatility</span>
              <Badge
                variant="outline"
                className={`text-xs ${agentState.safetyStatus.volatilityLevel === "extreme"
                  ? "border-destructive text-destructive"
                  : agentState.safetyStatus.volatilityLevel === "high"
                    ? "border-yellow-500 text-yellow-500"
                    : ""
                  }`}
              >
                {agentState.safetyStatus.volatilityLevel}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Market Regime</span>
              <Badge variant="outline" className="text-xs capitalize">
                {agentState.safetyStatus.marketRegime}
              </Badge>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Performance</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-background/50 rounded p-2">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="text-lg font-bold text-[hsl(145,70%,50%)]">{agentState.performance.winRate}%</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="text-xs text-muted-foreground">Profit Factor</div>
                <div className="text-lg font-bold">{agentState.performance.profitFactor}</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                <div className="text-lg font-bold">{agentState.performance.sharpeRatio}</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="text-xs text-muted-foreground">Avg R:R</div>
                <div className="text-lg font-bold">{agentState.performance.averageRR}</div>
              </div>
            </div>

            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Today P&L</span>
                <span className="text-[hsl(145,70%,50%)]">+{formatCurrency(agentState.performance.todayPnL)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Week P&L</span>
                <span className="text-[hsl(145,70%,50%)]">+{formatCurrency(agentState.performance.weekPnL)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Month P&L</span>
                <span className="text-[hsl(145,70%,50%)]">+{formatCurrency(agentState.performance.monthPnL)}</span>
              </div>
            </div>
          </div>

          {/* Active Features */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Active Features</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {config.autoStopLoss && (
                <Badge variant="secondary" className="text-xs">
                  Auto SL
                </Badge>
              )}
              {config.autoTakeProfit && (
                <Badge variant="secondary" className="text-xs">
                  Auto TP
                </Badge>
              )}
              {config.trailingStop && (
                <Badge variant="secondary" className="text-xs">
                  Trailing Stop
                </Badge>
              )}
              {config.breakeven && (
                <Badge variant="secondary" className="text-xs">
                  Breakeven
                </Badge>
              )}
              {config.partialProfitTaking && (
                <Badge variant="secondary" className="text-xs">
                  Partial Profits
                </Badge>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Signals Tab */}
        <TabsContent value="signals" className="flex-1 overflow-y-auto p-3 space-y-2 mt-0">
          {currentSignal ? (
            <div className="bg-secondary/50 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentSignal.side === "long" ? (
                    <TrendingUp className="w-4 h-4 text-[hsl(145,70%,50%)]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className="font-semibold text-sm">{currentSignal.symbol}</span>
                  <Badge
                    variant={currentSignal.side === "long" ? "default" : "destructive"}
                    className="text-xs uppercase"
                  >
                    {currentSignal.side}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">{currentSignal.confidence}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Entry:</span>
                  <span className="ml-1 font-medium">${currentSignal.entry.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Stop Loss:</span>
                  <span className="ml-1 font-medium text-destructive">${currentSignal.stopLoss.toFixed(2)}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Take Profits:</span>
                  <span className="ml-1 font-medium text-[hsl(145,70%,50%)]">
                    {currentSignal.takeProfit.map((tp) => `$${tp.toFixed(0)}`).join(" → ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border">
                <div className="text-xs">
                  <span className="text-muted-foreground">R:R</span>
                  <span className="ml-1 font-medium">{currentSignal.riskReward.toFixed(2)}</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Size</span>
                  <span className="ml-1 font-medium">{currentSignal.positionSize}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Reasoning:</span>
                {currentSignal.reasoning.map((reason, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-[hsl(145,70%,50%)] mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {config.mode !== "autonomous" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 h-8"
                    onClick={() => {
                      if (currentSignal) {
                        const leverage = 20
                        const margin = 1000
                        const sideEnum = currentSignal.side === 'long' ? 'LONG' : 'SHORT'
                        openPosition(currentSignal.symbol, sideEnum, margin, leverage, currentSignal.stopLoss, currentSignal.takeProfit[1])
                        setMarketTrend(currentSignal.side === 'long' ? 'bullish' : 'bearish')
                      }
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Execute
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-8 bg-transparent">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Skip
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Target className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No active signals</p>
              <p className="text-xs text-muted-foreground mt-1">
                {agentState.isRunning ? "Scanning for opportunities..." : "Start the agent to scan markets"}
              </p>
            </div>
          )}

          {/* Recent Signals */}
          {agentState.activeSignals.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Recent Signals</h4>
              {agentState.activeSignals.slice(0, 5).map((signal) => (
                <div key={signal.id} className="bg-secondary/30 rounded p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {signal.side === "long" ? (
                      <TrendingUp className="w-3.5 h-3.5 text-[hsl(145,70%,50%)]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                    )}
                    <span className="text-xs font-medium">{signal.symbol}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {signal.confidence}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="flex-1 overflow-y-auto p-3 space-y-3 mt-0">
          {analysis ? (
            <>
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{analysis.symbol}</span>
                  <div className="flex items-center gap-1">
                    <RefreshCw className={`w-3.5 h-3.5 ${agentState.isRunning ? "animate-spin" : ""}`} />
                    <span className="text-xs text-muted-foreground">{analysis.timeframe}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      analysis.trend === "bullish"
                        ? "default"
                        : analysis.trend === "bearish"
                          ? "destructive"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {analysis.trend}
                  </Badge>
                  <Progress value={analysis.strength} className="flex-1 h-2" />
                  <span className="text-xs font-medium">{analysis.strength}%</span>
                </div>
              </div>

              {/* Key Levels */}
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Key Levels</h4>
                <div className="space-y-1">
                  {analysis.resistanceLevels.map((level, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-destructive">R{i + 1}</span>
                      <span>${level.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="h-px bg-border my-1" />
                  {analysis.supportLevels.map((level, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-[hsl(145,70%,50%)]">S{i + 1}</span>
                      <span>${level.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicators */}
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Indicators</h4>
                <div className="space-y-1.5">
                  {analysis.indicators.map((ind, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span>{ind.name}</span>
                      <div className="flex items-center gap-2">
                        <span>
                          {typeof ind.value === "number" && ind.value > 1000
                            ? `$${ind.value.toFixed(0)}`
                            : ind.value.toFixed(2)}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${ind.signal === "buy"
                            ? "text-[hsl(145,70%,50%)] border-[hsl(145,70%,50%)]"
                            : ind.signal === "sell"
                              ? "text-destructive border-destructive"
                              : ""
                            }`}
                        >
                          {ind.signal}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentiment */}
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Market Sentiment</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>News</span>
                    <span className={analysis.sentiment.news > 0 ? "text-[hsl(145,70%,50%)]" : "text-destructive"}>
                      {analysis.sentiment.news > 0 ? "+" : ""}
                      {analysis.sentiment.news}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Social</span>
                    <span className={analysis.sentiment.social > 0 ? "text-[hsl(145,70%,50%)]" : "text-destructive"}>
                      {analysis.sentiment.social > 0 ? "+" : ""}
                      {analysis.sentiment.social}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>On-Chain</span>
                    <span className={analysis.sentiment.onChain > 0 ? "text-[hsl(145,70%,50%)]" : "text-destructive"}>
                      {analysis.sentiment.onChain > 0 ? "+" : ""}
                      {analysis.sentiment.onChain}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Eye className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No analysis available</p>
              <p className="text-xs text-muted-foreground mt-1">Start the agent to begin analysis</p>
            </div>
          )}
        </TabsContent>

        {/* Config Tab */}
        <TabsContent value="config" className="flex-1 overflow-y-auto p-3 space-y-3 mt-0">
          {/* Risk Settings */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-3">
            <h4 className="text-sm font-medium">Risk Management</h4>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Max Daily Loss</span>
                <span>{config.maxDailyLoss}%</span>
              </div>
              <Slider
                value={[config.maxDailyLoss]}
                onValueChange={([v]) => updateConfig("maxDailyLoss", v)}
                max={10}
                min={1}
                step={0.5}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Max Drawdown</span>
                <span>{config.maxDrawdown}%</span>
              </div>
              <Slider
                value={[config.maxDrawdown]}
                onValueChange={([v]) => updateConfig("maxDrawdown", v)}
                max={25}
                min={5}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Max Position Size</span>
                <span>{config.maxPositionSize}%</span>
              </div>
              <Slider
                value={[config.maxPositionSize]}
                onValueChange={([v]) => updateConfig("maxPositionSize", v)}
                max={20}
                min={1}
                step={0.5}
              />
            </div>
          </div>

          {/* Trade Features */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-3">
            <h4 className="text-sm font-medium">Trade Features</h4>

            <div className="space-y-2">
              {[
                { key: "autoStopLoss", label: "Auto Stop-Loss" },
                { key: "autoTakeProfit", label: "Auto Take-Profit" },
                { key: "trailingStop", label: "Trailing Stop" },
                { key: "breakeven", label: "Auto Breakeven" },
                { key: "partialProfitTaking", label: "Partial Profits" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs">{label}</span>
                  <Switch
                    checked={config[key as keyof AIAgentConfig] as boolean}
                    onCheckedChange={(v) => updateConfig(key as keyof AIAgentConfig, v)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Strategies */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
            <h4 className="text-sm font-medium">Enabled Strategies</h4>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(STRATEGIES).map((strategy) => (
                <Badge
                  key={strategy}
                  variant={config.enabledStrategies.includes(strategy) ? "default" : "outline"}
                  className="text-xs cursor-pointer capitalize"
                  onClick={() => {
                    const newStrategies = config.enabledStrategies.includes(strategy)
                      ? config.enabledStrategies.filter((s) => s !== strategy)
                      : [...config.enabledStrategies, strategy]
                    updateConfig("enabledStrategies", newStrategies)
                  }}
                >
                  {strategy.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
