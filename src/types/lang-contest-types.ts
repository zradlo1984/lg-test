// export interface DicTestMatch {
//     type: 'lang-dic-match',
//     choices: string[],
//     rchoices: string[],
// }
//
// export interface DicTestChoicesAll {
//     type: 'lang-dic-choices-all',
//     choices: string[],
//     rchoices: string[],
// }
//
// export interface DicTestChoices {
//     type: 'lang-dic-choices',
//     answer: string,
//     choices: string[],
// }

export interface ContestDictionaryWord {
    type: 'ContestDictionaryWord',
    question: string,
    answer: string|string[],
    choices?: string[]
}

// export interface Phrase {
//     type: 'lang-phrase',
//     question: string,
//     answer: string[],
//     choices?: string[]
// }

export type LanguageContest =
    ContestDictionaryWord
// |DicTestChoicesAll
// |DicTestChoices
// |DicTestMatch
// |Phrase

