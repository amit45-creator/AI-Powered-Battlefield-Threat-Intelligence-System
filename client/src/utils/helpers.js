// Utility functions for the Battlefield Threat Intelligence System

/**
 * Format a date to a readable string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get priority color class based on priority level
 */
export const getPriorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'critical': return 'badge-critical';
    case 'medium': return 'badge-medium';
    case 'low': return 'badge-low';
    default: return 'badge-pending';
  }
};

/**
 * Get threat type emoji
 */
export const getThreatIcon = (type) => {
  const icons = {
    'Drone': '🛸',
    'Vehicle': '🚗',
    'Intrusion': '🚧',
    'Cyber': '💻',
    'Communication': '📡',
    'Other': '⚠️'
  };
  return icons[type] || '⚠️';
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get threat score color based on score value
 */
export const getScoreColor = (score) => {
  if (score >= 75) return 'var(--color-accent-red)';
  if (score >= 40) return 'var(--color-accent-amber)';
  return 'var(--color-accent-green)';
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
