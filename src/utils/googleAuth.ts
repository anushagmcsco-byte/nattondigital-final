import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export let db: any = null;
try {
  db = getFirestore(app);
} catch (e) {
  console.warn('Firebase Firestore service is not enabled or available in this Firebase project yet:', e);
}

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

const STORAGE_KEY_OAUTH_TOKEN = 'natton_oauth_access_token';

// In-memory cache for accessToken
let cachedAccessToken: string | null = null;
try {
  cachedAccessToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_OAUTH_TOKEN) : null;
} catch (e) {
  console.error('Failed to read OAuth token from localStorage:', e);
}
let isSigningIn = false;

// Initialize auth state listener.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If logged in but no cached token (e.g. page refreshed), we may need to re-authenticate
        // or trigger sign-in again to get a fresh OAuth access token.
        cachedAccessToken = null;
        try {
          localStorage.removeItem(STORAGE_KEY_OAUTH_TOKEN);
        } catch (e) {}
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      try {
        localStorage.removeItem(STORAGE_KEY_OAUTH_TOKEN);
      } catch (e) {}
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    try {
      localStorage.setItem(STORAGE_KEY_OAUTH_TOKEN, credential.accessToken);
    } catch (e) {}
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null): void => {
  cachedAccessToken = token;
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY_OAUTH_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_OAUTH_TOKEN);
    }
  } catch (e) {}
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  try {
    localStorage.removeItem(STORAGE_KEY_OAUTH_TOKEN);
  } catch (e) {}
};
