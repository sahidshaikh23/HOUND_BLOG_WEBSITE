export const getInitials = (name) => {
    if (typeof name !== "string") {
      return "";
    }

    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    return initials;
  };