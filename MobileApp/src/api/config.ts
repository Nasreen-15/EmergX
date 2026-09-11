import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://emergx-50l5.onrender.com';

export const CANDIDATE_URLS = [
  API_BASE_URL,
];

export const STORAGE_KEY_API_URL = 'custom_api_base_url';

let activeApiBaseUrl = API_BASE_URL;

export const getStoredApiBaseUrl = async (): Promise<string> => {
  // Always use the deployed Render backend.
  // Ignore any old localhost URL stored on the device.
  activeApiBaseUrl = API_BASE_URL;

  try {
    await AsyncStorage.setItem(STORAGE_KEY_API_URL, API_BASE_URL);
  } catch {
    // Ignore storage errors
  }

  return API_BASE_URL;
};

export const saveApiBaseUrl = async (url: string): Promise<void> => {
  activeApiBaseUrl = API_BASE_URL;

  try {
    await AsyncStorage.setItem(STORAGE_KEY_API_URL, API_BASE_URL);
  } catch {
    // Ignore storage errors
  }
};

export const getActiveApiBaseUrl = (): string => {
  return activeApiBaseUrl;
};