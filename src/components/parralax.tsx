import { useMemo } from "react";
import { motion } from "framer-motion";


export default function ParallaxBackground({
  heightVh = 80,
  layers,
  overlay = "bg-emerald-900/20",
  children,
}: {
  heightVh?: number;
  layers?: { type?: "image" | "gradient"; src: string; speed?: number; className?: string }[];
  overlay?: string;
  children?: React.ReactNode;
}) {

  const presetLayers = useMemo(
    () =>
      layers ?? [
        { type: "image", src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop", speed: 0.15, className: "opacity-70" },
        { type: "image", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", speed: 0.35, className: "opacity-80 mix-blend-multiply" },
        { type: "gradient", src: "bg-gradient-to-b from-emerald-600/30 via-emerald-700/20 to-emerald-900/40", speed: -0.05 },
      ],
    [layers]
  );

  return (
    <section className="relative w-full" style={{ height: `${heightVh}vh` }}>
      {/* Fundo FIXED atrás de tudo (z-[-10]) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {presetLayers.map((layer, idx) => {
          return (
            <motion.div key={idx} className={`absolute inset-0 ${layer.className ?? ""}`}>
              {layer.type === "gradient" ? (
                <div className={`absolute inset-0 ${layer.src}`} />
              ) : (
                <img
                  src={layer.src}
                  alt="parallax-layer"
                  className="h-full w-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
              )}
            </motion.div>
          );
        })}
        {overlay && <div className={`absolute inset-0 ${overlay}`} />}
        {/* vinheta sutil */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,transparent,transparent,rgba(0,0,0,0.15))]" />
      </div>

      {/* Conteúdo central opcional (hero) em 100vh */}
      <div className="grid place-items-center h-screen px-6 bg- white">
        <div className="max-w-3xl text-center text-emerald-50">
          {children ?? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow">Meta Geral</h1>
              <p className="mt-3 md:text-2xl text-emerald-50/90"> Acompanhe os resultados da Novak em tempo real — gráficos,
            relatórios e evolução por período, tudo em um só lugar.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * USO
 *
 * // 1) Importe e coloque no topo da página
 * <ParallaxBackground heightVh={160} overlay="bg-emerald-900/20"
 *   layers={[
 *     { type: 'image', src: '/imgs/bg-1.jpg', speed: 0.12, className: 'opacity-80' },
 *     { type: 'image', src: '/imgs/bg-2.png', speed: 0.28, className: 'opacity-70 mix-blend-screen' },
 *     { type: 'gradient', src: 'bg-gradient-to-b from-emerald-600/20 via-transparent to-emerald-900/50', speed: -0.06 },
 *   ]}
 *>
 *   <h1 className="text-5xl md:text-7xl font-bold text-white">Novak Performance</h1>
 *</ParallaxBackground>
 *
 * // 2) O conteúdo seguinte (Header, grids etc.) vem normalmente abaixo
 * //    e será exibido "sobre" o fundo porque ele está FIXED atrás.
 */
