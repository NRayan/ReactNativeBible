import { TablerIconName } from "@components/Icon";
import en from "../../i18n/content/en/learn.json";

type NestedKeyOf<T, K extends string = ""> = {
  [P in keyof T & string]: T[P] extends object
    ? NestedKeyOf<T[P], K extends "" ? P : `${K}.${P}`>
    : K extends "" ? P : `${K}.${P}`
}[keyof T & string]

export type LearnContentKey = `content.${NestedKeyOf<typeof en>}`

export type ContentBlock =
    { type: "heading"; value: LearnContentKey }
  | { type: "text"; value: LearnContentKey }
  | { type: "code"; language: string; value: string }
  | { type: "image"; uri: string; caption?: string }

export type Section = {
  id: string
  icon: TablerIconName,
  title: LearnContentKey
  topics: Topic[]
}

export type Topic = {
  id: string
  icon: TablerIconName,
  title: LearnContentKey
  subtitle: LearnContentKey
  body: ContentBlock[]
}