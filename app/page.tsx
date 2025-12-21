"use client";

import { CategoryList } from "@/components/category-list";
import { AchievementsSection } from "@/components/achievements-section";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Hero Section */}
        <section className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center p-2 bg-muted/50 rounded-full mb-4 backdrop-blur-sm border border-muted">
            <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-xs font-medium text-muted-foreground">Your Vision for 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Design Your Future
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
