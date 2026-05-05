export type ProjectStatus = 'live' | 'wip' | 'concept'

export interface Project {
  id: string
  title: string
  description: string
  icon: string
  stack: string[]
  features: string[]
  tags: string[]
  link?: string
  linkLabel?: string
  demoLink?: string
  demoLabel?: string
  status: ProjectStatus
  featured?: boolean
}
