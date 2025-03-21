"use server";

import { getSupplierQuery, getSuppliersQuery } from "@/lib/queries/suppliers";
import { tryCatch } from "@/lib/utils/try-catch";
import { gqlRequest } from "@/lib/wp/client";
import {
  GetSuppliersParams,
  SupplierData,
  SuppliersData,
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
      tag: ["leverantor"],
    })
  );

  if (status === "error" || error) {
    throw error;
  }

  return res?.data?.suppliers;
}

export async function getSupplier({
  id,
}: {
  id: string;
}): Promise<{ data: SupplierData | null; error: Error | null }> {
  const {
    data: res,
    error,
    status,
  } = await tryCatch(
    gqlRequest<TSupplier>({
      query: getSupplierQuery,
      variables: {
        id: `/leverantor/${id}`,
      },
      tag: ["leverantor"],
    })
  );

  if (status === "error" || error || !res?.data?.leverantR) {
    return { data: null, error };
  }

  return { data: res?.data?.leverantR, error: null };
}
