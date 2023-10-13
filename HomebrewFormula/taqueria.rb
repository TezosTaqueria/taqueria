class Taqueria < Formula
    desc "Extensible, open-source plugin-based framework and task runner for Tezos development with a CLI and a library of plugins."
    homepage "https://taqueria.io"
    version "0.41.0"
    head "https://github.com/pinnacle-labs/taqueria.git", :branch => "main"
    #url "https://github.com/pinnacle-labs/taqueria/archive/refs/tags/v0.41.00.tar.gz"
    url "https://github.com/pinnacle-labs/taqueria/archive/03c85ca453f5010df75e0357e6d8e940be1aec85.tar.gz" # v0.41.23
  
    depends_on "node"
    depends_on "deno"
  
    def install
        # Append the path to npm to the PATH environment variable
        ENV["PATH"] = "/usr/local/bin:#{ENV["PATH"]}"
        ENV['TAQ_VERSION'] = '0.41.0'
        ENV['TAQ_BUILD'] = '0.41.0'

        # Install npm dependencies
        system "npm install >/install.log 2>&1"
        
        # Build types and binary
        system "npm", "run", "build-types"
        system "npm", "run", "build:binary"
        
        # You might need to specify where to place the binary, and potentially 
        # other steps to finalize the installation.
        bin.install "taq"
    end
  end
  