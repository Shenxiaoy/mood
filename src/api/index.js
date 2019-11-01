import r from '../utils/request'
const baseUrl = 'http://localhost:9101/article'
export default {
  save: r.post('save', baseUrl),
  list: r.get('list', baseUrl),
  login: r.post('login', baseUrl),
  checkLogin: r.get('selfCheck', baseUrl),
}