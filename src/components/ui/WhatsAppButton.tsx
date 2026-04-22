import { WHATSAPP_URL } from '../../config'

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea con nosotros por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chatea con nosotros
        </span>

        {/* Button */}
        <div className="w-14 h-14 bg-[#25D366] hover:bg-[#1EBE57] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 transition-all hover:scale-110">
          {/* WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.469-2.001A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.779-1.854l-.486-.288-5.027 1.187 1.212-4.895-.318-.502A13.227 13.227 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.162-2.719-1.295-.365-.133-.631-.199-.897.199-.265.398-1.03 1.295-1.262 1.561-.232.265-.465.298-.863.1-.398-.2-1.681-.619-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.897-2.163-1.229-2.96-.324-.778-.653-.673-.897-.685-.232-.011-.497-.014-.763-.014-.265 0-.696.1-.1.497C7.9 9.7 7.7 11.663 9.163 13.595c1.463 1.932 2.827 3.197 4.692 4.093 1.132.537 2.017.858 2.706 1.099.538.174 1.028.15 1.415.091.432-.065 1.33-.543 1.518-1.068.187-.524.187-.975.132-1.069-.055-.093-.22-.149-.467-.248z" />
          </svg>
        </div>

        {/* Ping animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </div>
    </a>
  )
}
