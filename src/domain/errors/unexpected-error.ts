export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado acconteceu, tente novamente')
    this.name = 'UnexpetedError'
  }
}
