export type Quiz = {
    id: string;
    title: string;
    url_id: string;
    domain: string;
    shuffle_questions: boolean;
    status: 'on' | 'off' | 'deleted';
    questions: Question[];
    results: Result[];
    forms: Form[];
    connections: Connection[];
    first_element_id: string;
};

export type SessionState = {
    id: string;
    setUtms: boolean;
    passingData?: PassingData;
    actualPage?: PageData;
};

export type PassingDataToSend = {
    id: string;
    quiz_id: string;
    passingData?: PassingData;
};

export type PageData = {
    obj: Form | Question | Result;
    type: 'question' | 'form' | 'result';
};

export type FormData = {
    formId: string;
    phone: string;
    page_opened_at: string;
    received_at: string;
};

export type PassingMetaData = {
    utm_source?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
    utm_medium?: string | null;
    opened_at: string;
    last_action_at: string;
    points?: number;
};

export type PassingData = {
    forms: {[key: string]: FormData};
    answers: {[key: string]: Answer};
    meta?: PassingMetaData;
};

export type Answer = {
    answerOptionsIds: string[];
    answerText?: string;
    points: number;
    page_opened_at: string;
    received_at: string;
};

export type Image = {
    id?: string;
    dataURL?: string;
};

export type Question = {
    id: string;
    quiz_id: string;
    title: string;
    order: number;
    type: 'radiobutton' | 'checkbox' | 'textarea';
    status: 'on' | 'off' | 'deleted';
    answerOptions?: AnswerOption[];
    images?: Image[];
    subtitle: string;
    description: string;
    video_url: string;
    correct_answer_points: number;
};

export type Connection = {
    id: string;
    quiz_id: string;
    source_obj_id: string;
    target_obj_id: string;
    connectionConditions?: ConnectionCondition[];
};

export type Result = {
    id: string;
    quiz_id: string;
    title: string;
    status: 'on' | 'off' | 'deleted';
    type: 'redirect' | 'image_description';
    subtitle: string;
    description: string;
    redirect_url: string;
    images?: Image[];
};

export type Form = {
    id: string;
    quiz_id: string;
    title: string;
    description: string;
    images?: Image[];
};

export type ConnectionCondition = {
    id: string;
    connection_id: string;
    answer_option_id: string | null;
    question_id: string;
    type: 'points' | 'answer_option';
    sign: '=' | '>' | '<';
    value: number;
};

export type AnswerOption = {
    id: string;
    question_id: string;
    title: string;
    order: number;
    points: number;
    status: 'on' | 'off' | 'deleted';
    is_right: boolean;
};

export type apiValidationError<T> = {
    field: keyof T;
    message: string;
};

export type apiValidationErrorResponse<T> = {
    data: apiValidationError<T>[];
    status: number;
};
