"use client";

import { useState, useEffect } from "react";
import { Calculator as CalculatorIcon, ArrowRight, Settings2, Link as LinkIcon, Check, Copy } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Script from "next/script";
import angryEmoji from "./src_img/angry-emoji.gif";

type UnitType = "gradians" | "degrees";

interface CalculationResults {
    Vp: number;
    k: number;
    R_min_raw: number;
    R: number;
    T: number;
    B: number;
    C: number;
    C_ax: number;
    CP_mc: number;
    CP_B: number;
    CP_b: number;
    CP_t: number;
    unit: UnitType;
}

export default function CalculatorProject() {
    const [nValue, setNValue] = useState<string>("");
    const [uValue, setUValue] = useState<string>("");
    const [alphaMsg, setAlphaMsg] = useState<string>("");
    const [alphaCValue, setAlphaCValue] = useState<string>("");
    const [cAxValue, setCAxValue] = useState<string>("");
    const [unit, setUnit] = useState<UnitType>("gradians");
    const [results, setResults] = useState<CalculationResults | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showErrorImage, setShowErrorImage] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [copiedResults, setCopiedResults] = useState<boolean>(false);
    const [shouldAutoCalculate, setShouldAutoCalculate] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            if (params.has("n")) {
                setNValue(params.get("n") || "");
                setUValue(params.get("u") || "");
                setAlphaCValue(params.get("ac") || "");
                setCAxValue(params.get("cax") || "");
                const paramUnit = params.get("unit");
                if (paramUnit === "gradians" || paramUnit === "degrees") {
                    setUnit(paramUnit as UnitType);
                }
                setShouldAutoCalculate(true);
            }
        }
    }, []);

    useEffect(() => {
        if (shouldAutoCalculate && nValue && uValue && alphaCValue) {
            setTimeout(() => calculate(), 50);
            setShouldAutoCalculate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldAutoCalculate, nValue, uValue, alphaCValue, cAxValue, unit]);

    const copyShareLink = () => {
        const params = new URLSearchParams();
        if (nValue) params.set("n", nValue);
        if (uValue) params.set("u", uValue);
        if (alphaCValue) params.set("ac", alphaCValue);
        if (cAxValue) params.set("cax", cAxValue);
        params.set("unit", unit);

        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const copyAllResults = () => {
        if (!results) return;

        const textToCopy = `=== Input Parameters ===
Angle Unit: ${unit === 'gradians' ? 'Gradians' : 'Degrees'}
Value N: ${nValue}
Angle U: ${uValue}
Center Angle αc: ${alphaCValue}
C_t ax/C_p ax: ${cAxValue} m

=== Calculated Results ===
Project Speed (Vp): ${results.Vp.toFixed(2)} km/h
Friction Coeff (k): ${results.k.toFixed(2)}%
Min Radius (R_min_raw): ${results.R_min_raw.toFixed(2)} m
Standard Radius (R): ${results.R.toFixed(2)} m
Tangent (T): ${results.T.toFixed(2)} m
Bisector (B): ${results.B.toFixed(2)} m
Curve Length (C): ${results.C.toFixed(2)} m

=== Transversal Profile ===
Road Margin (CP_mc): ${results.CP_mc.toFixed(2)} m
Curb Profile (CP_B): ${results.CP_B.toFixed(2)} m
Curb Base (CP_b): ${results.CP_b.toFixed(2)} m
Exterior Sidewalk (CP_t): ${results.CP_t.toFixed(2)} m`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopiedResults(true);
            setTimeout(() => setCopiedResults(false), 2000);
        });
    };

    const triggerError = (errorMessage: string) => {
        setError(errorMessage);
        setShowErrorImage(true);
        setTimeout(() => setShowErrorImage(false), 2000);

        try {
            const audio = new Audio("/sounds/grrrr-clash-royale.mp3");
            audio.play().catch((e) => console.log("Audio playback prevented by browser", e));
        } catch (err) { }
    };

    const calculate = () => {
        setError(null);
        setResults(null);

        const N = parseFloat(nValue.replace(',', '.'));
        const U = parseFloat(uValue.replace(',', '.'));
        const alpha_c = parseFloat(alphaCValue.replace(',', '.'));
        const C_ax = parseFloat(cAxValue.replace(',', '.'));

        if (isNaN(N) || isNaN(U) || isNaN(alpha_c) || isNaN(C_ax)) {
            triggerError("Please enter valid numeric values for all fields.");
            return;
        }

        // Validation Logic
        if (unit === "gradians") {
            if (Math.abs(U + alpha_c - 200) > 0.01) {
                triggerError("Nu da bine mai incearca!");
                return;
            }
        } else {
            // Degrees
            if (Math.abs(U + alpha_c - 180) > 0.01) {
                triggerError("Nu da bine mai incearca!");
                return;
            }
        }
        // --- Cross-Section Constants ---
        const p = 0.025;   // Road Inclination
        const h_b = 0.05;  // Curb Height (m)
        const h_B = 0.1;   // Curb Width (m)
        const l = 2;       // Sidewalk Width (m)
        const p_t = 0.02;  // Sidewalk Slope

        // Constants
        const ps = 0.06;

        // 1. Calculate Project Speed: Vp = 50 - N
        const Vp = 50 - N;

        // k friction coefficient
        const k = 35 - 0.5 * N;

        // 3. Calculate Minimum Radius: R_min_raw = (Vp^2) / (13*0.06 * (10 + k))
        const R_min_raw = (Vp * Vp) / (13 * 0.06 * (10 + k));

        // 4. Calculate Standard Radius: R = Round R_min_raw up to the nearest multiple of 5
        const R = Math.ceil(R_min_raw / 5) * 5;

        let C: number;

        if (unit === "gradians") {
            // Curve Length: C = (Math.PI * R * alpha_c) / 200
            C = (Math.PI * R * alpha_c) / 200;
        } else {
            // Degrees
            // Curve Length: C = (Math.PI * R * alpha_c) / 180
            C = (Math.PI * R * alpha_c) / 180;
        }

        const conversionFactor = unit === "gradians" ? Math.PI / 200 : Math.PI / 180;

        // 6. Calculate Tangent: T = R * tan(alpha_c / 2 converted to radians)
        const T = R * Math.tan((alpha_c * conversionFactor) / 2);

        // 7. Calculate Bisector: B = R * ((1 / Math.cos((alpha_c * conversionFactor) / 2)) - 1);
        const B = R * ((1 / Math.cos((alpha_c * conversionFactor) / 2)) - 1);

        // --- Transversal Profile Calculations ---
        const CP_mc = C_ax - (B / 2) * p; // Road Margin Level
        const CP_B = CP_mc + h_B;         // Curb Level
        const CP_b = CP_B - h_b;          // Curb Base Level
        const CP_t = CP_b + p_t * l;      // Exterior Sidewalk Level

        setResults({
            Vp,
            k,
            R_min_raw,
            R,
            T,
            B,
            C,
            C_ax,
            CP_mc,
            CP_B,
            CP_b,
            CP_t,
            unit
        });

        try {
            const successAudio = new Audio("/sounds/yippeeeeeeeeeeeeee.mp3");
            successAudio.play().catch((e) => console.log("Success audio playback prevented", e));
        } catch (err) { }

        if (typeof window !== "undefined" && (window as any).tsParticles) {
            (window as any).tsParticles.load("tsparticles", {
                "fullScreen": {
                    "zIndex": 1
                },
                "emitters": {
                    "direction": "top",
                    "life": {
                        "count": 1,
                        "duration": 5,
                        "delay": 0.1
                    },
                    "rate": {
                        "delay": 0.1,
                        "quantity": 15
                    },
                    "size": {
                        "width": 100,
                        "height": 0
                    },
                    "position": {
                        "y": 100,
                        "x": 50
                    }
                },
                "particles": {
                    "color": {
                        "value": [
                            "#FFFFFF",
                            "#FFd700",
                            "#FF0000",
                            "#00FF00",
                            "#0000FF"
                        ]
                    },
                    "move": {
                        "direction": "top",
                        "enable": true,
                        "outModes": {
                            "default": "out",
                            "top": "none"
                        },
                        "size": true,
                        "speed": {
                            "min": 25,
                            "max": 60
                        },
                        "gravity": {
                            "enable": true,
                            "acceleration": 9.81
                        }
                    },
                    "number": {
                        "value": 0
                    },
                    "opacity": {
                        "value": 1,
                        "animation": {
                            "enable": false,
                            "startValue": "max",
                            "destroy": "min",
                            "speed": 0.3,
                            "sync": true
                        }
                    },
                    "rotate": {
                        "value": {
                            "min": 0,
                            "max": 360
                        },
                        "direction": "random",
                        "move": true,
                        "animation": {
                            "enable": true,
                            "speed": 60
                        }
                    },
                    "tilt": {
                        "direction": "random",
                        "enable": true,
                        "move": true,
                        "value": {
                            "min": 0,
                            "max": 360
                        },
                        "animation": {
                            "enable": true,
                            "speed": 60
                        }
                    },
                    "shape": {
                        "type": [
                            "circle",
                            "square",
                            "triangle"
                        ],
                        "options": {}
                    },
                    "size": {
                        "value": {
                            "min": 2,
                            "max": 4
                        }
                    },
                    "roll": {
                        "darken": {
                            "enable": true,
                            "value": 30
                        },
                        "enlighten": {
                            "enable": true,
                            "value": 30
                        },
                        "enable": true,
                        "speed": {
                            "min": 15,
                            "max": 25
                        }
                    },
                    "wobble": {
                        "distance": 30,
                        "enable": true,
                        "move": true,
                        "speed": {
                            "min": -15,
                            "max": 15
                        }
                    }
                }
            }).then((container: any) => {
                const el = document.getElementById("tsparticles");
                if (el) {
                    el.style.opacity = "1";
                    el.style.transition = "none";
                }

                // Stop emitting and fade out exactly after 5 seconds to clean up
                setTimeout(() => {
                    if (el) {
                        el.style.transition = "opacity 3s ease";
                        el.style.opacity = "0";
                    }

                    // After fade out completes, destroy container
                    setTimeout(() => {
                        if (container) {
                            container.destroy();
                        }
                        if (el) {
                            el.style.transition = "none";
                            el.style.opacity = "1";
                        }
                    }, 3000);
                }, 5000);
            });
        }
    };

    return (
        <main className="flex-1">
            <Script src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js" strategy="lazyOnload" />
            <div id="tsparticles" className="pointer-events-none fixed inset-0 z-[1]" />
            <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4 relative z-10">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-6 text-center mb-12">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/tight font-headline bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text bg-300% animate-gradient pb-2">
                                Road Curve Calculator
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto">
                                Agongus
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

                                    <div className="space-y-2">
                                        <label htmlFor="cax-value" className="text-sm font-medium leading-none">
                                            C_t ax/C_p ax (m)
                                        </label>
                                        <input
                                            id="cax-value"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Enter C_t ax/C_p ax"
                                            value={cAxValue}
                                            onChange={(e) => setCAxValue(e.target.value)}
                                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    </div>

                                    {error && (
                                        <div className="space-y-4">
                                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                                                {error}
                                            </div>
                                            {showErrorImage && (
                                                <div className="flex justify-center animate-in fade-in zoom-in duration-300">
                                                    <img
                                                        src={angryEmoji.src}
                                                        alt="Error indicator"
                                                        className="h-32 w-auto object-contain drop-shadow-lg"
                                                    />
                                                </div>
                                            )}
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
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold font-headline">Results</h2>
                                    {results && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={copyAllResults}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md"
                                            >
                                                {copiedResults ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                {copiedResults ? "Copied!" : "Copy Results"}
                                            </button>
                                            <button
                                                onClick={copyShareLink}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md"
                                            >
                                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                                {copied ? "Copied!" : "Share Link"}
                                            </button>
                                        </div>
                                    )}
                                </div>

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
                                                formula="Vp² / (13 * 0.06 * (10 + k))"
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
                                                formula={results.unit === 'gradians' ? "R * tan(αc / 2)" : "R * tan(αc / 2)"}
                                            />
                                            <ResultItem
                                                label="Bisector (B)"
                                                value={`${results.B.toFixed(2)} m`}
                                                formula="R * ((1 / cos(αc / 2)) - 1)"
                                            />
                                            <ResultItem
                                                label="Curve Length (C)"
                                                value={`${results.C.toFixed(2)} m`}
                                                formula={results.unit === 'gradians' ? "(π * R * αc) / 200" : "(π * R * αc) / 180"}
                                                className="md:col-span-2"
                                            />
                                            {/* Transversal Profile Results */}
                                            <ResultItem
                                                label="Road Margin (CP_mc)"
                                                value={`${results.CP_mc.toFixed(2)} m`}
                                                formula="C_ax - (B / 2) * p"
                                            />
                                            <ResultItem
                                                label="Curb Profile (CP_B)"
                                                value={`${results.CP_B.toFixed(2)} m`}
                                                formula="CP_mc + h_B"
                                            />
                                            <ResultItem
                                                label="Curb Base (CP_b)"
                                                value={`${results.CP_b.toFixed(2)} m`}
                                                formula="CP_B - h_b"
                                            />
                                            <ResultItem
                                                label="Exterior Sidewalk (CP_t)"
                                                value={`${results.CP_t.toFixed(2)} m`}
                                                formula="CP_b + p_t * l"
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
