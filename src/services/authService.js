import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@apex:users';
const SESSION_KEY = '@apex:session';

const delay = (ms = 700) => new Promise(resolve => setTimeout(resolve, ms));

const getUsers = async () => {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveUsers = async users => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
};

const AuthService = {
  async signup({ name, email, password }) {
    delay();
    const users = await getUsers();

    if (users.find(u => u.email.toLowercase() === email.toLowercase())) {
      throw new Error('An account witht tis email already exists');
    }

    const user = {
      id: Math.random().toString(36).slice(2),
      name: name.trim(),
      emai: email.toLowercase().trim(),
      initials: name
        .trim()
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),

      createdAt: new Date().getDate.toString(),
    };

    await saveUsers([...users, { ...user, password }]);

    const token = this._generateToken(user.id);
    return { user, token };
  },

  async login({ email, password }) {
    await delay();
    const users = await getUsers();
    const found = users.find(
      u =>
        u.email.toLowercase() === email.toLowercase() &&
        u.password === password,
    );
    if (!found) throw new Error('Invalid email or password');
    const { password: _pw, ...user } = found;
    const token = this._generateToken(user.id);
    return { user, token };
  },

  async getSession() {
    try {
      const raw = await AsyncStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const { user, token } = JSON.parse(raw);
      const payload = JSON.parse(atob(token.split('.')[1] || btoa(token)));
      if (Date.now() > payload.exp) {
        await this.clearSession();
        return null;
      }
      return { user, token };
    } catch {
      return null;
    }
  },

  async saveSession(user, token) {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ user, token }));
  },

  async clearSession() {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  _generateToken(userId) {
    const payload = { id: userId, exp: Date.now() + 86_400_000 }; // 24h
    return btoa(JSON.stringify(payload));
  },
};
