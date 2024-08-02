export interface TransactionType {
    amount : string ;
    trackId : string;
    status : 1 | 0;
    paidAt : string;
    cardNumber : string
}