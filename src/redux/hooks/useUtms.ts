import {useSearchParams} from 'react-router-dom';

export const useUtms = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const utms = {
        utm_source: searchParams.get('utm_source'),
        utm_campaign: searchParams.get('utm_campaign'),
        utm_term: searchParams.get('utm_term'),
        utm_content: searchParams.get('utm_content'),
        utm_medium: searchParams.get('utm_medium'),
    };
    const areUtmsEmpty = Object.values(utms).every(utm => utm === null);

    return {utms, areUtmsEmpty};
};
