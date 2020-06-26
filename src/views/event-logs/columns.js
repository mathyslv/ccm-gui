import dayjs from 'dayjs'

export default [
  {
    title: 'id',
    key: 'id',
    sort: 'desc',
    base: true
  },
  {
    title: 'date',
    key: 'formattedDate',
    active: false,
    sort: 'desc',
    f: (e1, e2) => {
      return dayjs(e1.date).isAfter(dayjs(e2.date)) ? 1 : -1
    }
  },
  {
    title: 'emitter',
    key: 'emitter',
    active: false,
    sort: 'desc',
    isFilter: true,
    noTextTransform: true
  },
  {
    title: 'type',
    key: 'type',
    active: false,
    sort: 'desc',
    isFilter: true,
    buttonColorFn: 'typeButtonColor'
  },
  {
    title: 'category',
    key: 'category',
    active: false,
    isFilter: true,
    sort: 'desc'
  },
  {
    title: 'target',
    key: 'target',
    isFilter: true,
    active: false,
    noTextTransform: true,
    sort: 'desc'
  },
  {
    title: 'meta',
    key: 'meta',
    active: false,
    sort: 'desc'
  }
]
