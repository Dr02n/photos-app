/* global describe, it, before, after, beforeEach */

process.env.MONGOOSE_DEBUG = false

const should = require('chai').should()
const axios = require('axios').create()
const fs = require('fs-extra')
const FormData = require('form-data')
const server = require('../app')
const User = require('../models/User')
const Album = require('../models/Album')
const Photo = require('../models/Photo')

let album

axios.defaults.baseURL = `http://localhost:${process.env.PORT}`

const postFiles = (url, ...fields) => {
  const form = new FormData()
  fields.forEach(args => {
    form.append(...args)
  })
  return axios.post(url, form, { headers: form.getHeaders() })
}

describe('Photos', () => {
  before(done => {
    const callback = async() => {
      await User.remove()
      await Album.remove()

      // Create & authorize user
      const { data: { token } } = await axios.post('/api/auth/signup', {
        email: 'test@email.com',
        password: '123'
      })

      axios.defaults.headers.Authorization = token

      // Create album for all tests
      const res = await axios.post('/api/albums', { name: 'Test Album' })
      album = res.data

      done()
    }

    server.listening ? callback() : server.on('listening', callback)
  })

  after(done => {
    server.close(done)
  })

  beforeEach(async() => {
    await Photo.remove()
    fs.emptyDirSync('public/uploads')
  })

  it('can create album and add photos', async() => {
    const { status, data } = await postFiles(
      `/api/albums/${album._id}/photos`,
      ['photo', fs.createReadStream('test/fixtures/photo.jpg')]
    )

    status.should.be.equal(200)
    data.should.include.all.keys('_id', 'author', 'album', 'path', 'size')
    should.exist(await Photo.findById(data._id))

    const path = 'public' + data.path

    fs.existsSync(path).should.be.equal(true)
    fs.statSync(path).size.should.be.equal(+data.size)
  })

  it('can update photo', async() => {
    const { data: photo } = await postFiles(
      `/api/albums/${album._id}/photos`,
      ['photo', fs.createReadStream('test/fixtures/photo.jpg')]
    )

    const newPhotoName = 'Test Photo Updated'

    const { data: {name} } = await axios.patch(`/api/photos/${photo._id}`, {
      name: newPhotoName
    })

    should.equal(name, newPhotoName)
    should.equal((await Photo.findById(photo._id)).name, newPhotoName)
  })

  it('can delete photo', async() => {
    const { data: photo } = await postFiles(
      `/api/albums/${album._id}/photos`,
      ['photo', fs.createReadStream('test/fixtures/photo.jpg')]
    )

    await axios.delete(`/api/photos/${photo._id}`)

    should.not.exist(await Photo.findById(photo._id))
    fs.existsSync('public' + photo.path).should.be.equal(false)
  })

  it('can recieve photos by album', async() => {
    await postFiles(
      `/api/albums/${album._id}/photos`,
      ['photo', fs.createReadStream('test/fixtures/photo.jpg')]
    )

    await postFiles(
      `/api/albums/${album._id}/photos`,
      ['photo', fs.createReadStream('test/fixtures/photo2.jpg')]
    )

    const {data: photos} = await axios.get(`/api/albums/${album._id}/photos`)

    photos.length.should.be.equal(2)
    photos.forEach(photo => { photo.album._id.should.be.equal(album._id) })
  })
})
