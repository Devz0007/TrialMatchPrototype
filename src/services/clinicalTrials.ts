import { StudiesResponse, ClinicalStudy } from '../types/clinicalTrials';

const API_BASE_URL = 'https://clinicaltrials.gov/api/v2';

export class ClinicalTrialsService {
  private static formatParams(params: Record<string, any>): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(',')}`;
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }

  static async getStudies({
    query,
    page = 1,
    pageSize = 20,
    countTotal = true,
    pageToken,
    fields = [],
    sort = ['LastUpdatePostDate:desc'],
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
    countTotal?: boolean;
    pageToken?: string;
    fields?: string[];
    sort?: string[];
  }): Promise<StudiesResponse> {
    const params = this.formatParams({
      format: 'json',
      pageSize,
      countTotal: countTotal ? 'true' : 'false',
      pageToken,
      fields: fields?.length > 0 ? fields.join(',') : undefined,
      sort: sort?.length > 0 ? sort.join(',') : undefined,
      ...(query && { 'query.term': query }),
    });

    try {
      const response = await fetch(`${API_BASE_URL}/studies?${params}`);
      
      if (!response.ok && response.status !== 404) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data: StudiesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching studies:', { error, query, pageSize, pageToken });
      throw new Error('Failed to fetch studies. Please try again later.');
    }
  }

  static async getStudyById(nctId: string): Promise<ClinicalStudy> {
    try {
      const response = await fetch(`${API_BASE_URL}/studies/${nctId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ClinicalStudy = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching study:', error);
      throw error;
    }
  }
}