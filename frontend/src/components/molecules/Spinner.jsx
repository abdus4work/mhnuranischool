import { Loader2 } from 'lucide-react'

export const Spinner = () => {
  const isDarkMode = localStorage.getItem('theme') === 'dark'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? 'bg-[#020618]/40' : 'bg-white/40'
      } backdrop-blur-sm`}>
      <Loader2 className="animate-spin h-24 w-24 text-[var(--brand)]" />
    </div>
  )
}
