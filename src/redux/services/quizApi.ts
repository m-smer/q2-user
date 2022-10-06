import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Quiz} from '../types';
import {useParams} from 'react-router-dom';
import {store} from '../store';

export type QuizIdArr = {
    url_id?: string;
    domain: string;
};

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL_PREFIX,
    }),
    endpoints: builder => ({
        getQuiz: builder.query<Quiz, QuizIdArr>({
            query: quizIdArr => `quiz/get?url_id=${quizIdArr.url_id ?? ''}&domain=${quizIdArr.domain}`,
            // async onCacheEntryAdded(arg, {cacheDataLoaded, updateCachedData}) {
            //     await cacheDataLoaded;
            //     console.log(123);
            // },
        }),
    }),
});

export const {useGetQuizQuery} = quizApi;
