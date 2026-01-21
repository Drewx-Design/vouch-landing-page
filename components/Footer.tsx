import { SITE_CONFIG } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Vouch. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-600"
          >
            Twitter
          </a>
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-600"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
