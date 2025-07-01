
export interface Equipment {
    item: string;
    quantity: number;
    description: string;
}

export interface MonthlyAnalysis {
    month: string;
    generationKwh: number;
    consumptionKwh: number;
}

export interface QuoteDetails {
    systemSizeKwP: number;
    totalCost: number;
    annualSavingsBRL: number;
    paybackYears: number;
    summary: string;
    equipment: Equipment[];
    monthlyAnalysis: MonthlyAnalysis[];
}
