import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Quiz} from '../types';
import {useParams} from 'react-router-dom';
import {store} from '../store';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL_PREFIX + '/v1/',
    }),
    endpoints: builder => ({
        getQuiz: builder.query<Quiz, string>({
            query: url_id => `quiz/get?url_id=${url_id}`,
            // async onCacheEntryAdded(arg, {cacheDataLoaded, updateCachedData}) {
            //     await cacheDataLoaded;
            //     console.log(123);
            // },
        }),
    }),
});

export const {useGetQuizQuery} = quizApi;
