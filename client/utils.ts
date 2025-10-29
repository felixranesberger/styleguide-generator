function* idGenerator(prefix: string = 'id', start: number = 0): Generator<string> {
  let counter = start
  while (true) {
    yield `${prefix}-${counter++}`
  }
}

export const id = idGenerator()

export const sectionSanitizeId = (id: string) => id.toLowerCase().replaceAll('.', '-')
