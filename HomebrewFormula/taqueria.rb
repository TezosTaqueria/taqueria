class Taq < Formula
    desc "Extensible, open-source plugin-based framework and task runner for Tezos development with a CLI and a library of plugins."
    homepage "https://taqueria.io"
    version "0.41.0"
    url "https://github.com/pinnacle-labs/taqueria/archive/refs/tags/v0.41.0.tar.gz"
    sha256 "9e95ce34ecf7cd984b2e373151136f9baccfa04fd1b7c710b7d858561164dcfc"
  
    depends_on "node"
    depends_on "deno"
  
    def install
      # Clone the repository
      system "git", "clone", "https://github.com/pinnacle-labs/taqueria"
      
      # Change to the repo directory
      cd "taqueria" do
        # Install npm dependencies
        system "npm", "install"
        
        # Build types and binary
        system "npm", "run", "build-types"
        system "npm", "run", "build:binary"
        
        # You might need to specify where to place the binary, and potentially 
        # other steps to finalize the installation.
        bin.install "taq"
      end
    end
  end
  