import { Series, Video } from ".prisma/client";

export  type TopicData = {
    series: Series[]
    videos: Video[]
}