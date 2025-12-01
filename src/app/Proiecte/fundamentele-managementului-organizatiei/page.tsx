import { Timer, Lightbulb, Users, Rocket, Briefcase } from "lucide-react";
import FadeIn from "@/components/FadeIn";

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
                        <FadeIn>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                    Comportament și Dinamică
                                </h2>
                            </div>
                        </FadeIn>

                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Card 1 */}
                            <FadeIn delay={0.1}>
                                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg h-full">
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
                            </FadeIn>

                            {/* Card 2 */}
                            <FadeIn delay={0.2}>
                                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg h-full">
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
                            </FadeIn>

                            {/* Card 3 */}
                            <FadeIn delay={0.3}>
                                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg h-full">
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
                            </FadeIn>
                        </div>
                    </div>

                    <div className="mt-24 space-y-12">
                        <FadeIn>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                    Atitudini si practici
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex justify-center">
                                <div className="max-w-[800px] text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient pb-2">
                                        Antreprenori folosesc euristicile (un fel de scurtaturi mentale) și încrederea exagerată pentru a naviga rapid incertitudinile concentrându-se pe succes. Pe când Managerii se ancoreaza în date istorice și bugete, aceștia fiind prinși într-un sistem de tip "up or out", fiind motivati prin o structura de tip "up or out", fiind motivați să evite eșecul.
                                    </h3>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="mt-24 space-y-12">
                        <FadeIn>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                    Reacții Diferite
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex justify-center">
                                <div className="max-w-[800px] text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient pb-2">
                                        Antreprenorii răspund prin inovare agresivă pentru a crește, în timp ce managerii devin mai prudenți și evită riscurile.
                                    </h3>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="mt-24 space-y-12">
                        <FadeIn>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                    Antreprenori vs Manageri
                                </h2>
                            </div>
                        </FadeIn>

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Card 1 */}
                            <FadeIn delay={0.2} direction="right">
                                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg h-full">
                                    <div className="bg-accent/20 text-accent p-4 rounded-full">
                                        <Rocket className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold font-headline text-primary">
                                        Antreprenori (Versatili)
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Preferința pentru inovare este o trăsătură dominantă. Aceștia nu sunt limitați de procesele existente și asigură rate mari de creștere prin dezvoltare continuă.
                                    </p>
                                </div>
                            </FadeIn>

                            {/* Card 2 */}
                            <FadeIn delay={0.2} direction="left">
                                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-card shadow-md border border-border/50 transition-all hover:shadow-lg h-full">
                                    <div className="bg-accent/20 text-accent p-4 rounded-full">
                                        <Briefcase className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold font-headline text-primary">
                                        Manageri (Optimizatori)
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Se simt confortabil în sisteme birocratice. Focusul lor este pe rigoarea financiară, structură și optimizarea proceselor existente, având rate de creștere adesea inferioare.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    <div className="mt-24 space-y-12">
                        <FadeIn>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                                    Bariere în Calea Performanței
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="flex justify-center">
                                <div className="max-w-[800px] w-full bg-card p-8 rounded-xl shadow-md border border-border/50">
                                    <ul className="space-y-6 text-left">
                                        <li className="flex gap-4">
                                            <span className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-bold text-foreground block mb-1">Contextul Organizațional</span>
                                                Principalul obstacol pentru manageri nu este psihologic, ci organizațional. Ierarhia, complexitatea și rigiditatea companiilor mari sufocă inovația (Rigtering & Behren, 2021).
                                            </p>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-bold text-foreground block mb-1">Bariere Culturale</span>
                                                Mentalitatea culturală a agentului economic, manifestată cel mai adesea printr-o aversiune ridicată față de risc, care blochează inițiativele noi.
                                            </p>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-bold text-foreground block mb-1">Bariere Structurale</span>
                                                Proceduri greoaie de aprobare și lipsa timpului pentru analiză. Soluția propusă: crearea de "zone autonome" pentru a stimula spiritul antreprenorial intern.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    );
}
