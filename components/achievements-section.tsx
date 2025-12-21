"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, Footprints, Star, Lock, Zap, Award, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
    Trophy,
    Target,
    Footprints,
    Star,
    Zap,
    Award,
    Crown
};

const ALL_ACHIEVEMENTS = [
    {
        id: 'first-goal',
        title: 'Visionary',
        description: 'Created your first goal for 2026',
        icon: 'Target',
    },
    {
        id: 'first-milestone',
        title: 'Baby Steps',
        description: 'Completed your first milestone',
        icon: 'Footprints',
    },
    {
        id: 'first-completion',
        title: 'Achiever',
        description: 'Completed your first goal!',
        icon: 'Trophy',
    },
    {
        id: 'streak-7',
        title: 'Unstoppable',
        description: 'Logged progress 7 days in a row',
        icon: 'Zap',
    },
    {
        id: 'big-spender',
        title: 'Investor',
        description: 'Tracked a financial goal',
        icon: 'Award',
    },
    {
        id: 'master',
        title: 'Legend',
        description: 'Completed 10 goals',
        icon: 'Crown',
    },
    {
        id: 'early-bird',
        title: 'Early Bird',
        description: 'Completed a task before 8 AM',
        icon: 'Star',
    },
    {
        id: 'weekend-warrior',
        title: 'Warrior',
        description: 'Logged progress on a weekend',
        icon: 'Zap',
    },
];

export function AchievementsSection() {
    const { achievements } = useStore();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Hall of Fame</h2>
                    <p className="text-muted-foreground text-sm">Unlock badges by crushing your goals.</p>
                </div>
                <div className="bg-muted/50 px-3 py-1 rounded-full text-xs font-medium border">
                    {achievements.length} / {ALL_ACHIEVEMENTS.length} Unlocked
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {ALL_ACHIEVEMENTS.map((achievement) => {
                    const unlocked = achievements.find(a => a.id === achievement.id);
                    const Icon = iconMap[achievement.icon] || Star;

                    return (
                        <Card
                            key={achievement.id}
                            className={cn(
                                "transition-all duration-300 relative overflow-hidden group hover:scale-105 flex flex-col items-center text-center",
                                unlocked
                                    ? "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200/60 dark:border-amber-800/60 shadow-md hover:shadow-xl hover:shadow-amber-500/10"
                                    : "bg-muted/30 border-dashed opacity-60 grayscale hover:opacity-80 hover:grayscale-0"
                            )}
                        >
                            {unlocked && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            )}

                            <CardHeader className="p-4 pb-2 items-center w-full">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:rotate-12 mx-auto",
                                    unlocked
                                        ? "bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-900 text-amber-600 dark:text-amber-400 ring-2 ring-white dark:ring-amber-950"
                                        : "bg-muted text-muted-foreground"
                                )}>
                                    {unlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                                </div>
                                <CardTitle className="text-xs font-bold leading-tight">{achievement.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 w-full">
                                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{achievement.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
