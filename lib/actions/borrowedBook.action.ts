export const CalculateFine = async (dueDate: Date) => {
  const currentDate = new Date();
  const due = new Date(dueDate);
  const diff = currentDate.getTime() - due.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return days * 5;
  } else {
    return 0;
  }
}