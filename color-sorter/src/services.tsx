import api from './api';

interface StartSortingResponse {
    sortingId: string;
}

interface GetColorsResponse {
    [color: string]: number;
}

export interface GetStatusesResponse {
    _id: string;
    amountToBeSorted: number;
    timestamp: string;
}

export const startSorting = async (amountToBeSorted: number): Promise<StartSortingResponse> => {
    try{
        const response = await api.post<StartSortingResponse>('/action/start', { amountToBeSorted });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getColors = async (sortingId: string): Promise<GetColorsResponse> => {
    const response = await api.get<GetColorsResponse>(`/colors/${sortingId}`);
    return response.data;
};

export const getAll = async (): Promise<GetStatusesResponse[]> => {
    const response = await api.get<GetStatusesResponse[]>(`/sort-statuses`);
    return response.data;
};
