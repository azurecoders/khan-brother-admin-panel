import { useQuery } from "@apollo/client/react";
import { FETCH_OVERVIEW_STATS } from "@/graphql/overview";
import { OverviewStats } from "@/types/overview";

export const useOverview = () => {
  const { data, loading, error, refetch } = useQuery(FETCH_OVERVIEW_STATS, {
    fetchPolicy: "cache-and-network", // Always fetch fresh data
  });

  const stats: OverviewStats = data?.fetchOverviewStats || {
    totalServices: 0,
    totalProducts: 0,
    totalProjects: 0,
    totalMessages: 0,
    totalTestimonials: 0,
  };

  return {
    stats,
    loading,
    error,
    refetch,
  };
};
