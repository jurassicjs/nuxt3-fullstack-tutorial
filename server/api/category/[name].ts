export default defineEventHandler(event => {
  const categoryName = event.context.params.name

  const rowSize = 2
  const lessons = getLessons(categoryName)

  let row = [];
  let i, l, chunkSize = rowSize;

  for (i = 0, l = lessons.length; i < l; i += chunkSize) {
    row.push(lessons.slice(i, i + chunkSize));
  }
  return row;
})

function getLessons(categoryName: string){
  if (categoryName == 'nuxt3'){
    return getNuxtLessons()
  }
  if (categoryName == 'laravel') {
    return getLaravelLessons()
  }
  if (categoryName == 'php') {
    return getPhpLessons()
  }
}

function getNuxtLessons() {
  return [
    {
      title: 'Nuxt 3 Hands On',
      message: 'Nuxt 3 for beginners course',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt3-hands-on',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Routing in Nuxt 3',
      message: 'learn Nuxt 3 routing from beginner to advanced!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Templates in Nuxt 3',
      message: 'learn Nuxt 3 templates!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },

    {
      title: 'Reativity Fundementals in Nuxt 3',
      message: 'learn Nuxt 3 Reativity!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Composeables in Nuxt 3',
      message: 'learn Nuxt 3 composeables!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Computed Properties in Nuxt 3',
      message: 'learn Nuxt 3 computed properties!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Class Style and Bindings in Nuxt 3',
      message: 'learn Nuxt 3 Class Style and Bindings!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'List Rendering in Nuxt 3',
      message: 'learn Nuxt 3 List Rendering!',
      image: '/img/nuxt3.svg',
      link: '/lesson/nuxt-routing',
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
  ]
}

function getLaravelLessons() {
  return [
    {
      title: 'Fast DDD In Laravel',
      message: 'Nuxt 3 for beginners course',
      image: '/img/laravel.svg',
      link: '/lesson/fast-ddd-laravel',
      tags: [{title: 'Api', link: '/frontend-courses'}]
    }
  ]
}

function getPhpLessons() {
  return [
    {
      title: 'TDD in PHP for Beginners',
      message: 'A hands on tutorial where I show you how to use php unit',
      image: '/img/phpunit.svg',
      link: '/lesson/phpunit',
      tags: [{title: 'Php Unit', link: '/frontend-courses'}, {title: 'Testing', link: '/frontend-courses'}]
    }
  ]
}
