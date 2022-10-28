import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PassingDataToSend, FormData} from '../types';

export const passingDataApi = createApi({
    reducerPath: 'passingData',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL_PREFIX,
    }),
    endpoints: builder => ({
        validateFormData: builder.mutation<FormData, Partial<FormData>>({
            query(body) {
                console.log('Отправляю дату на сервер для валидации');
                return {
                    url: `form/validate?debug=1`,
                    method: 'POST',
                    body,
                };
            },
        }),
        sendPassingToBackend: builder.mutation<
            PassingDataToSend,
            Partial<PassingDataToSend>
        >({
            query(body) {
                console.log('Отправляю дату на сервер для сохранения');
                return {
                    url: `session/add?debug=1`,
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const {useSendPassingToBackendMutation, useValidateFormDataMutation} =
    passingDataApi;
