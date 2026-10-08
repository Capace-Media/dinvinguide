import "server-only";
import { wpQuery } from "@/lib/wp/client";
import type { SuppliersQueryVariables } from "@/lib/wp/gql/graphql";
import { isPresent } from "@/lib/utils/is-present";
import { SupplierQuery, SuppliersQuery } from "./queries";

export async function getSuppliers(variables: SuppliersQueryVariables) {
  const data = await wpQuery(SuppliersQuery, variables, {
    tags: ["supplier"],
  });
  return data?.suppliers ?? null;
}

export async function getSupplier(slug: string) {
  const data = await wpQuery(
    SupplierQuery,
    { id: `/leverantor/${slug}` },
    { tags: ["supplier"] },
  );
  const supplier = data?.leverantR;
  if (!supplier) return null;

  return {
    ...supplier,
    drinks: supplier.drycker_to_leverantor?.drycker?.filter(isPresent) ?? [],
  };
}

export type Supplier = NonNullable<Awaited<ReturnType<typeof getSupplier>>>;
