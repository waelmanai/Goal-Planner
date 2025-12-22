"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Trophy, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingDialog() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        if (!hasSeenOnboarding) {
            setOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        localStorage.setItem("hasSeenOnboarding", "true");
        setOpen(false);
    };

    const steps = [
        {
            title: "Welcome to 2026",
            description: "Your personal companion for designing the future you deserve.",
            icon: Sparkles,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            title: "Set Your Goals",
            description: "Create categories, define ambitions, and break them down into milestones.",
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Earn Awards",
            description: "Stay consistent and unlock achievements as you progress.",
            icon: Trophy,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
        },
    ];

    const CurrentIcon = steps[step].icon;

    return (
        <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader className="space-y-4">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted transition-all duration-500">
                        <div className={cn("h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500", steps[step].bg)}>
                            <CurrentIcon className={cn("h-8 w-8 transition-all duration-500", steps[step].color)} />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold">{steps[step].title}</DialogTitle>
                    <DialogDescription className="text-base">
                        {steps[step].description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center gap-2 py-4">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                i === step ? "w-8 bg-primary" : "w-2 bg-muted"
                            )}
                        />
                    ))}
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button onClick={handleNext} className="w-full sm:w-auto min-w-[150px] gap-2">
                        {step === steps.length - 1 ? (
                            <>Get Started <Check className="h-4 w-4" /></>
                        ) : (
                            <>Next <ArrowRight className="h-4 w-4" /></>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
