import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PassingDataToSend} from '../types';

export const passingDataApi = createApi({
    reducerPath: 'passingData',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL_PREFIX,
    }),
    endpoints: builder => ({
        sendPassingToBackend: builder.mutation<
            PassingDataToSend,
            Partial<PassingDataToSend>
        >({
            query(body) {
                console.log('Отправляю дату на сервер');
                return {
                    url: `session/add?debug=1`,
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const {useSendPassingToBackendMutation} = passingDataApi;
