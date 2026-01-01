"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// --- Types ---

export type PositionSide = 'LONG' | 'SHORT'

export interface Position {
    id: string
    symbol: string
    side: PositionSide
    size: number // In units of the asset (e.g., BTC)
    entryPrice: number
    leverage: number
    liquidationPrice: number
    stopLoss?: number
    takeProfit?: number
    openTime: number
}

export interface TradeHistory {
    id: string
    symbol: string
    side: PositionSide
    size: number
    entryPrice: number
    closePrice: number
    pnl: number
    pnlPercent: number
    closeTime: number
    leverage: number
}

export interface LimitOrder {
    id: string
    symbol: string
    side: PositionSide
    size: number
    limitPrice: number
    leverage: number
    timestamp: number
}

export interface TradingState {
    balance: number // Available Cash (USDT)
    equity: number // Balance + Unrealized PnL
    realizedPnL: number
    unrealizedPnL: number
    usedMargin: number
    positions: Position[]
    orders: LimitOrder[]
    history: TradeHistory[]
    currentPrice: number // Simulated BTC Price
    priceChange24h: number // Percentage
}

export interface TradingContextType extends TradingState {
    openPosition: (symbol: string, side: PositionSide, amount: number, leverage: number, sl?: number, tp?: number) => void
    placeLimitOrder: (symbol: string, side: PositionSide, amount: number, leverage: number, limitPrice: number) => void
    closePosition: (id: string) => void
    closeAllPositions: () => void
    cancelOrder: (id: string) => void
    deposit: (amount: number) => void
    withdraw: (amount: number) => void
    resetAccount: () => void
    isLoading: boolean
}

// --- Context ---

const TradingContext = createContext<TradingContextType | undefined>(undefined)

export function useTrading() {
    const context = useContext(TradingContext)
    if (!context) {
        throw new Error('useTrading must be used within a TradingProvider')
    }
    return context
}

// --- Constants & Helpers ---

const INITIAL_BALANCE = 100000 // $100k Paper Money
const INITIAL_PRICE = 42350.00
const LEVERAGE_COST = 0.0006 // 0.06% Trading Fee

// Random Walk Simulation
function useMarketSimulation() {
    const [price, setPrice] = useState(INITIAL_PRICE)

    useEffect(() => {
        const interval = setInterval(() => {
            setPrice(prev => {
                const change = (Math.random() - 0.5) * (prev * 0.002) // 0.2% volatility
                return prev + change
            })
        }, 1000) // Update every second

        return () => clearInterval(interval)
    }, [])

    return price
}

// --- Provider ---

export function TradingProvider({ children }: { children: ReactNode }) {
    const currentPrice = useMarketSimulation()
    const [balance, setBalance] = useState(INITIAL_BALANCE)
    const [positions, setPositions] = useState<Position[]>([])
    const [orders, setOrders] = useState<LimitOrder[]>([])
    const [history, setHistory] = useState<TradeHistory[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Derived State
    const [unrealizedPnL, setUnrealizedPnL] = useState(0)

    // Persistence Layer
    useEffect(() => {
        const savedSession = localStorage.getItem('trading-session-v1')
        if (savedSession) {
            try {
                const data = JSON.parse(savedSession)
                if (data.balance) setBalance(data.balance)
                if (data.positions) setPositions(data.positions)
                if (data.orders) setOrders(data.orders)
                if (data.history) setHistory(data.history)
            } catch (e) {
                console.error("Failed to load session", e)
            }
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const sessionData = {
                balance,
                positions,
                orders,
                history
            }
            localStorage.setItem('trading-session-v1', JSON.stringify(sessionData))
        }
    }, [balance, positions, orders, history, isLoading])

    useEffect(() => {
        // Calculate PnL for all positions
        let totalPnL = 0
        positions.forEach(pos => {
            const priceDiff = currentPrice - pos.entryPrice
            const value = pos.size * priceDiff
            totalPnL += pos.side === 'LONG' ? value : -value
        })
        setUnrealizedPnL(totalPnL)

        // Check SL/TP
        positions.forEach(pos => {
            if (pos.stopLoss) {
                if (pos.side === 'LONG' && currentPrice <= pos.stopLoss) closePosition(pos.id)
                if (pos.side === 'SHORT' && currentPrice >= pos.stopLoss) closePosition(pos.id)
            }
            if (pos.takeProfit) {
                if (pos.side === 'LONG' && currentPrice >= pos.takeProfit) closePosition(pos.id)
                if (pos.side === 'SHORT' && currentPrice <= pos.takeProfit) closePosition(pos.id)
            }
        })

        // Check Limit Orders
        setOrders(prevOrders => {
            const remainingOrders: LimitOrder[] = []
            prevOrders.forEach(order => {
                const shouldFill =
                    (order.side === 'LONG' && currentPrice <= order.limitPrice) ||
                    (order.side === 'SHORT' && currentPrice >= order.limitPrice)

                if (shouldFill) {
                    // Execute Order
                    // openPosition(order.symbol, order.side, order.size * order.limitPrice / order.leverage, order.leverage) // Recalculate margin? 
                    // Wait, openPosition takes MARGIN. 
                    // LimitOrder stores SIZE (BTC). 
                    // Let's simplified: 
                    // openPositionInternal(...)
                    // For now, let's just mimic openPosition logic here to avoid recursion issues or just call the state setter directly.

                    const margin = (order.size * order.limitPrice) / order.leverage
                    // Fee?
                    setPositions(prev => [{
                        id: Math.random().toString(36).substr(2, 9),
                        symbol: order.symbol,
                        side: order.side,
                        size: order.size,
                        entryPrice: order.limitPrice, // Filled at limit price
                        leverage: order.leverage,
                        liquidationPrice: order.side === 'LONG'
                            ? order.limitPrice * (1 - 1 / order.leverage)
                            : order.limitPrice * (1 + 1 / order.leverage),
                        openTime: Date.now()
                    }, ...prev])
                } else {
                    remainingOrders.push(order)
                }
            })
            return remainingOrders
        })

    }, [currentPrice]) // Removed 'positions' from dep array to avoid loops, though strict mode might complain. ideally functional updates.

    // Load initial state (simulation)


    const openPosition = (symbol: string, side: PositionSide, amountRef: number, leverage: number, sl?: number, tp?: number) => {
        // AmountRef is MARGIN (USDT)
        const margin = amountRef
        const totalSizeUSDT = margin * leverage
        const sizeBTC = totalSizeUSDT / currentPrice
        const fee = totalSizeUSDT * LEVERAGE_COST

        if (balance < margin + fee) {
            console.error("Insufficient balance")
            return
        }

        setBalance(prev => prev - margin - fee)

        const newPosition: Position = {
            id: Math.random().toString(36).substr(2, 9),
            symbol,
            side,
            size: sizeBTC,
            entryPrice: currentPrice,
            leverage,
            liquidationPrice: side === 'LONG'
                ? currentPrice * (1 - 1 / leverage)
                : currentPrice * (1 + 1 / leverage),
            stopLoss: sl,
            takeProfit: tp,
            openTime: Date.now()
        }

        setPositions(prev => [newPosition, ...prev])
    }

    const placeLimitOrder = (symbol: string, side: PositionSide, amountRef: number, leverage: number, limitPrice: number) => {
        // AmountRef is MARGIN
        const margin = amountRef
        const totalSizeUSDT = margin * leverage
        const sizeBTC = totalSizeUSDT / limitPrice // Size based on LIMIT price

        // Deduct margin now? Or later? Paper trading usually holds margin.
        // Let's deduct margin for simplicity.
        if (balance < margin) return;
        setBalance(prev => prev - margin)

        const newOrder: LimitOrder = {
            id: Math.random().toString(36).substr(2, 9),
            symbol,
            side,
            size: sizeBTC,
            limitPrice,
            leverage,
            timestamp: Date.now()
        }
        setOrders(prev => [newOrder, ...prev])
    }

    const cancelOrder = (id: string) => {
        const order = orders.find(o => o.id === id)
        if (order) {
            const margin = (order.size * order.limitPrice) / order.leverage
            setBalance(prev => prev + margin)
            setOrders(prev => prev.filter(o => o.id !== id))
        }
    }

    const closePosition = (id: string) => {
        const pos = positions.find(p => p.id === id)
        if (!pos) return

        const priceDiff = currentPrice - pos.entryPrice
        const rawPnL = pos.size * priceDiff
        const finalPnL = pos.side === 'LONG' ? rawPnL : -rawPnL
        const margin = (pos.size * pos.entryPrice) / pos.leverage

        setBalance(prev => prev + margin + finalPnL)

        // Add to History
        const historyItem: TradeHistory = {
            id: pos.id,
            symbol: pos.symbol,
            side: pos.side,
            size: pos.size,
            entryPrice: pos.entryPrice,
            closePrice: currentPrice,
            pnl: finalPnL,
            pnlPercent: (finalPnL / margin) * 100,
            closeTime: Date.now(),
            leverage: pos.leverage
        }

        setHistory(prev => [historyItem, ...prev])
        setPositions(prev => prev.filter(p => p.id !== id))
    }

    const closeAllPositions = () => {
        let totalPnLToAdd = 0
        let totalMarginRef = 0
        const newHistoryItems: TradeHistory[] = []

        positions.forEach(pos => {
            const priceDiff = currentPrice - pos.entryPrice
            const rawPnL = pos.size * priceDiff
            const finalPnL = pos.side === 'LONG' ? rawPnL : -rawPnL
            const margin = (pos.size * pos.entryPrice) / pos.leverage

            totalPnLToAdd += finalPnL
            totalMarginRef += margin

            newHistoryItems.push({
                id: pos.id,
                symbol: pos.symbol,
                side: pos.side,
                size: pos.size,
                entryPrice: pos.entryPrice,
                closePrice: currentPrice,
                pnl: finalPnL,
                pnlPercent: (finalPnL / margin) * 100,
                closeTime: Date.now(),
                leverage: pos.leverage
            })
        })

        setBalance(prev => prev + totalMarginRef + totalPnLToAdd)
        setHistory(prev => [...newHistoryItems, ...prev])
        setPositions([])
    }

    const realizedPnL = history.reduce((acc, trade) => acc + trade.pnl, 0)
    const usedMargin = positions.reduce((acc, pos) => acc + (pos.size * pos.entryPrice / pos.leverage), 0)

    const deposit = (amount: number) => {
        setBalance(prev => prev + amount)
    }

    const withdraw = (amount: number) => {
        if (balance >= amount) {
            setBalance(prev => prev - amount)
        } else {
            alert("Insufficient funds")
        }
    }

    const resetAccount = () => {
        setBalance(INITIAL_BALANCE)
        setPositions([])
        setOrders([])
        setHistory([])
        localStorage.removeItem('trading-session-v1')
    }

    const value = {
        balance,
        equity: balance + usedMargin + unrealizedPnL,
        usedMargin,
        realizedPnL,
        unrealizedPnL,
        positions,
        orders,
        history,
        currentPrice,
        priceChange24h: ((currentPrice - INITIAL_PRICE) / INITIAL_PRICE) * 100,
        openPosition,
        placeLimitOrder,
        closePosition,
        closeAllPositions,
        cancelOrder,
        deposit,
        withdraw,
        resetAccount,
        isLoading
    }

    return (
        <TradingContext.Provider value={value}>
            {children}
        </TradingContext.Provider>
    )
}
