#!/bin/sh

# This is an installation script for the 'taq' binary of the Taqueria project for the Tezos blockchain.
# The installer has the following behaviour:
# 1) If run by root, will install system-wide. If not run by root, the installer will prompt the user for permission to use sudo to install system-wide.
# 2) If the installer is installing system-wide, it will determine whether /usr/local/bin is in $PATH and if so, install the binary there. Otherwise, it will use /usr/bin.
# 3) If the user chooses a user-specific install, then the installer will use $HOME/.taqueria/bin, and configure the $PATH in the current shell.
# 4) The installer will use curl or wget, depending which is available.

# Function to check if command exists
command_exists() {
    command -v "$@" >/dev/null 2>&1
}

# Function to output error messages in red
output_error() {
    local message=$1
    echo -e "\033[0;31m${message}\033[0m" >&2
}


# Function to output warning messages in blue (instead of orange)
output_warning() {
    local message=$1
    echo -e "\033[0;36m${message}\033[0m"
}


# Function to output action messages in bold
output_action() {
    local message=$1
    echo -e "\033[1m${message}\033[0m"
}

# Function to download file
download_file() {
    if command_exists curl; then
        echo "Downloading taq binary using curl..."
        curl -fsSL "$1" -o "$2" || { output_error "Failed to download taq binary using curl."; exit 1; }
    elif command_exists wget; then
        echo "Downloading taq binary using wget..."
        wget -q "$1" -O "$2" || { output_error "Failed to download taq binary using wget."; exit 1; }
    else
        echo "Attempting to download taq binary..."
        output_error "curl or wget is required to download the file."
        exit 1
    fi
}

# Main installation function
install_taq() {
    # Detect if we are on macOS
    if [ "$(uname)" = "Darwin" ]; then
        echo "Detected macOS. Installing taq via Homebrew..."
        if ! command_exists brew; then
            output_error "Homebrew not found. Please install Homebrew first."
            exit 1
        fi
        brew tap TezosTaqueria/taqueria https://github.com/TezosTaqueria/taqueria
        brew install taqueria
        exit 0
    fi

    local install_path
    local binary_name="taq"
    local url="https://taqueria.io/get/linux/taq"
    local use_sudo=0

    # Allow user to override install path and method
    if [ -n "$TAQ_INSTALL_PATH" ]; then
        install_path="$TAQ_INSTALL_PATH"
    elif [ -n "$TAQ_INSTALL_METHOD" ]; then
        if [ "$TAQ_INSTALL_METHOD" = "system" ]; then
            install_path="/usr/local/bin"
            use_sudo=1
        elif [ "$TAQ_INSTALL_METHOD" = "user" ]; then
            mkdir -p "$HOME/.taqueria/bin/" >/dev/null 2>&1
            install_path="$HOME/.taqueria/bin/"
        else
            output_error "Invalid TAQ_INSTALL_METHOD. Valid options are 'system' or 'user'."
            exit 1
        fi
    else
        # Determine installation path interactively
        if [ "$(id -u)" -eq 0 ]; then
            if command_exists env && echo "$PATH" | grep -q "/usr/local/bin"; then
                install_path="/usr/local/bin"
            else
                install_path="/usr/bin"
            fi
        else
            printf "Do you want to install system-wide (all users, requires sudo)? [Y/n]: "
            read -r choice
            choice=${choice:-Y}
            case $choice in
                [Yy]* | [Yy][Ee][Ss]* | 1)
                    install_path="/usr/local/bin"
                    use_sudo=1
                    ;;
                [Nn]*)
                    mkdir -p "$HOME/.taqueria/bin/" >/dev/null 2>&1
                    install_path="$HOME/.taqueria/bin/"
                    ;;
                *)
                    output_warning "Invalid choice. Assuming default (yes)."
                    install_path="/usr/local/bin"
                    use_sudo=1
                    ;;
            esac
        fi
    fi

    # Download the file
    echo "Starting download of taq binary..."
    download_file "$url" "$binary_name" || { output_error "Download failed"; exit 1; }
    chmod +x "$binary_name" || { output_error "Failed to set executable permission on $binary_name"; exit 1; }

    # Check for existing file
    if [ -f "$install_path/$binary_name" ]; then
        read -p "File already exists at $install_path/$binary_name. Overwrite? [y/N]: " confirm
        [ "$confirm" = "y" ] || { output_error "Installation aborted"; exit 1; }
    fi

    # Move the binary to the installation path
    if [ "$use_sudo" -eq 1 ]; then
        if ! command_exists sudo; then
            output_error "sudo is required to install system-wide but it's not installed. Please install sudo or run this script as root."
            exit 1
        fi
        sudo mv "$binary_name" "$install_path/" || { output_error "Failed to move binary to $install_path"; exit 1; }
    else
        echo "Moving binary to $install_path"
        mv "$binary_name" "$install_path/" || { output_error "Failed to move binary to $install_path"; exit 1; }
    fi

    # Update PATH if necessary
    if [ "$install_path" = "$HOME/.taqueria/bin/" ]; then
        # Detect shell
        local shell_config
        local shell_profile_detected=0

        # Note: Users will need to source their shell configuration file or restart their shell for the PATH changes to take effect.
        if [ -n "$ZSH_VERSION" ]; then
            shell_profile_detected=1
            shell_config="$HOME/.zshrc"
        elif [ -n "$BASH_VERSION" ]; then
            shell_profile_detected=1
            shell_config="$HOME/.bashrc"
        fi

        # Shell detection successful?
        # Note: Users will need to source their shell configuration file or restart their shell for the PATH changes to take effect.
        if [ "$shell_profile_detected" -eq 1 ]; then
            if ! echo "$PATH" | grep -q "$HOME/.taqueria/bin"; then
                echo 'export PATH=$PATH:$HOME/.taqueria/bin/' >> "$shell_config"
                output_warning "Please source your shell configuration file or restart your shell to apply the PATH changes."
            fi
            output_action "To use taq immediately, please run 'source $shell_config' or restart your shell."
        else
            output_warning "Could not detect shell profile to update PATH. Please add $HOME/.taqueria/bin to your PATH manually."
        fi
    fi

    echo "taq installed successfully at $install_path/$binary_name"
    output_warning "To get started with Taqueria, run 'taq new' to create a new project using the LIGO compiler for smart contract development."
}

install_taq
