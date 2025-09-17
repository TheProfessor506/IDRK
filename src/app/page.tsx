import Link from "next/link";
import {
  CodeXml,
  Palette,
  BrainCircuit,
  Camera,
  Music,
  Settings,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PersonalizedGreeting } from "@/components/personalized-greeting";
import { MateiAllLogo } from "@/components/icons";

const skills = [
  {
    icon: CodeXml,
    title: "Development",
    description: "Building robust and scalable applications from scratch.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Crafting intuitive and beautiful user interfaces.",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML",
    description: "Integrating intelligence into applications for smarter solutions.",
  },
  {
    icon: Camera,
    title: "Visuals",
    description: "Creating compelling visual content through photography and videography.",
  },
  {
    icon: Music,
    title: "Audio",
    description: "Producing and engineering sound for various media.",
  },
  {
    icon: Settings,
    title: "Engineering",
    description: "Solving complex problems with a versatile engineering mindset.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <Link
          href="#"
          className="flex items-center justify-center gap-2"
          prefetch={false}
        >
          <MateiAllLogo className="h-8 w-8" />
          <span className="text-2xl font-bold font-headline">Matei.All</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/privacy-contact">
              Privacy & Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <PersonalizedGreeting />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
                  I'm Matei. I do everything.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A multi-disciplinary creator, developer, and innovator. Welcome
                  to my personal space on the web where I showcase my journey and
                  creations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                What can I do
              </h2>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">
                    {skill.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Matei.All. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/privacy-contact"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy & Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
