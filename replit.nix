{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.python39Packages.flask
    pkgs.python39Packages.pip
    pkgs.python39Full
    pkgs.python39Full
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}