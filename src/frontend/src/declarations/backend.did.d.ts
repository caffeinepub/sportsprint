/* eslint-disable */
// @ts-nocheck
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Club {
  'id' : bigint,
  'primaryColor' : string,
  'name' : string,
  'slug' : string,
  'description' : string,
  'logoUrl' : string,
  'secondaryColor' : string,
}
export interface Product {
  'id' : bigint,
  'clubId' : bigint,
  'name' : string,
  'priceInPence' : bigint,
  'description' : string,
  'isActive' : boolean,
  'sizes' : string,
  'imageUrl' : string,
  'category' : string,
  'colors' : string,
}
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } | { 'user' : null } | { 'guest' : null };
export interface _CaffeineStorageCreateCertificateResult {
  'method' : string,
  'blob_hash' : string,
}
export interface _CaffeineStorageRefillInformation {
  'proposed_top_up_amount' : [] | [bigint],
}
export interface _CaffeineStorageRefillResult {
  'success' : [] | [boolean],
  'topped_up_amount' : [] | [bigint],
}
export interface StripeConfiguration {
  'secretKey' : string,
  'allowedCountries' : string[],
}
export interface ShoppingItem {
  'name' : string,
  'currency' : string,
  'quantity' : bigint,
  'amount' : bigint,
}
export interface Order {
  'id' : bigint,
  'itemsJson' : string,
  'totalInPence' : bigint,
  'status' : string,
  'stripeSessionId' : string,
}
export interface _SERVICE {
  '_caffeineStorageBlobIsLive' : ActorMethod<[Uint8Array], boolean>,
  '_caffeineStorageBlobsToDelete' : ActorMethod<[], Array<Uint8Array>>,
  '_caffeineStorageConfirmBlobDeletion' : ActorMethod<[Array<Uint8Array>], undefined>,
  '_caffeineStorageCreateCertificate' : ActorMethod<[string], _CaffeineStorageCreateCertificateResult>,
  '_caffeineStorageRefillCashier' : ActorMethod<[[] | [_CaffeineStorageRefillInformation]], _CaffeineStorageRefillResult>,
  '_caffeineStorageUpdateGatewayPrincipals' : ActorMethod<[], undefined>,
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'createClub' : ActorMethod<[Club], undefined>,
  'createProduct' : ActorMethod<[Product], undefined>,
  'deleteClub' : ActorMethod<[bigint], undefined>,
  'deleteProduct' : ActorMethod<[bigint], undefined>,
  'getAllClubs' : ActorMethod<[], Array<Club>>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getClubBySlug' : ActorMethod<[string], [] | [Club]>,
  'getGeneralStock' : ActorMethod<[], Array<Product>>,
  'getProductById' : ActorMethod<[bigint], [] | [Product]>,
  'getProductsByClub' : ActorMethod<[bigint], Array<Product>>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'updateClub' : ActorMethod<[Club], undefined>,
  'updateProduct' : ActorMethod<[Product], undefined>,
  'verifyAdminPassword' : ActorMethod<[string, string], boolean>,
  'isStripeConfigured' : ActorMethod<[], boolean>,
  'setStripeConfiguration' : ActorMethod<[StripeConfiguration], undefined>,
  'createCheckoutSession' : ActorMethod<[Array<ShoppingItem>, string, string], string>,
  'createOrder' : ActorMethod<[string, bigint, string], bigint>,
  'updateOrderStatus' : ActorMethod<[bigint, string], undefined>,
  'getOrderById' : ActorMethod<[bigint], [] | [Order]>,
  'getOrderByStripeSession' : ActorMethod<[string], [] | [Order]>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
