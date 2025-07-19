export const parseSelectToProject = (selectStr = '') => {
  if (!selectStr) return null;

  const fields = selectStr.trim().split(/\s+/);
  const project = {};

  for (const field of fields) {
    if (field.startsWith('-')) {
      project[field.slice(1)] = 0;
    } else {
      project[field] = 1;
    }
  }

  return project;
};
