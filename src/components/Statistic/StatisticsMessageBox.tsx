import React, { useMemo } from 'react';
import { MessageBox } from '../MessageBox/MessageBox';
import image from './3255337.jpg';
import { WorkingTime } from '../../tools/types/WorkingTimeType';
import moment from 'moment';

export interface StatisticsMessageBoxProps {
    className?: string;
    workingTimes: WorkingTime[];
    date: Date;
    variant?: 'day' | 'month';
}

export const StatisticsMessageBox = (props: StatisticsMessageBoxProps) => {
    const { className, date, workingTimes, variant = 'day' } = props;

    const headline = useMemo(() => {
        if (variant === 'day') {
            return `Statistik ${moment(date).format('DD.MM.YYYY')}`;
        }
        return `Statistik ${moment(date).format('MM.YYYY')}`;
    }, [variant, date]);

    const text = useMemo(() => {
        if (workingTimes.length === 0) {
            if (variant === 'day') {
                return 'Es liegt noch keine Zusammenfassung für diesen Tag vor.';
            }
            return 'Es liegt noch keine Zusammenfassung für diesen Monat vor.';
        }

        const workingTimeInMinutes = workingTimes
            .filter((workingTime) => workingTime.type === 'working')
            .reduce((previous, current) => {
                return (
                    previous +
                    moment(current.to).diff(moment(current.from), 'minutes')
                );
            }, 0);

        const breakInMinutes = workingTimes
            .filter((workingTime) => workingTime.type === 'break')
            .reduce((previous, current) => {
                return (
                    previous +
                    moment(current.to).diff(moment(current.from), 'minutes')
                );
            }, 0);

        const workingHours = moment
            .utc(
                moment
                    .duration(workingTimeInMinutes, 'minutes')
                    .asMilliseconds()
            )
            .format('HH:mm');
        const breakHours = moment
            .utc(moment.duration(breakInMinutes, 'minutes').asMilliseconds())
            .format('HH:mm');

        if (variant === 'day') {
            return `An diesem Tag hast du insgesamt ${workingHours} Stunden gearbeitet und ${breakHours} Stunden Pause gemacht.`;
        }
        return `In diesem Monat hast du insgesamt ${workingHours} Stunden gearbeitet und ${breakHours} Stunden Pause gemacht.`;
    }, [workingTimes]);

    return (
        <MessageBox
            className={className}
            headline={headline}
            text={text}
            imageSrc={image}
        />
    );
};
