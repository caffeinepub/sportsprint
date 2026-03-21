import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Club, Product } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useAllClubs() {
  const { actor, isFetching } = useActor();
  return useQuery<Club[]>({
    queryKey: ["clubs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClubs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClubBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Club | null>({
    queryKey: ["club", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getClubBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useProductsByClub(clubId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products-club", clubId?.toString()],
    queryFn: async () => {
      if (!actor || clubId === undefined) return [];
      return actor.getProductsByClub(clubId);
    },
    enabled: !!actor && !isFetching && clubId !== undefined,
  });
}

export function useGeneralStock() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["general-stock"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGeneralStock();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductById(productId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Product | null>({
    queryKey: ["product", productId?.toString()],
    queryFn: async () => {
      if (!actor || productId === undefined) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && productId !== undefined,
  });
}

export function useCreateClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (club: Club) => {
      if (!actor) throw new Error("Not connected");
      return actor.createClub(club);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
}

export function useUpdateClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (club: Club) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateClub(club);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
}

export function useDeleteClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (clubId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteClub(clubId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      queryClient.invalidateQueries({ queryKey: ["general-stock"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["general-stock"] });
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["general-stock"] });
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
}
