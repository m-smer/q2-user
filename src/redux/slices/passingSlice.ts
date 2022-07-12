import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootState, store} from '../store';
import {AnswerOption, Form, Question, Quiz, Result} from '../types';
import {getNextPageData, pageDataById} from '../../utils';
import {useGetQuizQuery} from '../services/quizApi';
import {useParams} from 'react-router-dom';
// import {deepMerge} from 'react-hook-form/dist/utils/deepMerge';
const merge = require('deepmerge');

type PassingsState = {
    [key: string]: PassingState;
};

export type PageData = {
    obj: Form | Question | Result;
    type: 'question' | 'form' | 'result';
};

export type PassingState = {
    sessionId: string | null;
    userData?: UserData;
    actualPage?: PageData;
};

export type UserData = {
    forms: {[key: string]: FormData};
    questions: {[key: string]: Answer};
    meta?: {};
};

export type FormData = {
    formId: string;
    phone: string;
};

export type Answer = {
    answerOptionsIds: string[];
    answerText?: string;
    points: number;
};

const slice = createSlice({
    name: 'passings',
    initialState: {} as PassingsState,
    reducers: {
        initSession: (state, {payload: quiz}: PayloadAction<Quiz>) => {
            state[quiz.url_id] = {
                sessionId: nanoid(20),
                actualPage: pageDataById(quiz, quiz.first_element_id),
                userData: {
                    forms: {},
                    questions: {},
                },
            };
        },
        saveFormData: (
            state,
            {
                payload: {quiz, formData},
            }: PayloadAction<{quiz: Quiz; formData: FormData}>,
        ) => {
            state[quiz.url_id].userData = merge(
                state[quiz.url_id].userData ?? [],
                {forms: {[formData.formId]: formData}},
            );
            const nextPage = getNextPageData(quiz, state[quiz.url_id]);
            if (nextPage) state[quiz.url_id].actualPage = nextPage;
        },
        saveQuestionData: (
            state,
            {
                payload: {quiz, question, answer},
            }: PayloadAction<{quiz: Quiz; question: Question; answer: Answer}>,
        ) => {
            //@ts-ignore
            state[quiz.url_id].userData.questions[question.id] = answer;

            // state[quiz.url_id].userData = merge(
            //     state[quiz.url_id].userData ?? [],
            //     {questions: {[question.id]: answer}},
            // );
            const nextPage = getNextPageData(quiz, state[quiz.url_id]);
            if (nextPage) state[quiz.url_id].actualPage = nextPage;
        },
    },
});

export const {initSession, saveFormData, saveQuestionData} = slice.actions;

export const passingsReducer = slice.reducer;

export const selectPassings = (state: RootState) => state.passings;
