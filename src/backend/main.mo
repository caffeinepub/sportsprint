import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

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

  type UserProfile = {
    name : Text;
  };

  // Initialize authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // Storage
  let clubs = Map.empty<Nat, Club>();
  let products = Map.empty<Nat, Product>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Club Management (Admin Only)
  public shared ({ caller }) func createClub(club : Club) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create clubs");
    };
    clubs.add(club.id, club);
  };

  public shared ({ caller }) func updateClub(club : Club) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update clubs");
    };
    if (not clubs.containsKey(club.id)) {
      Runtime.trap("Club not found");
    };
    clubs.add(club.id, club);
  };

  public shared ({ caller }) func deleteClub(clubId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete clubs");
    };
    clubs.remove(clubId);
  };

  // Product Management (Admin Only)
  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(productId);
  };

  // Public Queries (accessible to everyone including guests)
  public query ({ caller }) func getAllClubs() : async [Club] {
    clubs.values().toArray();
  };

  public query ({ caller }) func getClubBySlug(slug : Text) : async ?Club {
    clubs.values().toArray().find(
      func(club) {
        club.slug == slug;
      }
    );
  };

  public query ({ caller }) func getProductsByClub(clubId : Nat) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.clubId == clubId.toInt();
      }
    );
  };

  public query ({ caller }) func getGeneralStock() : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.clubId == -1;
      }
    );
  };

  public query ({ caller }) func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };
};
