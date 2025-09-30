import * as React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  HeartHandshake,
  TrendingUp,
  Timer,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ChartAreaInteractive as DefaultChart } from "../components/area-chart-interactve";

// ===== Types =====
export type Metric = {
  title: string;
  value: string | number;
  sublabel?: string;
  delta?: string; // ex: "+3.2%"
  icon?: React.ReactNode;
};

export type GridOverviewProps = {
  /** 3 colunas, cada uma com N métricas (idealmente 2 por coluna) */
  metricsCols?: [Metric[], Metric[], Metric[]];
  /** Exibir o bloco Missão/Visão/Valores */
  showMVV?: boolean;
  mission?: React.ReactNode;
  vision?: React.ReactNode;
  values?: React.ReactNode; // pode ser <ul><li>...</li></ul> ou texto
  /** Componente de gráfico a ser renderizado no painel central (4 instâncias) */
  ChartComponent?: React.ComponentType;
  /** Quantidade de gráficos (1–4). Default 4 */
  chartCount?: 1 | 2 | 3 | 4;
  /** Classe extra para o container */
  className?: string;
};

const MotionDiv = motion.div;

// ===== Subcomponentes =====
function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card className="border border-zinc-200/70 bg-white/60 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-zinc-800 text-sm">
          {metric.icon ?? <BarChart3 className="h-4 w-4" />} {metric.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-semibold tabular-nums text-zinc-900">
            {metric.value}
          </span>
          {metric.delta && (
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700"
              aria-label={`Variação ${metric.delta}`}
            >
              {metric.delta}
            </span>
          )}
        </div>
        {metric.sublabel && (
          <p className="mt-1 text-xs text-zinc-500">{metric.sublabel}</p>
        )}
      </CardContent>
    </Card>
  );
}

function MVVSection({
  mission,
  vision,
  values,
}: Required<Pick<GridOverviewProps, "mission" | "vision" | "values">>) {
  return (
    <div className="space-y-4">
      <Card className="border-emerald-200 bg-emerald-50/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Target className="h-5 w-5" /> Missão
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700">{mission}</CardContent>
      </Card>

      <Card className="border-emerald-200 bg-emerald-50/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Eye className="h-5 w-5" /> Visão
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700">{vision}</CardContent>
      </Card>

      <Card className="border-emerald-200 bg-emerald-50/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <HeartHandshake className="h-5 w-5" /> Valores
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700 space-y-1">
          {values}
        </CardContent>
      </Card>
    </div>
  );
}

// ===== Demo default (mantém compatibilidade) =====
const demo: [Metric[], Metric[], Metric[]] = [
  [
    {
      title: "Crescimento Mês",
      value: "18%",
      sublabel: "vs. mês anterior",
      delta: "+4.1%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Tempo Médio de Resposta",
      value: "2m 14s",
      sublabel: "SLA: 5 min",
      delta: "-36s",
      icon: <Timer className="h-4 w-4" />,
    },
  ],
  [
    {
      title: "Leads Qualificados",
      value: "1.284",
      sublabel: "últimos 7 dias",
      delta: "+8.3%",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "CTR Campanhas",
      value: "3,7%",
      sublabel: "média geral",
      delta: "+0,4pp",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ],
  [
    {
      title: "Receita",
      value: "R$ 842k",
      sublabel: "Mtd",
      delta: "+12%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "CAC",
      value: "R$ 126",
      sublabel: "média 30d",
      delta: "-R$ 9",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ],
];

// ===== Componente principal =====
export default function GridOverview({
  metricsCols,
  showMVV = true,
  mission,
  vision,
  values,
  ChartComponent = DefaultChart,
  chartCount = 4,
  className = "",
}: GridOverviewProps) {
  const cols = metricsCols ?? demo;

  // Variants de animação simples
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  } as const;

  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } } as const;

  const chartsToRender = Math.min(Math.max(chartCount, 1), 4);
  const chartsArray = React.useMemo(() => Array.from({ length: chartsToRender }), [chartsToRender]);

  return (
    <MotionDiv
      variants={container}
      initial="hidden"
      animate="show"
      className={"w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 " + className}
    >
      {/* Coluna 1 — MVV */}
      <MotionDiv variants={item}>
        {showMVV ? (
          <MVVSection
            mission={
              mission ?? (
                <>
                  Potencializar os resultados das empresas, unindo tecnologia,
                  dados e marketing de performance para gerar crescimento
                  sustentável e lucrativo.
                </>
              )
            }
            vision={
              vision ?? (
                <>
                  Ser reconhecida nacionalmente como a Adtech que redefine o
                  marketing de performance, criando soluções inovadoras e
                  escaláveis que unem tecnologia e estratégia para transformar
                  negócios em histórias de sucesso.
                </>
              )
            }
            values={
              values ?? (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Foco no cliente</li>
                  <li>Criatividade (para inovar)</li>
                  <li>Ambição (vontade de crescer)</li>
                  <li>Autonomia</li>
                  <li>Transparência</li>
                  <li>Responsabilidade</li>
                  <li>Velocidade (ser rápido de forma eficiente)</li>
                  <li>Coletividade (trabalho em equipe, viver em harmonia)</li>
                </ul>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cols[0].map((m, i) => (
              <MetricCard key={`m0-${i}`} metric={m} />
            ))}
          </div>
        )}
      </MotionDiv>

      {/* Coluna 2 — Gráficos interativos */}
      <MotionDiv variants={item} className="md:col-span-2">
        <div
          className={
            "grid gap-4 " +
            (chartsToRender <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2")
          }
        >
          {chartsArray.map((_, idx) => (
            <Card
              key={`chart-${idx}`}
              className="border-zinc-200/70 bg-white/60 backdrop-blur-sm"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-zinc-800">Insight {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartComponent />
              </CardContent>
            </Card>
          ))}
        </div>
      </MotionDiv>

      {/* Coluna 3 — Métricas rápidas (quando MVV está visível) */}
      {showMVV && (
        <MotionDiv variants={item} className="order-last md:order-none md:col-start-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            {cols.flat().slice(0, 4).map((m, i) => (
              <MetricCard key={`m-${i}`} metric={m} />
            ))}
          </div>
        </MotionDiv>
      )}
    </MotionDiv>
  );
}
