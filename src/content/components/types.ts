import { ComponentTag } from "@features/components/constants";
import en from "../../i18n/content/en/components.json";

type NestedKeyOf<T, K extends string = ""> = {
  [P in keyof T & string]: T[P] extends object
    ? NestedKeyOf<T[P], K extends "" ? P : `${K}.${P}`>
    : K extends "" ? P : `${K}.${P}`
}[keyof T & string]

type ComponentContentKey = `content.${NestedKeyOf<typeof en>}`

export type ComponentProp = {
  name: string
  type: string
  required: boolean
  description: ComponentContentKey
}

export type RNComponent = {
  id: string
  name: string
  tag: ComponentTag
  subtitle: ComponentContentKey
  description: ComponentContentKey
  previewComponent: (props: { focused: boolean })=> React.ReactElement
  props: ComponentProp[]
  gotchas: ComponentContentKey[]
  codeSnippet: string
}
