export function getMappedZodErrors(zodError: any) {
  const errors = new Map<string, { message: string }>()
  JSON.parse(zodError).forEach((zodError: any) => {
    errors.set(zodError.path[0], { 'message': zodError.message })
  })
  return JSON.stringify(Object.fromEntries(errors))
}

export function getMappedError(errorType: string, message: string) {
  const errors = new Map<string, { message: string }>()
  errors.set(errorType, { 'message': message })
  return JSON.stringify(Object.fromEntries(errors))
}