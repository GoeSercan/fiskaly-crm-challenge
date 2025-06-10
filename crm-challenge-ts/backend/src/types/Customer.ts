import { CustomerInput } from "./CustomerInput";

export interface Customer extends CustomerInput {
    customer_id: string;
    tss_id: string | null;
}