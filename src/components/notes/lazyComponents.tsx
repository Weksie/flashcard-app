// Lazy-loaded content components for better performance
import React, { lazy, Suspense } from 'react'

// Loading fallback component
const ContentLoadingFallback: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-8 bg-slate-800/50 rounded-xl" />
    <div className="h-4 bg-slate-800/50 rounded w-3/4" />
    <div className="h-4 bg-slate-800/50 rounded w-1/2" />
    <div className="h-32 bg-slate-800/50 rounded-xl" />
    <div className="h-32 bg-slate-800/50 rounded-xl" />
  </div>
)

// Lazy load each content component
export const HTUdlaegningContent = lazy(() =>
  import('./HTUdlaegningContent').then(m => ({ default: m.HTUdlægningContent }))
)

export const BCUdlægningContent = lazy(() =>
  import('./BCUdlægningContent').then(m => ({ default: m.BCUdlægningContent }))
)

export const BrandventilationContent = lazy(() =>
  import('./BrandventilationContent').then(m => ({ default: m.BrandventilationContent }))
)

export const CAFSContent = lazy(() =>
  import('./CAFSContent').then(m => ({ default: m.CAFSContent }))
)

export const BESSContent = lazy(() =>
  import('./BESSContent').then(m => ({ default: m.BESSContent }))
)

export const SkumUdlaegningContent = lazy(() =>
  import('./SkumUdlaegningContent').then(m => ({ default: m.SkumUdlaegningContent }))
)

export const StigroerUdlaegningContent = lazy(() =>
  import('./StigroerUdlaegningContent').then(m => ({ default: m.StigroerUdlaegningContent }))
)

// Suspense wrapper for lazy components
export const NoteContentSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<ContentLoadingFallback />}>
    {children}
  </Suspense>
)

// Map note IDs to lazy components
export const NOTE_CONTENT_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC>> = {
  'ht-udlaegning': HTUdlaegningContent,
  'bc-udlaegning': BCUdlægningContent,
  'brandventilation': BrandventilationContent,
  'cafs': CAFSContent,
  'bess': BESSContent,
  'skum-udlaegning': SkumUdlaegningContent,
  'stigroer-udlaegning': StigroerUdlaegningContent,
}



