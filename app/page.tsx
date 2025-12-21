"use client";

import { CategoryList } from "@/components/category-list";
import { AchievementsSection } from "@/components/achievements-section";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="container max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-16">

        {/* Hero Section */}
        <section className="text-center space-y-4 pt-4 md:pt-8">
          <div className="inline-flex items-center justify-center p-2 bg-muted/50 rounded-full mb-2 md:mb-4 backdrop-blur-sm border border-muted">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-amber-500 mr-2" />
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground">Your Vision for 2026</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 px-2">
            Design Your Future
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Track your goals, celebrate milestones, and build the life you dream of. One step at a time.
          </p>
        </section>

        {/* Main Content */}
        <div className="grid gap-16">
          <CategoryList />
          <AchievementsSection />
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-12 pb-8 border-t border-dashed">
          <p>
            © 2026 Goal Planner. Built by{" "}
            <a
              href="https://wael-manai.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline underline-offset-4"
            >
              Wael Manai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
