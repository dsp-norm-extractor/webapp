export type Act = {
  act: string
  actor: string
  action: string
  object: string
  recipient: string
  preconditions: {
    expression: string
    operand: boolean
  }
  create: string[]
  terminate: string[]
  sources: string[]
  explanation: string
}

export type Fact = {
  fact: string
  function: string[]
  sources: string[]
  explanation: string
}

export type Duty = {
  duty: string
  dutyHolder: string
  claimant: string
  terminatingAct: string[]
  creatingAct: string[]
  enforcingAct: string
  sources: string[]
}

export type RuleDetailsProps = {
  title: string
  frames: {
    acts?: Act[]
    facts?: Fact[]
    duties?: Duty[]
  }
}
