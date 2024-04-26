/**
 * Validates the given email address.
 * @param email - The email address to validate.
 * @returns true if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates the password to ensure it is at least 8 characters long and contains both alphabets and numbers.
 * @param password - The password to validate.
 * @returns true if the password meets the criteria, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};
