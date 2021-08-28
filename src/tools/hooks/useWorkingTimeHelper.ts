import { useEffect, useMemo, useState } from 'react';
import { WorkingTime } from '../types/WorkingTimeType';
import * as store from 'store';
import { getDay, getMonth, getYear } from '../MomentUtils';

export interface Filter {
    year?: number;
    month?: number;
    day?: number;
}

const storeKey = 'working-times';

export const useWorkingTimeHelper = (filter: Filter) => {
    const { year, month, day } = filter;
    const [allWorkingTimes, setAllWorkingTimes] = useState<WorkingTime[]>([]);

    const workingTimes = useMemo(() => {
        return allWorkingTimes.filter((workingTime) => {
            const isYearMatching = getYear(workingTime.date) === year;
            const isMonthMatching = getMonth(workingTime.date) === month;
            const isDayMatching = getDay(workingTime.date) === day;

            if (year && month && !day) {
                return isYearMatching && isMonthMatching;
            }

            return isYearMatching && isMonthMatching && isDayMatching;
        });
    }, [year, month, day, allWorkingTimes]);

    const add = (workingTime: WorkingTime) => {
        setAllWorkingTimes((workingTimes) => {
            const updatedWorkingTimes = [...workingTimes, workingTime];
            store.set(storeKey, updatedWorkingTimes);
            return updatedWorkingTimes;
        });
    };

    const remove = (workingTime: WorkingTime) => {
        setAllWorkingTimes((workingTimes) => {
            const updatedWorkingTimes = workingTimes.filter((_workingTime) => {
                return _workingTime.id !== workingTime.id;
            });
            store.set(storeKey, updatedWorkingTimes);
            return updatedWorkingTimes;
        });
    };

    useEffect(() => {
        const allWorkingTimes: WorkingTime[] = store.get(storeKey, []);
        setAllWorkingTimes(
            allWorkingTimes.map((workingTime) => ({
                ...workingTime,
                date: new Date(workingTime.date),
                to: new Date(workingTime.to),
                from: new Date(workingTime.from),
            }))
        );
    }, []);

    return {
        workingTimes,
        add,
        remove,
    };
};
