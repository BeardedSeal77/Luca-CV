import { About } from "@/components/site/about"
import { Education } from "@/components/site/education"
import { Experience } from "@/components/site/experience"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { Navbar, type NavSection } from "@/components/site/navbar"
import { Projects } from "@/components/site/projects"
import { Skills } from "@/components/site/skills"
import {
  getAbout,
  getCertifications,
  getEducation,
  getExperience,
  getProjects,
  getSite,
  getSkills,
} from "@/lib/content"
import { withBasePath } from "@/lib/paths"

const ALL_NAV_SECTIONS: NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export default async function Page() {
  const [
    site,
    about,
    experience,
    projects,
    skills,
    education,
    certifications,
  ] = await Promise.all([
    getSite(),
    getAbout(),
    getExperience(),
    getProjects(),
    getSkills(),
    getEducation(),
    getCertifications(),
  ])

  const cvHref = withBasePath(site.cvPdf)

  const navSections = ALL_NAV_SECTIONS

  return (
    <>
      <Navbar name={site.name} cvHref={cvHref} sections={navSections} />
      <main>
        <Hero site={site} cvHref={cvHref} />
        <About about={about} />
        <Experience entries={experience} />
        <Projects projects={projects} />
        <Skills groups={skills} />
        <Education entries={education} certifications={certifications} />
      </main>
      <Footer site={site} cvHref={cvHref} />
    </>
  )
}
