export const THERAPEUTIC_AREAS = [
  { value: 'ONCOLOGY', label: 'Oncology' },
  { value: 'CARDIOLOGY', label: 'Cardiology' },
  { value: 'NEUROLOGY', label: 'Neurology' },
  { value: 'IMMUNOLOGY', label: 'Immunology' },
  { value: 'INFECTIOUS_DISEASES', label: 'Infectious Diseases' },
  { value: 'RARE_DISEASES', label: 'Rare Diseases' },
  { value: 'PEDIATRICS', label: 'Pediatrics' },
  { value: 'METABOLIC', label: 'Metabolic Disorders' },
] as const;

export const STUDY_STATUSES = [
  { value: 'NOT_YET_RECRUITING', label: 'Not Yet Recruiting' },
  { value: 'RECRUITING', label: 'Recruiting' },
  { value: 'ENROLLING_BY_INVITATION', label: 'Enrolling by Invitation' },
  { value: 'ACTIVE_NOT_RECRUITING', label: 'Active, not recruiting' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'TERMINATED', label: 'Terminated' },
  { value: 'WITHDRAWN', label: 'Withdrawn' },
] as const;

export const STUDY_PHASES = [
  { value: 'PHASE1', label: 'Phase 1' },
  { value: 'PHASE2', label: 'Phase 2' },
  { value: 'PHASE3', label: 'Phase 3' },
  { value: 'PHASE4', label: 'Phase 4' },
  { value: 'NOT_APPLICABLE', label: 'N/A' },
] as const;