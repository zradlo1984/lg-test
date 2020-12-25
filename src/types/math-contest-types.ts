export interface MathTestMul {
    type: 'math-test-mul',
    p1: number,
    p2: number
}

export interface MathTestDiv {
    type: 'math-test-div',
    p1: number,
    p2: number
}

export type MathContest = MathTestMul|MathTestDiv
