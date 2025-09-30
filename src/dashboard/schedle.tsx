import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import {
  addDays,
  compareAsc,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

// ----------------- Types -----------------
export type CalendarEvent = {
  id: string | number;
  title: string;
  description?: string;
  start: Date; // data/hora de início
  end?: Date; // opcional
  location?: string;
  color?: string; // cor do pill na agenda
  avatarUrls?: string[]; // URLs de avatar
};

export interface CalendarWithAgendaProps {
  /** Modo "rolling" exibe uma janela deslizante a partir de hoje. */
  rollingDays?: number; // ex.: 7 => hoje..+6

  /** Configs do modo mensal (ignoradas em rolling) */
  initialMonth?: Date;
  selectedDate?: Date; // modo controlado
  onSelectDate?: (date: Date) => void;

  events?: CalendarEvent[];
  agendaLimit?: number; // quantos itens mostrar na lista
}

// ----------------- Helper -----------------
function isSameOrAfter(a: Date, b: Date) {
  return compareAsc(a, b) >= 0;
}

// ----------------- Component -----------------
export default function CalendarWithAgenda({
  rollingDays,
  initialMonth,
  selectedDate: selectedProp,
  onSelectDate,
  events = [],
  agendaLimit = 6,
}: CalendarWithAgendaProps) {
  // Atualiza automaticamente à meia-noite para manter a janela rolante correta
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const msToMidnight = endOfDay(now).getTime() - now.getTime() + 1000;
    const t = setTimeout(() => setNow(new Date()), msToMidnight);
    return () => clearTimeout(t);
  }, [now]);

  const isRolling = !!rollingDays && rollingDays > 0;

  // --- Estado/cursores para modo mensal ---
  const [monthCursor, setMonthCursor] = useState<Date>(
    startOfMonth(initialMonth ?? now)
  );
  const [selectedUncontrolled, setSelectedUncontrolled] = useState<Date | null>(
    selectedProp ?? now
  );
  const selected = selectedProp ?? selectedUncontrolled ?? now;

  // --- Cálculo dos dias visíveis ---
  const startMonthGrid = startOfWeek(startOfMonth(monthCursor), {
    weekStartsOn: 1,
  });
  const endMonthGrid = endOfWeek(endOfMonth(monthCursor), { weekStartsOn: 1 });

  const monthDays = useMemo(() => {
    const arr: Date[] = [];
    let d = startMonthGrid;
    while (d <= endMonthGrid) {
      arr.push(d);
      d = addDays(d, 1);
    }
    return arr;
  }, [startMonthGrid, endMonthGrid]);

  const rollingStart = startOfDay(now);
  const rollingLen = Math.max(1, rollingDays ?? 0);
  const rollingEnd = endOfDay(addDays(rollingStart, rollingLen - 1));
  const rollingDaysList = useMemo(
    () =>
      Array.from({ length: rollingLen }, (_, i) => addDays(rollingStart, i)),
    [rollingStart, rollingLen]
  );

  const visibleDays = isRolling ? rollingDaysList : monthDays;

  function handleSelect(day: Date) {
    if (onSelectDate) onSelectDate(day);
    else setSelectedUncontrolled(day);
  }

  function eventsForDay(day: Date): CalendarEvent[] {
    return events.filter((ev) => isSameDay(ev.start, day));
  }

  // Próximos compromissos:
  // - em modo rolling: apenas dentro da janela [rollingStart, rollingEnd]
  // - em modo mensal: a partir do dia selecionado (inclui o próprio dia)
  const upcoming = useMemo(() => {
    let arr = events.slice();
    if (isRolling) {
      arr = arr.filter((ev) =>
        isWithinInterval(ev.start, { start: rollingStart, end: rollingEnd })
      );
    } else {
      const lower = startOfDay(selected);
      arr = arr.filter((ev) => isSameOrAfter(ev.start, lower));
    }
    return arr
      .sort((a, b) => compareAsc(a.start, b.start))
      .slice(0, agendaLimit);
  }, [events, isRolling, rollingStart, rollingEnd, selected, agendaLimit]);

  // ----------------- Render -----------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 col-span-1 md:col-span-2">
      {/* --- Calendário (janela rolante OU mensal) --- */}
      <Card className="rounded-3xl p-4 border border-zinc-200 bg-gradient-to-br from-white to-emerald-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          {isRolling ? (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold">
                Próximos {rollingLen} dias
              </h3>
            </div>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() =>
                  setMonthCursor(addDays(startOfMonth(monthCursor), -1))
                }
                aria-label="Mês anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">
                  {format(monthCursor, "MMMM yyyy", { locale: ptBR })}
                </h3>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() =>
                  setMonthCursor(addDays(endOfMonth(monthCursor), 1))
                }
                aria-label="Próximo mês"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Cabeçalho dos dias */}
        <div
          className="grid text-center text-xs font-medium text-zinc-500 mb-1"
          style={{
            gridTemplateColumns: `repeat(${
              isRolling ? visibleDays.length : 7
            }, minmax(0, 1fr))`,
          }}
        >
          {(isRolling
            ? visibleDays
            : "seg ter qua qui sex sáb dom".split(" ")
          ).map((d, idx) => (
            <div
              key={isRolling ? (d as Date).toISOString() : idx}
              className="py-1 uppercase tracking-wide"
            >
              {isRolling
                ? format(d as Date, "EEE", { locale: ptBR })
                : (d as string)}
            </div>
          ))}
        </div>

        {/* Grade de dias */}
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${
              isRolling ? visibleDays.length : 7
            }, minmax(0, 1fr))`,
          }}
        >
          {(isRolling ? visibleDays : monthDays).map((day) => {
            const inMonth = isRolling ? true : isSameMonth(day, monthCursor);
            const isSel = selected && isSameDay(selected, day);
            const dayEvents = eventsForDay(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleSelect(day)}
                className={[
                  "relative group h-24 rounded-2xl border text-left p-2 transition-colors",
                  inMonth
                    ? "bg-white/70 border-zinc-200 hover:bg-white"
                    : "bg-white/40 border-zinc-100 text-zinc-400",
                  isSel ? "ring-2 ring-emerald-400" : "",
                ].join(" ")}
                aria-label={format(day, "PPPP", { locale: ptBR })}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      "text-sm " + (inMonth ? "text-zinc-800" : "text-zinc-400")
                    }
                  >
                    {format(day, "d", { locale: ptBR })}
                  </span>
                  {isToday(day) && (
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 border-emerald-200">
                      Hoje
                    </Badge>
                  )}
                </div>

                {/* Dots de eventos */}
                {dayEvents.length ? (
                  <div className="absolute left-2 right-2 bottom-2 flex items-center gap-1">
                    {dayEvents.slice(0, 4).map((ev) => (
                      <span
                        key={String(ev.id)}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: ev.color || "#10B981" }}
                        title={ev.title}
                      />
                    ))}
                    {dayEvents.length > 4 && (
                      <span className="text-[10px] text-zinc-500">
                        +{dayEvents.length - 4}
                      </span>
                    )}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </Card>

      {/* --- Agenda (próximos compromissos) --- */}
      <Card className="rounded-3xl p-4 border border-zinc-200 bg-gradient-to-br from-emerald-50/20 via-white to-emerald-100/10">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            {isRolling
              ? `Compromissos até ${format(rollingEnd, "PPP", {
                  locale: ptBR,
                })}`
              : "Próximos compromissos"}
          </h3>
          {!isRolling && (
            <p className="text-xs text-zinc-500">
              A partir de {format(selected, "PPP", { locale: ptBR })}
            </p>
          )}
        </div>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <div
              className="
                w-full h-[200px] relative overflow-hidden
                [--line-gap:28px] [--line-thickness:1px] [--line-color:rgba(13, 241, 165, 0.452)
                [background-image:repeating-linear-gradient(to_bottom,_var(--line-color)_0,_var(--line-color)_var(--line-thickness),_transparent_var(--line-thickness),_transparent_var(--line-gap))]
                [background-size:100%_var(--line-gap)] bg-repeat-y
              "
            >
              <div className="text-sm pt-1 text-zinc-500">
                Sem eventos nesse período.
              </div>
            </div>
          ) : (
            upcoming.map((ev) => (
              <motion.div
                key={String(ev.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Notepad lines */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(63,63,70,0.08) 0px, rgba(63,63,70,0.08) 1px, transparent 1px, transparent 26px)",
                  }}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900 truncate">
                      {ev.title}
                    </div>
                    {ev.description && (
                      <div className="text-xs text-zinc-600 mt-0.5 truncate">
                        {ev.description}
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {format(ev.start, "PPp", { locale: ptBR })}
                      </span>
                      {ev.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {ev.color && (
                  <div
                    className="relative z-10 mt-3 h-1 rounded-full"
                    style={{ backgroundColor: ev.color }}
                  />
                )}
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

// ----------------- Exemplo de uso -----------------
// <CalendarWithAgenda rollingDays={7} events={meusEventos} />
