import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootState, store} from '../store';
import {
    FormData,
    Question,
    Quiz,
    Answer,
    SessionState,
    PageData,
} from '../types';
import {getNextPageInfo, pageDataById} from '../../utils';
import moment from 'moment';

type SessionsState = {
    [key: string]: SessionState;
};

type UTMs = {
    utm_source?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
    utm_medium?: string | null;
};

const slice = createSlice({
    name: 'session',
    initialState: {} as SessionsState,
    reducers: {
        initSession: (
            state,
            {payload: {quiz, utms}}: PayloadAction<{quiz: Quiz; utms: UTMs}>,
        ) => {
            state[quiz.id] = {
                id: nanoid(20),
                actualPage: pageDataById(quiz, quiz.first_element_id),
                passingData: {
                    forms: {},
                    pages: {},
                    answers: {},
                    meta: {
                        opened_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        last_action_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        points: 0,
                        result_id: null,
                        ...utms,
                    },
                },
            };
        },
        saveFormData: (
            state,
            {
                payload: {quiz, formData},
            }: PayloadAction<{quiz: Quiz; formData: FormData}>,
        ) => {
            // @ts-ignore
            state[quiz.id].passingData.forms[formData.formId] = formData;
            // @ts-ignore
            state[quiz.id].passingData.meta.last_action_at =
                moment().format('YYYY-MM-DD HH:mm:ss');

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id =
                        nextPage.obj.id;
                }
            }
        },
        savePageData: (
            state,
            {
                payload: {quiz, pageData},
            }: PayloadAction<{quiz: Quiz; pageData: PageData}>,
        ) => {
            console.log(pageData);
            // @ts-ignore
            state[quiz.id].passingData.pages[pageData.page_id] = pageData;
            // @ts-ignore
            state[quiz.id].passingData.meta.last_action_at =
                moment().format('YYYY-MM-DD HH:mm:ss');

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id =
                        nextPage.obj.id;
                }
            }
        },
        saveQuestionData: (
            state,
            {
                payload: {quiz, question, answer},
            }: PayloadAction<{quiz: Quiz; question: Question; answer: Answer}>,
        ) => {
            //@ts-ignore
            state[quiz.id].passingData.answers[question.id] = answer;
            // @ts-ignore
            state[quiz.id].passingData.meta.last_action_at =
                moment().format('YYYY-MM-DD HH:mm:ss');
            // @ts-ignore
            state[quiz.id].passingData.meta.points += answer.points;

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id =
                        nextPage.obj.id;
                }
            }
        },
    },
});

export const {initSession, saveFormData, savePageData, saveQuestionData} =
    slice.actions;

export const sessionReducer = slice.reducer;

export const selectSessions = (state: RootState) => state.session;
