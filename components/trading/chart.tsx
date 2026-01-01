"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  CandlestickChart,
  Plus,
  Minus,
  Maximize2,
  RotateCcw,
  Settings,
  Crosshair,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  LineSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type LineData,
  type HistogramData,
  type Time,
} from "lightweight-charts"

const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"]
const chartTypes = [
  { id: "candle", icon: CandlestickChart, label: "Candlestick" },
  { id: "line", icon: LineChart, label: "Line" },
  { id: "bar", icon: BarChart3, label: "Bar" },
]

function generateTradingViewData(count: number, endPrice?: number): { candles: CandlestickData<Time>[]; volumes: HistogramData<Time>[] } {
  const candles: CandlestickData<Time>[] = []
  const volumes: HistogramData<Time>[] = []

  const now = Math.floor(Date.now() / 1000)
  const interval = 3600 // 1 hour in seconds
  let basePrice = 42000 // Default base

  // Generate random walk
  for (let i = count - 1; i >= 0; i--) {
    const time = (now - i * interval) as Time
    const volatility = 0.005
    const change = (Math.random() - 0.5) * 2 * volatility * basePrice

    const open = basePrice
    const close = open + change
    const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5
    const volume = Math.random() * 1000 + 500

    candles.push({
      time,
      open,
      high,
      low,
      close,
    })

    volumes.push({
      time,
      value: volume,
      color: close >= open ? "rgba(34, 197, 94, 0.5)" : "rgba(239, 68, 68, 0.5)",
    })

    basePrice = close
  }

  // Adjust to match endPrice if provided
  if (endPrice && candles.length > 0) {
    const lastClose = candles[candles.length - 1].close
    const diff = endPrice - lastClose

    return {
      candles: candles.map(c => ({
        ...c,
        open: c.open + diff,
        high: c.high + diff,
        low: c.low + diff,
        close: c.close + diff
      })),
      volumes
    }
  }

  return { candles, volumes }
}

interface ChartProps {
  symbol?: string
}

import { useTrading } from "@/lib/context/TradingContext"

export function TradingChart({ symbol = "BTC/USDT" }: ChartProps) {
  const { positions } = useTrading()
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H")
  // ... (rest of state)

  const priceLinesRef = useRef<any[]>([])

  // ... (initChart logic remains)

  // Sync Positions to Chart Price Lines
  useEffect(() => {
    if (!isChartReady || !candleSeriesRef.current) return

    // Clear existing lines
    priceLinesRef.current.forEach(line => {
      candleSeriesRef.current?.removePriceLine(line)
    })
    priceLinesRef.current = []

    // Add new lines
    positions.forEach(pos => {
      const isLong = pos.side === 'LONG'
      const color = isLong ? '#22c55e' : '#ef4444' // green-500 : red-500

      const priceLine = candleSeriesRef.current?.createPriceLine({
        price: pos.entryPrice,
        color: color,
        lineWidth: 2,
        lineStyle: 2, // Dashed
        axisLabelVisible: true,
        title: `${pos.side} ${pos.size.toFixed(3)}`,
      })

      if (priceLine) {
        priceLinesRef.current.push(priceLine)
      }
    })

  }, [positions, isChartReady, selectedChartType]) // Re-run when positions change

  // ... (rest of the file)
  const [selectedChartType, setSelectedChartType] = useState("candle")
  const [currentPrice, setCurrentPrice] = useState(62543.21)
  const [priceChange, setPriceChange] = useState(1234.56)
  const [isChartReady, setIsChartReady] = useState(false)

  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null)
  const dataRef = useRef<{ candles: CandlestickData<Time>[]; volumes: HistogramData<Time>[] } | null>(null)

  const initChart = useCallback(() => {
    if (!chartContainerRef.current) return

    // Clean up existing chart
    if (chartRef.current) {
      chartRef.current.remove()
      chartRef.current = null
      candleSeriesRef.current = null
      lineSeriesRef.current = null
      volumeSeriesRef.current = null
    }

    setIsChartReady(false)

    // Get container dimensions
    const container = chartContainerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Don't create chart if container has no size
    if (width === 0 || height === 0) {
      return
    }

    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "#1a1625" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "#2d2640" },
        horzLines: { color: "#2d2640" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#6b7280",
          width: 1,
          style: 2,
          labelBackgroundColor: "#374151",
        },
        horzLine: {
          color: "#6b7280",
          width: 1,
          style: 2,
          labelBackgroundColor: "#374151",
        },
      },
      rightPriceScale: {
        borderColor: "#2d2640",
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      timeScale: {
        borderColor: "#2d2640",
        timeVisible: true,
        secondsVisible: false,
      },
    })

    chartRef.current = chart

    // Generate data once
    const { candles, volumes } = generateTradingViewData(200)
    dataRef.current = { candles, volumes }

    // Add volume series first (so it's behind price)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    })

    chart.priceScale("volume").applyOptions({
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    })

    volumeSeriesRef.current = volumeSeries
    volumeSeries.setData(volumes)

    // Add price series based on chart type
    if (selectedChartType === "candle" || selectedChartType === "bar") {
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      })
      candleSeriesRef.current = candleSeries
      lineSeriesRef.current = null
      candleSeries.setData(candles)
    } else {
      const lineSeries = chart.addSeries(LineSeries, {
        color: "#2962FF",
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
      })
      lineSeriesRef.current = lineSeries
      candleSeriesRef.current = null
      const lineData: LineData<Time>[] = candles.map((c) => ({ time: c.time, value: c.close }))
      lineSeries.setData(lineData)
    }

    // Set current price from last candle
    if (candles.length > 0) {
      const lastCandle = candles[candles.length - 1]
      setCurrentPrice(lastCandle.close)
      setPriceChange(lastCandle.close - lastCandle.open)
    }

    // Fit content
    chart.timeScale().fitContent()
    setIsChartReady(true)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        const newWidth = chartContainerRef.current.clientWidth
        const newHeight = chartContainerRef.current.clientHeight
        if (newWidth > 0 && newHeight > 0) {
          chartRef.current.applyOptions({
            width: newWidth,
            height: newHeight,
          })
        }
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [selectedChartType])

  useEffect(() => {
    // Small delay to ensure container has dimensions
    const timer = setTimeout(() => {
      initChart()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [initChart, selectedTimeframe])

  useEffect(() => {
    if (!isChartReady) return

    const interval = setInterval(() => {
      if (!dataRef.current) return

      const lastCandle = dataRef.current.candles[dataRef.current.candles.length - 1]
      if (!lastCandle) return

      const change = (Math.random() - 0.5) * 100
      const newPrice = lastCandle.close + change
      const now = Math.floor(Date.now() / 1000) as Time

      if (candleSeriesRef.current) {
        candleSeriesRef.current.update({
          time: now,
          open: lastCandle.close,
          high: Math.max(lastCandle.close, newPrice) + Math.random() * 50,
          low: Math.min(lastCandle.close, newPrice) - Math.random() * 50,
          close: newPrice,
        })
      }

      if (lineSeriesRef.current) {
        lineSeriesRef.current.update({
          time: now,
          value: newPrice,
        })
      }

      if (volumeSeriesRef.current) {
        volumeSeriesRef.current.update({
          time: now,
          value: Math.random() * 1000 + 500,
          color: newPrice >= lastCandle.close ? "rgba(38, 166, 154, 0.5)" : "rgba(239, 83, 80, 0.5)",
        })
      }

      setCurrentPrice(newPrice)
      setPriceChange(change)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [isChartReady])

  const handleZoomIn = () => {
    if (chartRef.current) {
      const timeScale = chartRef.current.timeScale()
      const currentRange = timeScale.getVisibleLogicalRange()
      if (currentRange) {
        const newRange = {
          from: currentRange.from + (currentRange.to - currentRange.from) * 0.1,
          to: currentRange.to - (currentRange.to - currentRange.from) * 0.1,
        }
        timeScale.setVisibleLogicalRange(newRange)
      }
    }
  }

  const handleZoomOut = () => {
    if (chartRef.current) {
      const timeScale = chartRef.current.timeScale()
      const currentRange = timeScale.getVisibleLogicalRange()
      if (currentRange) {
        const newRange = {
          from: currentRange.from - (currentRange.to - currentRange.from) * 0.1,
          to: currentRange.to + (currentRange.to - currentRange.from) * 0.1,
        }
        timeScale.setVisibleLogicalRange(newRange)
      }
    }
  }

  const handleReset = () => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent()
    }
  }

  const changePercent = (priceChange / (currentPrice - priceChange)) * 100
  const isPositive = priceChange >= 0

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f7931a] flex items-center justify-center">
              <span className="text-white font-bold text-xs">₿</span>
            </div>
            <div>
              <div className="font-semibold">{symbol}</div>
              <div className="text-xs text-muted-foreground">Bitcoin / Tether</div>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <div>
              <div className="text-2xl font-mono font-bold">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-[#26a69a]" : "text-[#ef5350]"}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {isPositive ? "+" : ""}
                  {priceChange.toFixed(2)}
                </span>
                <span>
                  ({isPositive ? "+" : ""}
                  {changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe Selector */}
          <div className="flex items-center bg-secondary rounded-md p-0.5">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${selectedTimeframe === tf
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center bg-secondary rounded-md p-0.5">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedChartType(type.id)}
                className={`p-1.5 rounded transition-colors ${selectedChartType === type.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
                title={type.label}
              >
                <type.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-1 ml-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn} title="Zoom In">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut} title="Zoom Out">
              <Minus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleReset} title="Reset View">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Crosshair">
              <Crosshair className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Fullscreen">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* TradingView Chart Container */}
      <div className="flex-1 relative h-[600px] min-h-[500px]" ref={chartContainerRef} />
    </div>
  )
}
