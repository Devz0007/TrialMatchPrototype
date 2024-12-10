import { ClinicalStudy } from '../types/clinicalTrials';
import { RfpCardProps } from '../components/rfp/RfpCard';

export function transformStudyToRfpCard(study: ClinicalStudy): RfpCardProps {
  if (!study || !study.protocolSection) {
    throw new Error('Invalid study data');
  }

  const { protocolSection } = study;
  const {
    identificationModule,
    statusModule,
    designModule,
    conditionsModule = {},
    armsInterventionsModule = {},
    contactsLocationsModule = {},
  } = protocolSection;

  if (!identificationModule?.nctId || !statusModule?.overallStatus) {
    throw new Error('Missing required study data');
  }

  // Get enrollment count, ensuring we handle all possible data formats
  const enrollmentCount = (() => {
    const count = designModule?.enrollmentInfo?.count;
    // Handle both actual and anticipated enrollment
    if (count !== undefined && count !== null) {
      return typeof count === 'string' ? parseInt(count, 10) : count;
    }
    // Fallback to 0 if no enrollment data is available
    return 0;
  })();

  // Get sites count, ensuring we handle undefined locations
  const sitesCount = Array.isArray(contactsLocationsModule?.locations) 
    ? contactsLocationsModule.locations.length 
    : 0;

  // Get the most recent date between status verified and last update
  const lastUpdateDate = statusModule.statusVerifiedDate || null;

  const ageGroups = contactsLocationsModule?.eligibilityModule?.minimumAge || '18 Years';
  const maxAge = contactsLocationsModule?.eligibilityModule?.maximumAge || 'N/A';

  return {
    area: conditionsModule?.conditions?.[0] || 'Unknown',
    disease: identificationModule.briefTitle,
    country: 'United States',
    sponsor: identificationModule.organization?.fullName || identificationModule.organization?.class || 'Unknown Sponsor',
    type: armsInterventionsModule?.interventionTypes?.[0] || designModule?.studyType || 'Unknown',
    status: statusModule.overallStatus,
    phase: designModule?.phases?.[0]?.replace(/^PHASE_?/i, '') || 'N/A',
    size: enrollmentCount,
    sites: sitesCount,
    minAge: ageGroups,
    maxAge: maxAge,
    idctgov: identificationModule.nctId,
    lastUpdateDate: statusModule.statusVerifiedDate,
  };
}