import { useEffect, useState } from "react";

function PasswordStrength({ password }) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (pwd) => {
    let score = 0;

    if (!pwd) {
      setStrength(0);
      return;
    }

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;

    setStrength(score);
  };

  const getStrengthLabel = () => {
    if (!password) return "Check password strength";
    if (strength <= 2) return "Password Strength: Weak";
    if (strength <= 4) return "Password Strength: Medium";
    return "Password Strength: Strong";
  };

  const getColor = () => {
    if (!password) return "#94a3b8";
    if (strength <= 2) return "#ef4444";   // red
    if (strength <= 4) return "#f59e0b";   // orange
    return "#22c55e";                      // green
  };

  return (
    <p
      style={{
        marginTop: "-14px",
        marginBottom: "18px",
        fontSize: "13px",
        color: getColor(),
      }}
    >
      {getStrengthLabel()}
    </p>
  );
}

export default PasswordStrength;
