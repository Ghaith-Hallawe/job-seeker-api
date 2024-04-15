const Experiences = [
  { key: 'student_high_school', value: 1, label: 'Student (High School)' },
  { key: 'student_college', value: 2, label: 'Student (College)' },
  { key: 'entry_level', value: 3, label: 'Entry Level' },
  { key: 'mid_level', value: 4, label: 'Mid Level' },
  { key: 'experienced', value: 5, label: 'Experienced' },
  { key: 'manager_supervisor', value: 6, label: 'Manager/Supervisor' },
  {
    key: 'senior_manager_supervisor',
    value: 7,
    label: 'Senior Manager/Supervisor',
  },
  { key: 'executive', value: 8, label: 'Executive' },
  { key: 'senior_executive', value: 9, label: 'Senior Executive' },
];

const experiencesMap = new Map();

for (const resource of Experiences) {
  experiencesMap.set(resource.value, {
    key: resource.key,
    value: resource.value,
    label: resource.label,
  });
}

export { experiencesMap };
