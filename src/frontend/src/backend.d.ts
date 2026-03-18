import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Club {
    id: bigint;
    primaryColor: string;
    name: string;
    slug: string;
    description: string;
    logoUrl: string;
    secondaryColor: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    clubId: bigint;
    name: string;
    priceInPence: bigint;
    description: string;
    isActive: boolean;
    sizes: string;
    imageUrl: string;
    category: string;
    colors: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createClub(club: Club): Promise<void>;
    createProduct(product: Product): Promise<void>;
    deleteClub(clubId: bigint): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllClubs(): Promise<Array<Club>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClubBySlug(slug: string): Promise<Club | null>;
    getGeneralStock(): Promise<Array<Product>>;
    getProductById(productId: bigint): Promise<Product | null>;
    getProductsByClub(clubId: bigint): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateClub(club: Club): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
