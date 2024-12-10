import { ClinicalStudy } from '../types/clinicalTrials';

export const exportToCSV = (studies: ClinicalStudy[], fileName: string) => {
  // Filter studies from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filteredStudies = studies.filter(study => {
    const verifiedDate = study.protocolSection.statusModule.statusVerifiedDate;
    return verifiedDate && new Date(verifiedDate) >= thirtyDaysAgo;
  });

  // Define CSV headers and data
  const headers = [
    'NCT ID',
    'Title',
    'Status',
    'Phase',
    'Enrollment',
    'Last Updated',
    'Sponsor',
    'Conditions',
    'URL'
  ];

  const rows = filteredStudies.map(study => {
    const { protocolSection } = study;
    return [
      protocolSection.identificationModule.nctId,
      protocolSection.identificationModule.briefTitle,
      protocolSection.statusModule.overallStatus,
      protocolSection.designModule?.phases?.join(', ') || 'N/A',
      protocolSection.designModule?.enrollmentInfo?.count || 0,
      protocolSection.statusModule.statusVerifiedDate,
      protocolSection.identificationModule.organization?.fullName || 'Unknown',
      protocolSection.conditionsModule?.conditions?.join(', ') || 'N/A',
      `https://clinicaltrials.gov/study/${protocolSection.identificationModule.nctId}`
    ];
  });

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};