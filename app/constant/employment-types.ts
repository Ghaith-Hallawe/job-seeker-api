const employmentTypes = [
  { key: 'full_time', value: 1, label: 'Full Time' },
  { key: 'part_time', value: 2, label: 'Part Time' },
  { key: 'part_time_to_full_time', value: 3, label: 'Part Time to Full Time' },
  { key: 'temporary', value: 4, label: 'Temporary' },
  { key: 'temporary_to_full_time', value: 5, label: 'Temporary to Full Time' },
  { key: 'contracted', value: 6, label: 'Contracted' },
  {
    key: 'contracted_to_full_time',
    value: 7,
    label: 'Contracted to Full Time',
  },
  { key: 'internship', value: 8, label: 'Internship' },
  {
    key: 'internship_to_full_time',
    value: 9,
    label: 'Internship to Full Time',
  },
  { key: 'volunteer', value: 10, label: 'Volunteer' },
  { key: 'seasonal', value: 11, label: 'Seasonal' },
];

const employmentTypesMap = new Map();

for (const resource of employmentTypes) {
  employmentTypesMap.set(resource.value, {
    key: resource.key,
    value: resource.value,
    label: resource.label,
  });
}

export { employmentTypesMap };
