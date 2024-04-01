import DynamicTable from "../../components/DynamicTable";
import products from "../../data/products.json";

export interface IProductsData {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  options: {
    size: string;
    amount: number;
  };
}

export const Products = () => (
  <DynamicTable<IProductsData>
    data={products}
    notFoundTitle="No products found"
    tableTitle="Products"
    actionsTitle="Actions"
  />
);
