import type { ReactNode } from 'react';

export default function MainWrapper ({ children }: { children: ReactNode }) {
  return (
    <div 
      className="flex flex-col h-[100%] px-4 py-2 gap-4 bg-[var(--background-color)]"
    >
      {children}
    </div>
  )
}