import r from '../utils/request'
const origin = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'http://139.199.98.207'
const baseUrl = `${origin}:9101/article`

export default {
  save: r.post('save', baseUrl),
  list: r.get('list', baseUrl),
  login: r.post('login', baseUrl),
  signUp: r.post('signUp', baseUrl),
  checkLogin: r.get('selfCheck', baseUrl),
  delArticle: r.post('delete', baseUrl),
  authority: r.get('authority', baseUrl),
}