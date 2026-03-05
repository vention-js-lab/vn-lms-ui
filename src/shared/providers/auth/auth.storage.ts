export class LOCAL_STORAGE {
  static SET_ACCESS_TOKEN(token: string | null) {
    localStorage.setItem('access_token', token || '');
  }

  static GET_ACCESS_TOKEN() {
    return localStorage.getItem('access_token');
  }
}
