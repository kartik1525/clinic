// Indian Currency and Date Formatting Utilities

/**
 * Format a numeric amount into Indian Rupees (INR)
 * Example: 1200 -> "₹1,200"
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a YYYY-MM-DD date string into Indian Standard Date representation
 * Example: "2026-11-25" -> "25 Nov 2026"
 */
export const formatIndianDate = (dateStr, options = {}) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const defaultOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
    ...options,
  };

  return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
};

/**
 * Format date for detailed receipts
 * Example: "Wednesday, 25 November 2026"
 */
export const formatIndianLongDate = (dateStr) => {
  return formatIndianDate(dateStr, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
