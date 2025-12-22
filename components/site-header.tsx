"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
    const pathname = usePathname();

    const links = [
        {
            href: "/",
            label: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            href: "/goals",
            label: "Goals",
            icon: Target,
        },
        {
            href: "/achievements",
            label: "Awards",
            icon: Trophy,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
            <div className="container flex h-14 items-center max-w-5xl mx-auto px-6 justify-between">
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-amber-500" />
                        <span className="hidden font-bold sm:inline-block">
                            2026
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === link.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <ModeToggle />
            </div>
        </header>
    );
}
