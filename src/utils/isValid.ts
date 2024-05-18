

export const isValidTerm = (term: string) => {
    const regex = /^[a-zA-Z]+\.(com|app|xyz)$/; // Regex for domain format (example.com or example.abc)
    return regex.test(term);
  }