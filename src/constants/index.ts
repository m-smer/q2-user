export const ANSWER_TYPES = [
    {id: 'radiobutton', title: 'Один вариант ответа'},
    {id: 'checkbox', title: 'Несколько вариантов ответа'},
    {id: 'textarea', title: 'Свободный ввод'},
];

export const RESULT_TYPES = [
    {id: 'redirect', title: 'Переадресация'},
    {id: 'image_description', title: 'Изображение и текст'},
];

export const RELATION_CONDITION_TYPES = [
    {id: 'points', title: 'Кол-во баллов'},
    {id: 'answer_option', title: 'Вариант ответа'},
];

export const RELATION_CONDITION_SIGNS = [
    {id: '=', title: '='},
    {id: '>', title: '>'},
    {id: '<', title: '<'},
];

export const QUIZ_EVENTS = {
    formSent: 'formSent',
};
