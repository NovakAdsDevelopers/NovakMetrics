import { Award, Boxes, Goal } from "lucide-react";
import { ChartBarMixed } from "./chart";
import { ChartBarInteractive } from "./chart-geral";
import { ChartAreaGradient } from "./chart-line";
import EmployeeOverviewCard from "./EmployeeCard";
import CalendarWithAgenda from "./schedle";
import Header from "../components/Header";
import { CardEmployee } from "../components/card-employee";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <div className="w-full px-36">
        <h1 className="text-3xl font-bold text-left mt-5">
          Welcome Back, <span className="text-green-500">Eduardo Ramos</span>
        </h1>
        <p className="text-left mt-4 text-gray-600">
          Welcome to the dashboard! Here you can find an overview of your
          application.
        </p>
      </div>

      {/* grid responsiva: 1 col no mobile, 4 col no md+ */}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-2 px-36 mt-8">
        <CardEmployee />

        {/* >>> Meta Geral ocupando 2 colunas no md+ <<< */}
        <div className="rounded-4xl border border-gray-300 overflow-hidden py-4 md:col-span-2">
          <div className="border-b-2 px-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Goal color="#00c951" />
              <span>Meta Geral</span>
            </div>
            <button className="cursor-pointer border-2 px-3 py-1 text-xs bg-emerald-100 text-emerald-700 border-emerald-200 rounded-md hover:bg-emerald-500 hover:text-white transition-colors">
              Ver Mais
            </button>
          </div>
          <div>
            <ChartBarInteractive />
          </div>
        </div>

        <div className="rounded-4xl border border-gray-300 overflow-hidden py-4">
          <div className="border-b-2 px-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Boxes color="#00c951" />
              <span>Meta Setor</span>
            </div>
            <button className="cursor-pointer border-2 px-3 py-1 text-xs bg-emerald-100 text-emerald-700 border-emerald-200 rounded-md hover:bg-emerald-500 hover:text-white transition-colors">
              Ver Mais
            </button>
          </div>

          <div>
            <ChartAreaGradient />
          </div>
        </div>

        <div className="rounded-4xl border border-gray-300 overflow-hidden py-4">
          <div className="border-b-2 px-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award color="#00c951" />
              <span>Meta Individual</span>
            </div>
            <button className="cursor-pointer border-2 px-3 py-1 text-xs bg-emerald-100 text-emerald-700 border-emerald-200 rounded-md hover:bg-emerald-500 hover:text-white transition-colors">
              Ver Mais
            </button>
          </div>
          <div>
            <ChartBarMixed />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 px-36 mt-4 pb-16">
        <EmployeeOverviewCard />
        <CalendarWithAgenda rollingDays={7} />
      </div>
    </>
  );
}
