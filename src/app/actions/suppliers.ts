"use server";

import { getSupplierQuery, getSuppliersQuery } from "@/lib/queries/suppliers";
import { tryCatch } from "@/lib/utils/try-catch";
import { gqlRequest } from "@/lib/wp/client";
import {
  GetSuppliersParams,
  SupplierData,
  TSupplier,
  TSuppliers,
} from "../../../types/suppliers";

export async function getSuppliers({
  after,
  before,
  first,
  last,
}: GetSuppliersParams) {
  const {
    data: res,
    error,
    status,
  } = await tryCatch(
    gqlRequest<TSuppliers>({
      query: getSuppliersQuery,
      variables: {
        after,
        before,
        first,
        last,
      },
      tag: ["supplier"],
    })
  );

  if (status === "error" || error) {
    throw error;
  }

  return res?.data?.suppliers;
}

export async function getSupplier({
  slug,
}: {
  slug: string;
}): Promise<{ data: SupplierData | null; error: Error | null }> {
  const id = `/leverantor/${slug}`;

  const {
    data: res,
    error,
    status,
  } = await tryCatch(
    gqlRequest<TSupplier>({
      query: getSupplierQuery,
      variables: {
        id,
      },
      tag: ["supplier"],
    })
  );

  if (status === "error" || error || !res?.data?.leverantR) {
    return { data: null, error };
  }

  const leverantor = res.data.leverantR;

  if (leverantor?.drycker_to_leverantor?.drycker) {
    leverantor.drycker_to_leverantor.drycker =
      leverantor.drycker_to_leverantor.drycker.filter(
        (d: unknown) => d !== null
      );
  }

  return { data: leverantor, error: null };
}
