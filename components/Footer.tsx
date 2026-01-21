import { SITE_CONFIG } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg text-neutral-800">Vouch</span>
          <span className="text-neutral-300">·</span>
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-neutral-500 hover:text-brand transition-colors"
          >
            Twitter
          </a>
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-neutral-500 hover:text-brand transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
