import { Timer, Lightbulb, Users } from "lucide-react";

export default function FundamenteleManagementuluiOrganizatiei() {
    return (
        <main className="flex-1">
            <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-6 text-center">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/tight font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient pb-2">
                                Antreprenori VS Manageri
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto">
                                Cum sunti diferiți?
                            </p>
                        </div>
                    </div>

                    <div className="mt-24 space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                Comportament și Dinamică
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg">
                                <div className="bg-accent/20 text-accent p-4 rounded-full">
                                    <Timer className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-headline text-primary">
                                    Comportament Tip A
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Antreprenorii sunt adesea foarte competitivi, ambițioși și stresați. Acest mindset este esențial pentru faza de start-up, spre deosebire de competitivitatea standardizată a managerilor.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg">
                                <div className="bg-accent/20 text-accent p-4 rounded-full">
                                    <Lightbulb className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-headline text-primary">
                                    Abordarea Problemelor
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Antreprenorii contestă starea de fapt și redefinesc problemele prin "distrugere creativă", în timp ce managerii se concentrează pe optimizarea și eficientizarea sistemelor existente.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg">
                                <div className="bg-accent/20 text-accent p-4 rounded-full">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-headline text-primary">
                                    Dinamica Familială
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Profilul psihologic este adesea legat de o identificare negativă cu tatăl la antreprenori (căutând control propriu), versus o identificare pozitivă la manageri (căutând ordine).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
