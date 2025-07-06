interface TypeWrapper<T> {
  attributes: T
  id: string
  type: string
  links: {
    self: string
  }
  relationships: {
    [key: string]: {
      data: {
        id: string
        type: string
      }
    }
  }
}
