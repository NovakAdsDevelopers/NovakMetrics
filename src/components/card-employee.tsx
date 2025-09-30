export function CardEmployee() {
  return (
    <div className="relative rounded-4xl border border-gray-300 overflow-hidden">
      {/* Fundo (cover) */}
      <img
        src="https://avatars.githubusercontent.com/u/57899212?v=4"
        alt="avatar"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Camada de blur/gradiente (sem texto aqui) */}
      <div
        className="
              absolute inset-x-0 bottom-0 h-26
              backdrop-blur-4xl
              bg-gradient-to-t from-black/90 via-black/100 to-transparent
              pointer-events-none
            "
        style={{
          WebkitMaskImage: "linear-gradient(to top, white, transparent)",
          maskImage: "linear-gradient(to top, white, transparent)",
        }}
      />

      {/* Texto separado acima do blur */}
      <div className="absolute inset-x-0 bottom-0 h-36 flex items-end p-5 z-10">
        <span className="text-white font-semibold text-lg py-3 leading-tight drop-shadow-lg">
          Desenvolvedor Full-Stack
        </span>
      </div>
    </div>
  );
}
