

import { format } from "date-fns";
import { Transaction } from "../components/dashboard/transactionalHistory";

export function formatTransactionData(item: any): Transaction | null {
    try {
        const parsedDate = new Date(item.date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Data inválida');
        }
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const monthName = monthNames[parsedDate.getMonth()];

        return {
            date: formattedDate,
            month: monthName,
            type: item.type,
            value: `R$ ${item.value.toFixed(2)}`,
        };
    } catch (error) {
        console.error('Erro ao converter data:', error);
        return null;
    }
}

// Function to handle fetch errors
export function handleFetchError(error: unknown) {
    if (error instanceof Error) {
        if (error.name !== 'AbortError') {
            console.error('Erro ao buscar o extrato:', error.message);
        }
    } else {
        console.error('Erro desconhecido ao buscar o extrato:', error);
    }
}