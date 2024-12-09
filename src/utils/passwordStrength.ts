export const evaluatePasswordStrength = (password: string): string => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password))
      return "Strong";
    return "Medium";
  };
  