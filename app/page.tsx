import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { WhoItsFor } from '@/components/sections/WhoItsFor'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { RulesTable } from '@/components/sections/RulesTable'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Problem />
      <WhoItsFor />
      <HowItWorks />
      <Features />
      <RulesTable />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
