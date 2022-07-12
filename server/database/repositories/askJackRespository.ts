import prisma from "~/server/database/client";

export async function createQuestion(data: IQuestionPost, authorId: number) {
  return await prisma.question.create({
    data: {
      authorId: authorId,
      title: data.title,
      description: data.description
    }
  })
}

export async function findQuestion(id: number): Promise<IQuestion> {
  return await prisma.question.findUnique({
    where: {
      id: id,
    },
    include: {
      answers: true,
    },
  })
}

export async function createAnswer(data: IAnswerPost, authorId: number) {
  return await prisma.answer.create({
    data: {
      authorId: authorId,
      questionId: data.questionId,
      text: data.text,

    }
  })
}

export async function searchQuestions(query: string) {
  return await prisma.question.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
          }
        },
        {
          description: {
            contains: query
          }
        },
      ],
    },
  })
}


export async function editQuestion(question: IQuestionPost) {
  return await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      title: question.title,
      description: question.description,
    },
  })

} export async function deleteQuestion(questionId: number) {
  return await prisma.question.delete({
    where: {
      id: questionId,
    }
  })
} 