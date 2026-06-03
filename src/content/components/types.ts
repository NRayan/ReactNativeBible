export type ComponentTag = "interaction" | "navigation" | "layout" | "feedback"

export type ComponentProp = {
  name: string
  type: string
  required: boolean
  description: string
  options?: string[]
}

export type ComponentGotcha = {
  label: string
  description: string
}

export type RNComponent = {
  id: string
  name: string
  tag: ComponentTag
  description: string
  previewComponent: React.ReactNode
  props: ComponentProp[]
  gotchas: ComponentGotcha[]
  codeSnippet: string
}
