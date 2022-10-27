import { Series, Topic, Video } from "@prisma/client";
import prisma from "~/server/database/client";


export async function getTopics(): Promise<Topic[]> {
 return await prisma.topic.findMany()
}

export async function getSeriesByTopicId(topicId: number): Promise<Series[]> {
 return await prisma.series.findMany({
  where: {
   topicId: {
    equals: topicId
   }
  }
 })
}

export async function getVideosBySeriesId(seriesId: number): Promise<Video[]> {
 return await prisma.video.findMany({
  where: {
   seriesId: {
    equals: seriesId
   }
  }
 })
}

export async function getVideosByTopicId(topicId: number): Promise<Video[]> {
 return await prisma.video.findMany({
  where: {
   topicId: {
    equals: topicId
   }
  }
 })
}

export async function getTopicIdByName(topicName: string): Promise<Topic> {
 const res = await prisma.topic.findFirst(
  {
   where: {
    name: {
     equals: topicName
    }
   }
  })

 return res
}