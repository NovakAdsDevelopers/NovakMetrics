import Header from "../components/Header";
import ParallaxBackground from "../components/parralax";
import ParallaxFullScreen from "../components/parralax";
import GridOverview from "./Metrics";
import NovakTeam from '../assets/novak-team.jpg'

export default function Achivements() {
  return (
    <>
      <ParallaxBackground
        heightVh={100} // quanto de rolagem você quer (opcional)
        overlay="bg-emerald-900/20" // opcional; remova se não quiser escurecer
        layers={[
          {
            type: "image",
            src: NovakTeam,
            speed: 0.22,
            className: "opacity-85",
          },
        ]}
      />

      <div className="bg-white h-screen">
        <Header />

        <div className="w-full px-36 pb-5">
          <h1 className="text-3xl font-bold mt-5 text-center">
            Meta <span className="text-green-500">Geral</span>
          </h1>
          <p className="mt-4 text-gray-600 text-center">
            Acompanhe os resultados da Novak em tempo real — gráficos,
            relatórios e evolução por período, tudo em um só lugar.
          </p>
        </div>
        <GridOverview
          metricsCols={[
            [
              {
                title: "Crescimento Mês",
                value: "22%",
                sublabel: "SLA 5 min",
                delta: "+3.1%",
              },
              {
                title: "Tempo de Resposta",
                value: "1m 58s",
                sublabel: "SLA 5 min",
                delta: "-16s",
              },
            ],
            [
              {
                title: "Leads Qualificados",
                value: "1.046",
                sublabel: "últimos 7 dias",
                delta: "+6.2%",
              },
              {
                title: "CTR",
                value: "4,1%",
                sublabel: "média geral",
                delta: "+0,3pp",
              },
            ],
            [
              {
                title: "Receita",
                value: "R$ 910k",
                sublabel: "Mtd",
                delta: "+9%",
              },
              {
                title: "CAC",
                value: "R$ 118",
                sublabel: "média 30d",
                delta: "-R$ 6",
              },
            ],
          ]}
        />
      </div>
    </>
  );
}
