export type WorkingTimeType = 'working' | 'break';

export interface WorkingTime {
    id: string;
    date: Date;
    from: Date;
    to: Date;
    type: WorkingTimeType;
}
