import { fetchData } from "./apiService";

export const fetchDashboardSummary = (filter: "this-week" | "prev-week") => {
  return fetchData("dashboard/summary", { filter });
};

export const fetchDashboardStat = (filter: "this-week" | "prev-week") => {
  return fetchData("dashboard/stat", { filter });
};

export const fetchOffers = (page: number, rowsPerPage: number) => {
  return fetchData("offers", {
    page: page.toString(),
    per_page: rowsPerPage.toString(),
  });
};
