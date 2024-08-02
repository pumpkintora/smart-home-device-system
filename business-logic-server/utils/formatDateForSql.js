const formatDateForSql = (date) => {
  const d = new Date(date);
  return d.toISOString().slice(0, 19).replace("T", " ");
};

module.exports = formatDateForSql