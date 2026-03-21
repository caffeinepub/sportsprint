import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";

actor {
  // Types
  type Club = {
    id : Nat;
    name : Text;
    description : Text;
    slug : Text;
    primaryColor : Text;
    secondaryColor : Text;
    logoUrl : Text;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    priceInPence : Nat;
    category : Text;
    sizes : Text;
    colors : Text;
    imageUrl : Text;
    clubId : Int;
    isActive : Bool;
  };

  type Order = {
    id : Nat;
    itemsJson : Text;
    totalInPence : Nat;
    status : Text;
    stripeSessionId : Text;
  };

  type UserProfile = {
    name : Text;
  };

  // Keep authorization and userProfiles for stable variable compatibility
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // Storage
  let clubs = Map.empty<Nat, Club>();
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextOrderId : Nat = 1;
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Transform function for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    { input.response with headers = [] };
  };

  // Admin password verification
  public query func verifyAdminPassword(username : Text, password : Text) : async Bool {
    username == "admin" and password == "sportsprintadmin2024";
  };

  // Stripe configuration
  public query func isStripeConfigured() : async Bool {
    switch (stripeConfig) {
      case (?_) { true };
      case (null) { false };
    };
  };

  public shared func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    stripeConfig := ?config;
  };

  public shared func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    switch (stripeConfig) {
      case (null) { "{\"error\":\"Stripe not configured\"}" };
      case (?config) {
        await Stripe.createCheckoutSession(config, Principal.fromText("aaaaa-aa"), items, successUrl, cancelUrl, transform);
      };
    };
  };

  // Club Management
  public shared func createClub(club : Club) : async () {
    clubs.add(club.id, club);
  };

  public shared func updateClub(club : Club) : async () {
    if (not clubs.containsKey(club.id)) { return };
    clubs.add(club.id, club);
  };

  public shared func deleteClub(clubId : Nat) : async () {
    clubs.remove(clubId);
  };

  // Product Management
  public shared func createProduct(product : Product) : async () {
    products.add(product.id, product);
  };

  public shared func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) { return };
    products.add(product.id, product);
  };

  public shared func deleteProduct(productId : Nat) : async () {
    products.remove(productId);
  };

  // Order Management
  public shared func createOrder(itemsJson : Text, totalInPence : Nat, stripeSessionId : Text) : async Nat {
    let orderId = nextOrderId;
    nextOrderId += 1;
    let order : Order = {
      id = orderId;
      itemsJson = itemsJson;
      totalInPence = totalInPence;
      status = "pending";
      stripeSessionId = stripeSessionId;
    };
    orders.add(orderId, order);
    orderId;
  };

  public shared func updateOrderStatus(orderId : Nat, status : Text) : async () {
    switch (orders.get(orderId)) {
      case (?order) { orders.add(orderId, { order with status = status }) };
      case null {};
    };
  };

  public query func getOrderById(orderId : Nat) : async ?Order {
    orders.get(orderId);
  };

  public query func getOrderByStripeSession(sessionId : Text) : async ?Order {
    orders.values().toArray().find(
      func(order) { order.stripeSessionId == sessionId }
    );
  };

  // Public Queries
  public query func getAllClubs() : async [Club] {
    clubs.values().toArray();
  };

  public query func getClubBySlug(slug : Text) : async ?Club {
    clubs.values().toArray().find(func(club) { club.slug == slug });
  };

  public query func getProductsByClub(clubId : Nat) : async [Product] {
    products.values().toArray().filter(func(product) { product.clubId == clubId.toInt() });
  };

  public query func getGeneralStock() : async [Product] {
    products.values().toArray().filter(func(product) { product.clubId == -1 });
  };

  public query func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };
};
