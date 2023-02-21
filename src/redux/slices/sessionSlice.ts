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
import {getFilledUtms, getNextPageInfo, pageDataById} from '../../utils';
import moment from 'moment-timezone';

type SessionsState = {
    [key: string]: SessionState;
};

const slice = createSlice({
    name: 'session',
    initialState: {} as SessionsState,
    reducers: {
        initSession: (
            state,
            {payload: {quiz}}: PayloadAction<{quiz: Quiz}>,
        ) => {
            state[quiz.id] = {
                id: nanoid(20),
                actualPage: pageDataById(quiz, quiz.first_element_id),
                passingData: {
                    forms: {},
                    pages: {},
                    answers: {},
                    meta: {
                        opened_at: moment()
                            .tz('Europe/Moscow')
                            .format('YYYY-MM-DD HH:mm:ss'),
                        last_action_at: moment()
                            .tz('Europe/Moscow')
                            .format('YYYY-MM-DD HH:mm:ss'),
                        points: 0,
                        result_id: null,
                        landing_url: window.location.href,
                        http_referer: document.referrer ?? null,
                        ...getFilledUtms(),
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
            //@todo: убрать дублирование кода
            // @ts-ignore
            state[quiz.id].passingData.meta.last_action_at = moment()
                .tz('Europe/Moscow')
                .format('YYYY-MM-DD HH:mm:ss');

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id = nextPage.obj.id;
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
            state[quiz.id].passingData.meta.last_action_at = moment()
                .tz('Europe/Moscow')
                .format('YYYY-MM-DD HH:mm:ss');

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id = nextPage.obj.id;
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
            state[quiz.id].passingData.meta.last_action_at = moment()
                .tz('Europe/Moscow')
                .format('YYYY-MM-DD HH:mm:ss');
            // @ts-ignore
            state[quiz.id].passingData.meta.points += answer.points;

            const nextPage = getNextPageInfo(quiz, state[quiz.id]);
            if (nextPage) {
                state[quiz.id].actualPage = nextPage;
                if (nextPage.type === 'result') {
                    // @ts-ignore
                    state[quiz.id].passingData.meta.result_id = nextPage.obj.id;
                }
            }
        },
    },
});

export const {initSession, saveFormData, savePageData, saveQuestionData} =
    slice.actions;

export const sessionReducer = slice.reducer;

export const selectSessions = (state: RootState) => state.session;
