// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status badge class
export const getStatusClass = (status) => {
  const classes = {
    'Pending': 'status-badge status-pending',
    'In-Progress': 'status-badge status-in-progress',
    'Resolved': 'status-badge status-resolved'
  };
  return classes[status] || 'status-badge';
};

// Get category icon
export const getCategoryIcon = (category) => {
  const icons = {
    'Electricity': 'E',
    'Roads': 'R',
    'Water': 'W',
    'Waste': 'T',
    'Safety': 'S'
  };
  return icons[category] || 'I';
};

// Download file
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Validate image file
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only image files (JPEG, PNG, GIF) are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true };
};
