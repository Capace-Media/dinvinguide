"use server";

import { getSuppliersQuery } from "@/lib/queries/suppliers";
import { tryCatch } from "@/lib/utils/try-catch";
import { gqlRequest } from "@/lib/wp/client";
import {
  GetSuppliersParams,
  SuppliersData,
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
    })
  );

  if (status === "error" || error) {
    throw error;
  }

  return res?.data?.suppliers;
}
