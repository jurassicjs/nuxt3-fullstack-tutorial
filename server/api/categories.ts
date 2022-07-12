
export default (name: string) => {
  const rowSize = 2


  const categories = [
    {
      title: 'Nuxt 3',
      message: 'Nuxt 3 for beginners course',
      image: '/img/nuxt3.svg',
      link: '/categories/nuxt3',
      lessonQuantity: 1,
      tags: [{title: 'Front End', link: '/frontend-courses'}]
    },
    {
      title: 'Laravel',
      message: 'Laravel For beginners course',
      image: '/img/laravel.svg',
      link: '/categories/laravel',
      lessonQuantity: 2,
      tags: [{title: 'Bank End', link: '/backend-courses'}]
    },
    {
      title: 'PHP',
      message: 'Ultimate PHP Course',
      image: '/img/php-logo.svg',
      link: '/categories/php',
      lessonQuantity: 2,
      tags: [{title: 'Bank End', link: '/backend-courses'}]
    },
    {
      title: 'Nginx',
      message: 'Nginx Course for Beginners',
      image: '/img/nginx.svg',
      link: '/categories/nginx',
      lessonQuantity: 0,
      tags: [{title: 'Servers', link: '/server-courses'}]
    },
    {
      title: 'Docker',
      message: 'Docker Course for Beginners',
      image: '/img/docker.svg',
      link: '/categories/docker',
      tags: [{title: 'containerization', link: '/containerization-courses'}]
    },
    {
      title: 'Linux',
      message: 'Linux Course for Beginners',
      image: '/img/linux.svg',
      link: '/categories/linux',
      tags: [{title: 'OS', link: '/os-courses'}]
    }
  ]


  let row = [];
  let i, l, chunkSize = rowSize;

  for (i = 0, l = categories.length; i < l; i += chunkSize) {
    row.push(categories.slice(i, i + chunkSize));
  }
  return row;
}

