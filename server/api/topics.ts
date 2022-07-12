import { getTopics } from "~/server/database/repositories/videoRepository"

export default defineEventHandler(async () => {
 const topics = await getTopics()
 const rowSize = 2
 let row = [];
 let i, l, chunkSize = rowSize;

 for (i = 0, l = topics.length; i < l; i += chunkSize) {
  row.push(topics.slice(i, i + chunkSize));
 }
 return row;
})