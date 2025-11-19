export class DateUtils{
    static todayISO(): string {
        return new Date().toISOString().split('T')[0];
    }
}