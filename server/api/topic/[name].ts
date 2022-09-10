import { getTopicIdByName, getSeriesByTopicId, getVideosByTopicId } from "~~/server/database/repositories/videoRepository"

export default defineEventHandler(async event => {
  const topicName = event.context.params.name

  const topicId = await getTopicIdByName(topicName)

  const series = await getSeriesByTopicId(topicId)
  const videos = await getVideosByTopicId(topicId)

  return { series, videos }

})