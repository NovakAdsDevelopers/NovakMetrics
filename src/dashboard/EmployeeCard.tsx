import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Megaphone, CalendarCheck2, Hourglass, Coins, Building2, StickyNote } from "lucide-react";
import { motion } from "framer-motion";

function diffYMD(start: any, end: any) {
  // returns {years, months, days}
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    // borrow days from previous month
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years, months, days };
}

function plural(n: number, s: string, p: string) { return `${n} ${n === 1 ? s : p}`; }

function formatTenure({ years, months, days }: { years: number; months: number; days: number }) {
  const parts = [];
  if (years) parts.push(plural(years, "ano", "anos"));
  if (months) parts.push(plural(months, "mês", "meses"));
  if (days || parts.length === 0) parts.push(plural(days, "dia", "dias"));
  return parts.join(", ");
}

export default function EmployeeOverviewCard() {
  const startDate = new Date("2025-04-16"); // Entrou em 16 de abril de 2025
  const today = new Date();
  const tenure = diffYMD(startDate, today);
  const tenureText = formatTenure(tenure);
  const joinedText = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(startDate);

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden rounded-4xl border border-zinc-200/80 shadow-sm hover:shadow-xl transition-shadow">
          {/* Glow background */}
          <div className="pointer-events-none absolute -inset-1 bg-gradient-to-tr from-emerald-200/20 via-transparent to-emerald-300/20 blur-2xl" />

          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações do Colaborador
              </CardTitle>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Megaphone className="h-3.5 w-3.5 mr-1" /> Marketing
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 pb-6">
            {/* Entrou em */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group flex items-start gap-3 rounded-2xl border border-zinc-200 p-4 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors">
                  <CalendarCheck2 className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Entrou em</p>
                    <p className="text-zinc-900 font-medium text-base">{joinedText}</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Data de início na empresa</TooltipContent>
            </Tooltip>

            {/* Tempo de empresa */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group flex items-start gap-3 rounded-2xl border border-zinc-200 p-4 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors">
                  <Hourglass className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Tempo de empresa</p>
                    <p className="text-zinc-900 font-semibold text-base">{tenureText}</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Tempo desde a data de admissão até hoje</TooltipContent>
            </Tooltip>

            {/* NovakCoins */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group flex items-start gap-3 rounded-2xl border border-zinc-200 p-4 bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100/60 transition-colors">
                  <Coins className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Saldo</p>
                    <p className="text-zinc-900 font-semibold text-base">1.5K NovakCoins</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Moedas de reconhecimento interno</TooltipContent>
            </Tooltip>

            {/* Recados RH */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group flex items-start gap-3 rounded-2xl border border-zinc-200 p-4 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors">
                  <StickyNote className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Recados RH</p>
                    <p className="text-emerald-700 font-medium">Click para ver</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Canal interno para comunicados do RH</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}