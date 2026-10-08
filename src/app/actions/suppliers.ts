"use server";

import { getSuppliers as fetchSuppliers } from "@/lib/api/suppliers/get-suppliers";
import type { SuppliersQueryVariables } from "@/lib/wp/gql/graphql";

// Server action so the client-side supplier list can page through suppliers.
// Throws on failure so React Query shows its error state.
export async function getSuppliers(variables: SuppliersQueryVariables) {
  const suppliers = await fetchSuppliers(variables);
  if (!suppliers) throw new Error("Kunde inte hämta importörer");
  return suppliers;
}
