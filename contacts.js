const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'richard',
      name: 'Richard Kalehoff',
      handle: '@richardkalehoff',
      avatarURL: config.origin + '/city.jpg'
    },
    {
      id: 'karen',
      name: 'Karen Isgrigg',
      handle: '@karen_isgrigg',
      avatarURL: config.origin + '/trees.jpg'
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      handle: '@tylermcginnis',
      avatarURL: config.origin + '/tyler.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
