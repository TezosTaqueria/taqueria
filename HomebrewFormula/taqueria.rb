class Taqueria < Formula
    desc "Extensible, open-source plugin-based framework and task runner for Tezos development with a CLI and a library of plugins."
    homepage "https://taqueria.io"
    version "0.65.0"
    head "https://github.com/tezostaqueria/taqueria.git", :branch => "main"
    url "https://github.com/tezostaqueria/taqueria/archive/refs/tags/v0.65.0.tar.gz"
  
    depends_on "node@20"
    depends_on "deno"
    depends_on "pnpm"
  
    def install
        # Check Node.js version and fail if v23 or later
        node_version = Utils.popen_read("node", "-v").strip.delete_prefix("v").to_i
        if node_version >= 23
          odie "This formula is not compatible with Node.js v23 or later. Please use an earlier version of Node.js."
        end

        # Append the path to npm to the PATH environment variable
        ENV["PATH"] = "/usr/local/bin:#{ENV["PATH"]}"
        ENV['TAQ_VERSION'] = '0.65.0'
        ENV['TAQ_BUILD'] = '0.65.0'

        # Install npm dependencies
        system "pnpm install >install.log 2>&1"
        
        # Build types and binary
        system "pnpm", "run", "build-types"
        system "pnpm", "run", "build:binary"
        
        # You might need to specify where to place the binary, and potentially 
        # other steps to finalize the installation.
        bin.install "taq"
    end
  end
  
