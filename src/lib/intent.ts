import Patd from './patd'
import GameObject from './game_object'

export default class Intent extends GameObject {
  get verbs(): string[] { return [] }
  get prepositions(): string[] { return [] }

  perform(tokens: any[]) {}

  parse(tokens: any): any {
    let directObject = null
    let target: any = null
    let preposition = null
    let prepositionSeen = false

    tokens.forEach((token: any) => {
      if (token.entityType == 'preposition') {
        prepositionSeen = true
        preposition = token.uid

        return
      }

      if (token.entityType == 'item') {
        if (prepositionSeen && target == null) {
          target = Patd.shared().findItem(token.uid)

          return
        }

        directObject = Patd.shared().findItem(token.uid)

        return
      }
    })

    return {
      item: directObject,
      preposition: prepositionSeen ? preposition: null,
      target: target
    }
  }
}
