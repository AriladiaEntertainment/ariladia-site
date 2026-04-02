import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { OpportunitySection } from "@/components/opportunity-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { SubmitForm } from "@/components/submit-form"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <OpportunitySection />
      <GuaranteeSection />
      <SubmitForm />
      <Footer />
    </main>
  )
}
