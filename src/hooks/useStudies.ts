import { useState, useEffect } from 'react';
import { ClinicalTrialsService } from '../services/clinicalTrials';
import { StudiesResponse, ClinicalStudy } from '../types/clinicalTrials';

interface UseStudiesProps {
  query?: string;
  pageSize?: number;
  therapeuticArea?: string;
  status?: string;
  phase?: string;
  sort?: string[];
}

interface UseStudiesReturn {
  studies: ClinicalStudy[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  hasNextPage: boolean;
  loadNextPage: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useStudies({
  query,
  pageSize = 20,
  therapeuticArea,
  status,
  phase,
  sort = ['LastUpdatePostDate:desc'],
}: UseStudiesProps = {}): UseStudiesReturn {
  const [studies, setStudies] = useState<ClinicalStudy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  const buildQueryString = () => {
    const conditions = ['AREA[LocationCountry]United States'];
    
    if (therapeuticArea) {
      conditions.push(`AREA[Condition]${therapeuticArea}`);
    }
    if (status) {
      const statuses = status.startsWith('(') 
        ? status.slice(1, -1).split(' OR ')
        : [status];
      
      if (statuses.length > 0) {
        const statusQuery = statuses.length === 1 
          ? statuses[0]
          : `(${statuses.join(' OR ')})`;
        conditions.push(`AREA[OverallStatus]${statusQuery}`);
      }
    }
    if (phase) {
      const phases = phase.startsWith('(') 
        ? phase.slice(1, -1).split(' OR ').map(p => p.replace('PHASE_', ''))
        : [phase];
      
      if (phases.length > 0) {
        // Special handling for N/A phase
        const formattedPhases = phases.map(p => 
          p === 'NOT_APPLICABLE' ? 'NA' : p
        );

        const phaseQuery = phases.length === 1 
          ? formattedPhases[0]
          : `(${formattedPhases.join(' OR ')})`;
        conditions.push(`AREA[Phase]${phaseQuery}`);
      }
    }
    if (query) {
      conditions.push(query);
    }
    return conditions.join(' AND ');
  };

  const fetchStudies = async (pageToken?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const queryString = buildQueryString();

      const response = await ClinicalTrialsService.getStudies({
        query: queryString,
        pageSize,
        pageToken,
        countTotal: !pageToken, // Only count total on first page
        fields: [
          'protocolSection.identificationModule',
          'protocolSection.statusModule',
          'protocolSection.designModule.enrollmentInfo',
          'protocolSection.designModule.phases',
          'protocolSection.designModule.studyType',
          'protocolSection.conditionsModule',
          'protocolSection.contactsLocationsModule',
          'protocolSection.armsInterventionsModule',
          'protocolSection.statusModule.statusVerifiedDate',
        ],
        sort,
      });

      if (!pageToken) {
        setStudies(response.studies.filter(Boolean));
      } else {
        setStudies(prev => [...prev, ...response.studies.filter(Boolean)]);
      }

      if (!pageToken) setTotalCount(response.totalCount || 0);
      setNextPageToken(response.nextPageToken);
    } catch (err) {
      console.error('Error in useStudies:', err);
      setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [query, therapeuticArea, status, phase, sort?.join(',')]);

  const loadNextPage = async () => {
    if (nextPageToken && !isLoading) {
      await fetchStudies(nextPageToken);
    }
  };

  const refresh = () => fetchStudies();

  return {
    studies,
    isLoading,
    error,
    totalCount,
    hasNextPage: !!nextPageToken,
    loadNextPage,
    refresh,
  };
}