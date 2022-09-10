import { CompatibilityEvent, defineEventHandler } from "h3";
import { searchQuestions } from "~/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event: CompatibilityEvent) => {
    const queries = useQuery(event)

    return await searchQuestions(queries.search as string)
})