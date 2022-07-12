import {Connection, Quiz} from '../redux/types';
import {PageData, PassingState, UserData} from '../redux/slices/passingSlice';

export const pageDataById = (
    quiz: Quiz,
    pageId: string,
): PageData | undefined => {
    const form = quiz.forms.find(e => e.id === pageId);
    if (form) return {type: 'form', obj: form};

    const question = quiz.questions.find(e => e.id === pageId);
    if (question) return {type: 'question', obj: question};

    const result = quiz.results.find(e => e.id === pageId);
    if (result) return {type: 'result', obj: result};

    return undefined;
};

export const getNextPageData = (
    quiz: Quiz,
    passing: PassingState,
): PageData | undefined => {
    const currentPageId = passing.actualPage?.obj.id;
    const connections = quiz.connections.filter(
        c => c.source_obj_id === currentPageId,
    );

    // сортируем, дабы сначала проверять соединения с условиями
    connections.sort(
        (a, b) =>
            Number(b.connectionConditions?.length) -
            Number(a.connectionConditions?.length),
    );

    const fits = findBestConnection(connections, passing.userData);
    if (fits) {
        return pageDataById(quiz, fits.target_obj_id);
    } else return undefined;
};

export const findBestConnection = (
    connections: Connection[],
    passingData?: UserData,
) => {
    return connections.find(con => isConditionsMet(con, passingData));
};

export const isConditionsMet = (
    connection: Connection,
    passingData?: UserData,
) => {
    if (connection.connectionConditions?.length === 0) return true;
    if (!passingData) return false;
    let met = true;

    connection.connectionConditions?.map(cond => {
        if (!met) return false;
        const answer = passingData.questions?.[cond.question_id as any];

        // если ответа на вопрос еще не было, то условие сразу не соблюдено
        if (answer === undefined) {
            met = false;
            return false;
        }
        switch (cond.type) {
            case 'points':
                switch (cond.sign) {
                    case '<':
                        if (!(answer.points < cond.value)) met = false;
                        break;
                    case '>':
                        if (!(answer.points > cond.value)) met = false;
                        break;
                    case '=':
                        if (!(answer.points === cond.value)) met = false;
                        break;
                }
                break;
            case 'answer_option':
                if (
                    !answer.answerOptionsIds?.find(
                        o => o === cond.answer_option_id,
                    )
                )
                    met = false;
        }
    });
    return met;
};
