import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {
    initSession,
    saveFormData,
    saveQuestionData,
} from '../slices/sessionSlice';
import {passingDataApi} from '../services/passingDataApi';
import {SessionState} from '../types';
import {RootState} from '../store';

const passingListener = createListenerMiddleware();

passingListener.startListening({
    matcher: isAnyOf(initSession, saveFormData, saveQuestionData),
    effect: async (action, listenerApi) => {
        const quiz = action.payload.quiz;
        const state = listenerApi.getState() as RootState;

        const session = state.session[
            action.payload.quiz.url_id
        ] as SessionState;

        listenerApi.dispatch(
            passingDataApi.endpoints.sendPassingToBackend.initiate({
                id: session.id,
                quiz_id: quiz.id,
                passingData: session.passingData,
            }),
        );
    },
});

export default passingListener;
