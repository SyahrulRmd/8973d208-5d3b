interface TypeWrapper<T> {
  attributes: T
  id: string
  type: string
  links: {
    self: string
  }
}
