import { ComponentTag } from "@features/components/constants";

export type ComponentProp = {
  name: string
  type: string
  required: boolean
  description: string
}

export type RNComponent = {
  id: string
  name: string
  tag: ComponentTag
  subtitle: string
  description: string
  previewComponent: React.ReactNode
  props: ComponentProp[]
  gotchas: string[]
  codeSnippet: string
}
