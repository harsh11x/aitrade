"use client"

import * as React from "react"
import { GripVertical, GripHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResizablePanelGroupProps {
  children: React.ReactNode
  direction: "horizontal" | "vertical"
  className?: string
}

interface ResizablePanelProps {
  children: React.ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
  collapsible?: boolean
  collapsed?: boolean
  onCollapse?: () => void
}

interface ResizableHandleProps {
  className?: string
  withHandle?: boolean
}

const ResizablePanelGroupContext = React.createContext<{
  direction: "horizontal" | "vertical"
  registerPanel: (id: string, ref: React.RefObject<HTMLDivElement>) => void
}>({
  direction: "horizontal",
  registerPanel: () => {},
})

export function ResizablePanelGroup({ children, direction, className }: ResizablePanelGroupProps) {
  const panelsRef = React.useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map())

  const registerPanel = React.useCallback((id: string, ref: React.RefObject<HTMLDivElement>) => {
    panelsRef.current.set(id, ref)
  }, [])

  return (
    <ResizablePanelGroupContext.Provider value={{ direction, registerPanel }}>
      <div className={cn("flex h-full w-full", direction === "horizontal" ? "flex-row" : "flex-col", className)}>
        {children}
      </div>
    </ResizablePanelGroupContext.Provider>
  )
}

export function ResizablePanel({
  children,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  className,
  collapsible = false,
  collapsed = false,
}: ResizablePanelProps) {
  const { direction } = React.useContext(ResizablePanelGroupContext)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState(defaultSize)

  React.useEffect(() => {
    if (collapsed && collapsible) {
      setSize(0)
    } else if (!collapsed && size === 0) {
      setSize(defaultSize)
    }
  }, [collapsed, collapsible, defaultSize, size])

  const style = React.useMemo(() => {
    if (direction === "horizontal") {
      return { width: `${size}%`, minWidth: collapsed ? 0 : `${minSize}%`, maxWidth: `${maxSize}%` }
    }
    return { height: `${size}%`, minHeight: collapsed ? 0 : `${minSize}%`, maxHeight: `${maxSize}%` }
  }, [direction, size, minSize, maxSize, collapsed])

  return (
    <div
      ref={panelRef}
      className={cn("flex-shrink-0 overflow-hidden", collapsed && "hidden", className)}
      style={style}
      data-panel
      data-size={size}
    >
      {children}
    </div>
  )
}

export function ResizableHandle({ className, withHandle = true }: ResizableHandleProps) {
  const { direction } = React.useContext(ResizablePanelGroupContext)
  const [isDragging, setIsDragging] = React.useState(false)
  const handleRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)

      const startPos = direction === "horizontal" ? e.clientX : e.clientY
      const handle = handleRef.current
      if (!handle) return

      const prevPanel = handle.previousElementSibling as HTMLElement
      const nextPanel = handle.nextElementSibling as HTMLElement
      if (!prevPanel || !nextPanel) return

      const parent = handle.parentElement
      if (!parent) return

      const parentSize = direction === "horizontal" ? parent.offsetWidth : parent.offsetHeight
      const prevSize = direction === "horizontal" ? prevPanel.offsetWidth : prevPanel.offsetHeight
      const nextSize = direction === "horizontal" ? nextPanel.offsetWidth : nextPanel.offsetHeight

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos = direction === "horizontal" ? moveEvent.clientX : moveEvent.clientY
        const delta = currentPos - startPos
        const deltaPercent = (delta / parentSize) * 100

        const newPrevSize = (prevSize / parentSize) * 100 + deltaPercent
        const newNextSize = (nextSize / parentSize) * 100 - deltaPercent

        if (newPrevSize >= 5 && newNextSize >= 5) {
          prevPanel.style[direction === "horizontal" ? "width" : "height"] = `${newPrevSize}%`
          nextPanel.style[direction === "horizontal" ? "width" : "height"] = `${newNextSize}%`
        }
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [direction],
  )

  return (
    <div
      ref={handleRef}
      className={cn(
        "relative flex items-center justify-center bg-border transition-colors",
        direction === "horizontal"
          ? "w-1 cursor-col-resize hover:bg-primary/50"
          : "h-1 cursor-row-resize hover:bg-primary/50",
        isDragging && "bg-primary",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex items-center justify-center rounded-sm border bg-border",
            direction === "horizontal" ? "h-6 w-3" : "h-3 w-6",
          )}
        >
          {direction === "horizontal" ? (
            <GripVertical className="h-3 w-3 text-muted-foreground" />
          ) : (
            <GripHorizontal className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  )
}
