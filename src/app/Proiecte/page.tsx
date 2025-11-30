
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Proiecte() {
  return (
    <main className="flex-1">
      <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient">
                University Projects
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                A collection of my academic work.
              </p>
            </div>
          </div>

          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <Link href="/Proiecte/fundamentele-managementului-organizatiei">
              <div className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
                <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  Fundamentele managementului organizației
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
