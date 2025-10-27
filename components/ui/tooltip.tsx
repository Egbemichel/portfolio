"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "@/lib/utils";

//import { cn } from "@/lib/utils";

export function TooltipProvider({
                             delayDuration = 0,
                             ...props
                         }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
    return (
        <TooltipPrimitive.Provider
            data-slot="tooltip-provider"
            delayDuration={delayDuration}
            {...props}
        />
    );
}

export function Tooltip({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
    return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>;
}

export function TooltipTrigger({ children, asChild = false, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger> & { asChild?: boolean }) {
    return (
        <TooltipPrimitive.Trigger asChild={asChild} {...props}>
            {children}
        </TooltipPrimitive.Trigger>
    );
}

export function TooltipContent({ children, className, side = "top", align = "center", ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipPrimitive.Content
            side={side}
            align={align}
            className={cn("rounded-md bg-muted-foreground text-background px-2 py-1 text-xs shadow-md", className)}
            {...props}
        >
            {children}
            <TooltipPrimitive.Arrow className="fill-muted-foreground" />
        </TooltipPrimitive.Content>
    );
}
