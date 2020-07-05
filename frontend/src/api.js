import axios from 'axios';

export const login = (data) => {
  return axios.post('/api/login', data, {
    headers: {
      'content-type': 'application/json'
    }
  });
}

export class ItemsService {
  constructor({getToken}) {
    this.getToken = getToken;
    this.client = axios.create();
  }
  list() {
    return this.client.get('/api/items', {
      headers: {
        'authorization': `Bearer ${this.getToken()}`
      }
    });
  }
  add(data) {
    return this.client.post('/api/items', data, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.getToken()}`
      }
    });
  }
  delete(id) {
    return this.client.delete(`/api/items/${id}`, {
      headers: {
        'authorization': `Bearer ${this.getToken()}`
      }
    });
  }
}
