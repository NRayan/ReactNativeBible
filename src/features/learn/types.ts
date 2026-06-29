import { TablerIconName } from "@components/Icon";
import { CodeLanguage } from "@components/CodeBlock/types";
import en from "../../i18n/content/en/learn.json";
import enQuiz from "../../i18n/content/en/quiz.json";

type NestedKeyOf<T, K extends string = ""> = {
  [P in keyof T & string]: T[P] extends object
    ? NestedKeyOf<T[P], K extends "" ? P : `${K}.${P}`>
    : K extends "" ? P : `${K}.${P}`
}[keyof T & string]

export type LearnContentKey = `content.${NestedKeyOf<typeof en>}`

export type ContentBlock =
    { type: "heading"; value: LearnContentKey }
  | { type: "text"; value: LearnContentKey }
  | { type: "code"; language: CodeLanguage; value: string }
  | { type: "image"; imagePath: number; caption: LearnContentKey }

export type SectionId =
  | "under_the_hood"
  | "layout"
  | "performance"
  | "debugging"
  | "accessibility"
  | "android"
  | "ios"
  | "publishing"

export type Section = {
  id: SectionId
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

export type QuizContentKey = `content.${NestedKeyOf<typeof enQuiz>}`

export type QuizOption = {
  label: QuizContentKey
  isCorrect: boolean
}

export type QuizQuestion = {
  id: string
  question: QuizContentKey
  explanation: QuizContentKey
  options: QuizOption[]
}

export type SectionQuiz = {
  sectionId: SectionId
  questions: QuizQuestion[]
}
