export default class Auth {
  public static async login(username: string): Promise<any> {
    return fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    });
  }
}
