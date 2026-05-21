export interface BillModel {
    totalTip: number;
    grandTotal: number;
    billPerPerson: number;
}

export interface Errors {
    bill?: string;
    tip?: string;
    people?: string;
}
