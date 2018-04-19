import axios from 'axios'
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export default {
  matchApi (nickname) {
    return fetch('/api/v1/match', nickname)
  }
} 
 