export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-gray-300 px-36 py-4">
      <div className="flex items-center gap-2">
        <img
          className="w-12"
          src="https://whitelist-rosy.vercel.app/media/images/new/logo.png"
          alt=""
        />
        <span className="text-2xl">
          Novak<span className="text-green-500">Metrics</span>
        </span>
      </div>
      <div className="flex justify-center">
        <ul className="flex gap-4">
          <li>Marketing</li>
          <li>T.I</li>
          <li>Comercial</li>
          <li>Financeiro</li>
          <li>Recursos humanos</li>
        </ul>
      </div>
    </header>
  );
}
