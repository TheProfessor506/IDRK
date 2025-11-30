
import Link from "next/link";
import {
  CodeXml,
  Lightbulb,
  BrainCircuit,
  PenLine,
  Music,
  Settings,
  BookOpen,
  Shield,
} from "lucide-react";
import { PrivacyModal } from "@/components/PrivacyModal";

const skills = [
  {
    icon: CodeXml,
    title: "I Code",
  },
  {
    icon: Lightbulb,
    title: "I have ideas",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML",
  },
  {
    icon: PenLine,
    title: "Writing",
  },
  {
    icon: Music,
    title: "Audio",
  },
  {
    icon: Settings,
    title: "Engineering",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <main className="relative">
        <section className="h-screen sticky top-0 z-10 flex flex-col items-center justify-center text-center bg-background">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-muted-foreground">Welcome to my personal website.</p>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient">
                I'm Matei and I do everything.
              </h1>
            </div>
          </div>
        </section>

        <div className="relative z-20">
          <section id="skills" className="sticky top-0 min-h-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center bg-secondary">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  What can I do
                </h2>
              </div>
              <div className="mx-auto grid items-start gap-8 grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
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

          <section id="projects" className="relative z-30 min-h-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center bg-background">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Links
                </h2>
              </div>
              <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <Link href="/Proiecte">
                  <div
                    className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">
                      University Project
                    </h3>
                  </div>
                </Link>
                <PrivacyModal>
                  <div
                    className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">
                      Privacy & Contact
                    </h3>
                  </div>
                </PrivacyModal>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
