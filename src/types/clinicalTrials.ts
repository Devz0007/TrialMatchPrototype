export interface StudyIdentification {
  nctId: string;
  briefTitle: string;
  officialTitle?: string;
  organization?: {
    fullName: string;
    class: string;
  };
}

export interface StudyStatus {
  overallStatus: string;
  statusVerifiedDate?: string;
  lastKnownStatus?: string;
  whyStopped?: string;
}

export interface StudyProtocol {
  identificationModule: StudyIdentification;
  statusModule: StudyStatus;
  descriptionModule?: {
    briefSummary?: string;
    detailedDescription?: string;
  };
  conditionsModule?: {
    conditions?: string[];
    keywords?: string[];
  };
  designModule?: {
    studyType?: string;
    phases?: string[];
    enrollmentCount?: number;
    numberOfArms?: number;
  };
  contactsLocationsModule?: {
    locations?: Array<{
      facility?: string;
      city?: string;
      state?: string;
      country?: string;
    }>;
    eligibilityModule?: {
      minimumAge?: string;
      maximumAge?: string;
    };
  };
  armsInterventionsModule?: {
    interventionTypes?: string[];
  };
}

export interface ClinicalStudy {
  protocolSection: StudyProtocol;
  hasResults: boolean;
  documentSection?: Record<string, unknown>;
  derivedSection?: Record<string, unknown>;
}

export interface StudiesResponse {
  studies: ClinicalStudy[];
  nextPageToken?: string;
  totalCount?: number;
}