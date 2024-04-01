import DynamicTable from "../../components/DynamicTable";
import pages from "../../data/pages.json";

export interface IPagesData {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export const Pages = () => (
  <DynamicTable<IPagesData>
    data={pages}
    notFoundTitle="No pages found"
    tableTitle="Pages"
    actionsTitle="Actions"
  />
);
