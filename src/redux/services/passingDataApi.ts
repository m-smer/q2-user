import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PassingDataToSend} from '../types';

export const passingDataApi = createApi({
    reducerPath: 'passingData',
    baseQuery: fetchBaseQuery({
        baseUrl: '/v1/',
    }),
    endpoints: builder => ({
        sendPassing: builder.mutation<
            PassingDataToSend,
            Partial<PassingDataToSend>
        >({
            query(body) {
                return {
                    url: `session/add?debug=1`,
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const {useSendPassingMutation} = passingDataApi;
