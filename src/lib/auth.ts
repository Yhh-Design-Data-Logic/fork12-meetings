export const validateAuth = (data: {}) => {
  if (
    "access_token" in data &&
    "expires_at" in data &&
    typeof data.access_token === "string" &&
    typeof data.expires_at === "number"
  ) {
    if (data.expires_at > Date.now()) return true;
  }

  return false;
};
