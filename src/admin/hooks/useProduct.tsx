import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/getProduct-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { CreateUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: CreateUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      // Actualizar queryData
      queryClient.setQueryData(["product", { id: product.id }], product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
