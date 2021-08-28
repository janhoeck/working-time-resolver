import moment from 'moment';

export const getYear = (date: Date): number => {
    return moment(date).get('year');
};

export const getMonth = (date: Date): number => {
    return Number(moment(date).format('M'));
};

export const getDay = (date: Date): number => {
    return Number(moment(date).format('D'));
};
