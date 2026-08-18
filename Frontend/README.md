# React Native frontend – Axios + session authentication

Minimal Expo + React Native + TypeScript frontend using Axios and a session-based authentication flow.

## Login flow

The frontend sends the credentials to:

```text
POST /api/auth/login
```

The endpoint is intentionally imaginary for now. Replace it with your real Express endpoint in:

```text
src/features/auth/auth.api.ts
```

The request is made through the shared Axios instance in:

```text
src/services/api.ts
```

Because the backend uses sessions rather than JWT, Axios is configured with:

```ts
withCredentials: true
```

The backend is expected to create the session and return the authenticated user, for example:

```json
{
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
```

## Endpoints expected by the frontend

```text
POST /api/auth/login
POST /api/auth/logout
```

Later, it is recommended to add:

```text
GET /api/auth/me
```

so the frontend can restore the logged-in state when the application starts.

## API URL

Change the URL in `src/services/api.ts`:

```ts
const API_URL = 'http://localhost:3000/api';
```

Depending on where the Expo app runs:

```text
Android emulator: http://10.0.2.2:3000/api
iOS simulator:   http://localhost:3000/api
Physical device:  http://YOUR-PC-IP:3000/api
```

## Structure

```text
src/
├── app/
│   └── navigation/
│       └── AppNavigator.tsx
├── features/
│   └── auth/
│       ├── screens/
│       │   └── LoginScreen.tsx
│       ├── auth.api.ts
│       └── auth.types.ts
├── screens/
│   └── HomeScreen.tsx
└── services/
    └── api.ts
```

## Run

```bash
npm install
npx expo install react-native-screens react-native-safe-area-context
npm start
```
