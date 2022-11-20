import { getTopicIdByName, getSeriesByTopicId, getVideosByTopicId } from "~~/server/database/repositories/videoRepository"

export default eventHandler(async event => {
  const topicName = event.context.params.name

  const topic = await getTopicIdByName(topicName)

  const series = await getSeriesByTopicId(topic.id)
  const videos =  await getVideosByTopicId(topic.id)

  if(topic.id == 2) {
    videos.reverse()
  }

  return { series, videos, topic }
})