import DynamicTable from "../../components/DynamicTable";
import pricePlans from "../../data/pricePlans.json";

export interface IPricePlansData {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export const PricePlans = () => (
  <DynamicTable<IPricePlansData>
    data={pricePlans}
    notFoundTitle="No price plans found"
    tableTitle="Price Plans"
    actionsTitle="Actions"
  />
);
