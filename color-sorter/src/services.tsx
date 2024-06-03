import api from './api';

interface StartSortingResponse {
    sortingId: string;
}

interface StopSortingRequest {
    id: string;
}

interface GetColorsResponse {
    [color: string]: number;
}

export const startSorting = async (amountToBeSorted: number): Promise<StartSortingResponse> => {
    try{
        const response = await api.post<StartSortingResponse>('/action/start', { amountToBeSorted });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const stopSorting = async (id: string): Promise<void> => {
    await api.post('/action/stop', { id });
};

export const getColors = async (sortingId: string): Promise<GetColorsResponse> => {
    const response = await api.get<GetColorsResponse>(`/colors/${sortingId}`);
    return response.data;
};
