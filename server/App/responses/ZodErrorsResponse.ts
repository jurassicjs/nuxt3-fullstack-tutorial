import { H3Event } from "h3"
import { getMappedZodErrors } from "~/server/helpers/errorMapper"

export default async function sendZodErrorRespon(event: H3Event, errorData: any) {
    const parsedErrors = getMappedZodErrors(errorData)
    return sendError(event, createError({ statusCode: 422, statusMessage: 'Invalid Data Provided', data: parsedErrors }))
}
