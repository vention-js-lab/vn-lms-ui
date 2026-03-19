export class LOCAL_STORAGE {
  static USER_KEY = 'user_profile';

  static SET_ACCESS_TOKEN(token: string | null) {
    localStorage.setItem('access_token', token || '');
  }

  static GET_ACCESS_TOKEN() {
    return localStorage.getItem('access_token');
  }

  static SET_USER(user: unknown | null) {
    if (!user) {
      localStorage.removeItem(LOCAL_STORAGE.USER_KEY);
      return;
    }
    localStorage.setItem(LOCAL_STORAGE.USER_KEY, JSON.stringify(user));
  }

  static GET_USER<T>() {
    const raw = localStorage.getItem(LOCAL_STORAGE.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}
