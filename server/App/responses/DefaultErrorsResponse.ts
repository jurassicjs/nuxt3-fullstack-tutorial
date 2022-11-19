import { H3Event } from "h3"
import { getMappedError } from "~/server/helpers/errorMapper"

export default async function sendDefaultErrorResponse(event: H3Event, erroType: string, error: any) {
    const parsedErrors = getMappedError(erroType, error)
    return sendError(event, createError({ statusCode: 422, statusMessage: 'Invalid Data Provided', data: parsedErrors }))
}
