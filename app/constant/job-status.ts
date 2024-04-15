const jobStatuses = [
  { key: 'open_default', value: 1, label: 'Open (Default)' },
  { key: 'drafting', value: 2, label: 'Drafting' },
  { key: 'on_hold', value: 3, label: 'On Hold' },
  { key: 'filled', value: 4, label: 'Filled' },
  { key: 'cancelled', value: 5, label: 'Cancelled' },
  { key: 'closed', value: 6, label: 'Closed' },
  { key: 'needs_approval', value: 7, label: 'Needs Approval' },
  { key: 'approved', value: 8, label: 'Approved' },
];

const jobStatusesMap = new Map();

for (const resource of jobStatuses) {
  jobStatusesMap.set(resource.value, {
    key: resource.key,
    value: resource.value,
    label: resource.label,
  });
}

export { jobStatusesMap };
