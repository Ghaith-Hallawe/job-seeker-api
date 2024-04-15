const jobCategories = [
  {
    key: 'executive_senior_level_officials_and_managers',
    value: 1,
    label: 'Executive/Senior Level Officials and Managers',
  },
  { key: 'professionals', value: 2, label: 'Professionals' },
  { key: 'technicians', value: 3, label: 'Technicians' },
  { key: 'sales_worker', value: 4, label: 'Sales Worker' },
  { key: 'administrative', value: 5, label: 'Administrative' },
  { key: 'craft_workers', value: 6, label: 'Craft Workers' },
  { key: 'operatives', value: 7, label: 'Operatives' },
  { key: 'laborers_and_helpers', value: 8, label: 'Laborers and Helpers' },
  { key: 'service_workers', value: 9, label: 'Service Workers' },
  {
    key: 'first_mid_level_officials_and_managers',
    value: 10,
    label: 'First/Mid Level Officials and Managers',
  },
];

const jobCategoriesMap = new Map();

for (const resource of jobCategories) {
  jobCategoriesMap.set(resource.value, {
    key: resource.key,
    value: resource.value,
    label: resource.label,
  });
}

export { jobCategoriesMap };
