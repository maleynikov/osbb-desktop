class AuthService {
  public static async login(username: string): Promise<any> {
    return fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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

export default AuthService;
