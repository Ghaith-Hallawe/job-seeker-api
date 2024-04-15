const selectionOptions = [
  {
    key: 'not_selected_not_required',
    value: 0,
    label: 'Not Selected (Not Required)',
  },
  { key: 'selected_not_required', value: 1, label: 'Selected (Not Required)' },
  { key: 'selected_required', value: 2, label: 'Selected (Required)' },
];

const selectionOptionsMap = new Map();

for (const resource of selectionOptions) {
  selectionOptionsMap.set(resource.value, {
    key: resource.key,
    value: resource.value,
    label: resource.label,
  });
}

export { selectionOptionsMap };
