import {useSelector} from 'react-redux';
import {selectSessions, setUTMs} from '../slices/sessionSlice';
import {useParams, useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch} from './index';
import {useQuiz} from './useQuiz';
import {serialize} from 'v8';
import {current} from '@reduxjs/toolkit';

export const useSetUtms = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {data: quiz} = useQuiz();
    const utm_source = searchParams.get('utm_source');
    const utm_campaign = searchParams.get('utm_campaign');
    const utm_term = searchParams.get('utm_term');
    const utm_content = searchParams.get('utm_content');
    const utm_medium = searchParams.get('utm_medium');
    const utms = {
        utm_source: utm_source,
        utm_campaign: utm_campaign,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_medium: utm_medium,
    };
    const utmValues = Object.values(utms).reduce((str, current) => {
        return (str ?? '').concat(current ?? '');
    }, '');

    console.log(utmValues);

    return useEffect(() => {
        if (quiz) {
            console.log('setUTMs');
            dispatch(
                setUTMs({
                    quiz: quiz,
                    utms: utms,
                }),
            );
        }
    }, [utmValues]);
};
