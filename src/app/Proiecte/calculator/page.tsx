"use client";

import { useState } from "react";
import { Calculator as CalculatorIcon, ArrowRight, Settings2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

type UnitType = "gradians" | "degrees";

interface CalculationResults {
    Vp: number;
    k: number;
    R_min_raw: number;
    R: number;
    T: number;
    B: number;
    C: number;
    unit: UnitType;
}

export default function CalculatorProject() {
    const [nValue, setNValue] = useState<string>("");
    const [uValue, setUValue] = useState<string>("");
    const [alphaMsg, setAlphaMsg] = useState<string>(""); // Helper for alpha_c input
    const [alphaCValue, setAlphaCValue] = useState<string>("");
    const [unit, setUnit] = useState<UnitType>("gradians");
    const [results, setResults] = useState<CalculationResults | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = () => {
        setError(null);
        setResults(null);

        const N = parseFloat(nValue.replace(',', '.'));
        const U = parseFloat(uValue.replace(',', '.'));
        const alpha_c = parseFloat(alphaCValue.replace(',', '.'));

        if (isNaN(N) || isNaN(U) || isNaN(alpha_c)) {
            setError("Please enter valid numeric values for all fields.");
            return;
        }

        // Validation Logic
        if (unit === "gradians") {
            if (Math.abs(U + alpha_c - 200) > 0.01) {
                setError("Nu da bine mai incearca!");
                return;
            }
        } else {
            // Degrees
            if (Math.abs(U + alpha_c - 180) > 0.01) {
                setError("Nu da bine mai incearca!");
                return;
            }
        }

        // Constants
        const ps = 0.06;

        // 1. Calculate Project Speed: Vp = 50 - N
        const Vp = 50 - N;

        // k friction coefficient
        const k = 35 - 0.5 * N;

        // 3. Calculate Minimum Radius: R_min_raw = (Vp^2) / (127 * (ps + k))
        const R_min_raw = (Vp * Vp) / (127 * (ps + (k / 100)));

        // 4. Calculate Standard Radius: R = Round R_min_raw up to the nearest multiple of 5
        const R = Math.ceil(R_min_raw / 5) * 5;

        let alpha_rad: number;
        let C: number;

        if (unit === "gradians") {
            // Conversion: alpha_rad = alpha_c * (Math.PI / 200)
            alpha_rad = alpha_c * (Math.PI / 200);
            // Curve Length: C = (Math.PI * R * alpha_c) / 200
            C = (Math.PI * R * alpha_c) / 200;
        } else {
            // Degrees
            // Conversion: alpha_rad = alpha_c * (Math.PI / 180)
            alpha_rad = alpha_c * (Math.PI / 180);
            // Curve Length: C = (Math.PI * R * alpha_c) / 180
            C = (Math.PI * R * alpha_c) / 180;
        }

        // 6. Calculate Tangent: T = R * tan(alpha_rad / 2)
        const T = R * Math.tan(alpha_rad / 2);

        // 7. Calculate Bisector: B = R * ((1 / Math.cos(alpha_rad / 2)) - 1)
        const B = R * ((1 / Math.cos(alpha_rad / 2)) - 1);

        setResults({
            Vp,
            k,
            R_min_raw,
            R,
            T,
            B,
            C,
            unit
        });
    };

    return (
        <main className="flex-1">
            <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-6 text-center mb-12">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/tight font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient pb-2">
                                Road Curve Calculator
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto">
                                Geometry calculations for road design
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
                        {/* Input Section */}
                        <FadeIn delay={0.1}>
                            <div className="p-8 rounded-xl bg-card shadow-md border border-border/50 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-primary/20 text-primary p-3 rounded-full">
                                        <Settings2 className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-headline">Parameters</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Unit Toggle */}
                                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                                        <span className="text-sm font-medium">Angle Units:</span>
                                        <div className="flex bg-background rounded-md border border-input p-1">
                                            <button
                                                onClick={() => setUnit("gradians")}
                                                className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${unit === "gradians"
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                Gradians
                                            </button>
                                            <button
                                                onClick={() => setUnit("degrees")}
                                                className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${unit === "degrees"
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                Degrees
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="n-value" className="text-sm font-medium leading-none">
                                            Value N
                                        </label>
                                        <input
                                            id="n-value"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Enter N value"
                                            value={nValue}
                                            onChange={(e) => setNValue(e.target.value)}
                                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="u-value" className="text-sm font-medium leading-none">
                                                Angle U ({unit === "gradians" ? "g" : "°"})
                                            </label>
                                            <input
                                                id="u-value"
                                                type="text"
                                                inputMode="decimal"
                                                placeholder="Enter U"
                                                value={uValue}
                                                onChange={(e) => setUValue(e.target.value)}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="alpha-value" className="text-sm font-medium leading-none">
                                                Center Angle αc ({unit === "gradians" ? "g" : "°"})
                                            </label>
                                            <input
                                                id="alpha-value"
                                                type="text"
                                                inputMode="decimal"
                                                placeholder="Enter αc"
                                                value={alphaCValue}
                                                onChange={(e) => setAlphaCValue(e.target.value)}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        onClick={calculate}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full mt-4"
                                    >
                                        Calculate Geometry
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Results Section */}
                        <FadeIn delay={0.2}>
                            <div className="p-8 rounded-xl bg-card shadow-md border border-border/50 h-full">
                                <h2 className="text-2xl font-bold font-headline mb-6">Results</h2>

                                {!results ? (
                                    <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                                        <CalculatorIcon className="h-12 w-12 mb-4 opacity-50" />
                                        <p>Enter values and calculate to see results</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <ResultItem
                                                label="Project Speed (Vp)"
                                                value={`${results.Vp.toFixed(2)} km/h`}
                                                formula="Vp = 50 - N"
                                            />
                                            <ResultItem
                                                label="Friction Coeff (k)"
                                                value={`${results.k.toFixed(2)}%`}
                                                formula="k = 35 - 0.5 * N"
                                            />
                                            <ResultItem
                                                label="Min Radius (R_min)"
                                                value={`${results.R_min_raw.toFixed(2)} m`}
                                                formula="Vp² / (127 * (ps + k/100))"
                                            />
                                            <ResultItem
                                                label="Standard Radius (R)"
                                                value={`${results.R.toFixed(2)} m`}
                                                formula="Round up to nearest 5"
                                                highlight
                                            />
                                            <ResultItem
                                                label="Tangent (T)"
                                                value={`${results.T.toFixed(2)} m`}
                                                formula={results.unit === 'gradians' ? "R * tan(α_rad / 2)" : "R * tan(α_rad / 2)"}
                                            />
                                            <ResultItem
                                                label="Bisector (B)"
                                                value={`${results.B.toFixed(2)} m`}
                                                formula="R * ((1 / cos(α_rad / 2)) - 1)"
                                            />
                                            <ResultItem
                                                label="Curve Length (C)"
                                                value={`${results.C.toFixed(2)} m`}
                                                formula={results.unit === 'gradians' ? "(π * R * αc) / 200" : "(π * R * αc) / 180"}
                                                className="md:col-span-2"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ResultItem({ label, value, formula, highlight = false, className = "" }: { label: string; value: string; formula: string; highlight?: boolean, className?: string }) {
    return (
        <div className={`p-4 rounded-lg border ${highlight ? 'bg-primary/10 border-primary/30' : 'bg-background/50 border-border/50'} ${className}`}>
            <div className="text-sm text-muted-foreground mb-1">{label}</div>
            <div className={`text-xl font-bold font-headline mb-1 ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</div>
            <div className="text-xs text-muted-foreground opacity-70 font-mono">{formula}</div>
        </div>
    );
}
