export default (errorData: string) => {
    const parsedErrors = JSON.parse(errorData)
    const errorMap = new Map<string, { message: InputValidation; }>(Object.entries(parsedErrors))
    return { hasErrors: true, errors: errorMap }
}