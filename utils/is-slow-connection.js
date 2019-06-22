import isServer from './is-server';

export const SLOW_CONNECTION_TYPES = {
  'slow-2g': true,
  '2g': true
};

export default function isSlowConnection() {
  if (isServer || !(navigator && navigator.connection)) {
    return false;
  }

  // Check if user has data saving option enabled in their device
  if (navigator.connection.saveData) {
    return true;
  }

  // Check for slow network connection
  if (SLOW_CONNECTION_TYPES[navigator.connection.effectiveType]) {
    return true;
  }

  return false;
}
