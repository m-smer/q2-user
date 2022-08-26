import {
    Connection,
    PageInfo,
    PassingData,
    Quiz,
    SessionState,
} from '../redux/types';

export const pageDataById = (
    quiz: Quiz,
    pageId: string,
): PageInfo | undefined => {
    const form = quiz.forms.find(e => e.id === pageId);
    if (form) return {type: 'form', obj: form};

    const question = quiz.questions.find(e => e.id === pageId);
    if (question) return {type: 'question', obj: question};

    const page = quiz.pages.find(e => e.id === pageId);
    if (page) return {type: 'page', obj: page};

    const result = quiz.results.find(e => e.id === pageId);
    if (result) return {type: 'result', obj: result};

    return undefined;
};

export const getNextPageInfo = (
    quiz: Quiz,
    session: SessionState,
): PageInfo | undefined => {
    const currentPageId = session.actualPage?.obj.id;
    const connections = quiz.connections.filter(
        c => c.source_obj_id === currentPageId,
    );

    // сортируем, дабы сначала проверять соединения с условиями
    connections.sort(
        (a, b) =>
            Number(b.connectionConditions?.length) -
            Number(a.connectionConditions?.length),
    );

    const fits = findBestConnection(connections, session.passingData);
    if (fits) {
        return pageDataById(quiz, fits.target_obj_id);
    } else return undefined;
};

export const findBestConnection = (
    connections: Connection[],
    passingData?: PassingData,
) => {
    return connections.find(con => isConditionsMet(con, passingData));
};

export const isConditionsMet = (
    connection: Connection,
    passingData?: PassingData,
) => {
    if (connection.connectionConditions?.length === 0) return true;
    if (!passingData) return false;
    let met = true;

    connection.connectionConditions?.map(cond => {
        if (!met) return false;
        const answer = passingData.answers?.[cond.question_id as any];

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
