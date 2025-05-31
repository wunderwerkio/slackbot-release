{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";

    utils.url = "github:wunderwerkio/nix-utils";
    utils.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = {
    self,
    nixpkgs,
    nixpkgs-unstable,
    utils,
  }: utils.lib.systems.eachDefault (system:
    let
      overlays = [];
      pkgs = import nixpkgs {
        inherit system overlays;
      };
      pkgsUnstable = import nixpkgs-unstable {
        inherit system;
      };
    in {
      devShells = rec {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_22
            pkgsUnstable.pnpm
          ];
        };
      };
    }
  );
}
