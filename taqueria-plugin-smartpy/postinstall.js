const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr.trim());
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

const checkPackageManager = async () => {
  const managers = ['brew', 'apt', 'yum', 'pacman'];
  for (const manager of managers) {
    try {
      await runCommand(`which ${manager}`);
      return manager;
    } catch {
      continue;
    }
  }
  return 'unknown';
};

const installHints = (manager, package) => {
  const instructions = {
    brew: `brew install ${package}`,
    apt: `sudo apt install ${package}`,
    yum: `sudo yum install ${package}`,
    pacman: `sudo pacman -S ${package}`,
    unknown: `Please install ${package} manually.`,
  };
  console.log(`To install ${package}, run: ${instructions[manager]}`);
};

const checkDocker = async (manager) => {
  try {
    await runCommand('docker -v');
    return '✔';
  } catch {
    installHints(manager, 'docker');
    return '✖';
  }
};

const checkPython = async (manager) => {
  try {
    const version = await runCommand('python3 --version');
    if (parseFloat(version.replace('Python ', '')) >= 3.10) return '✔';
  } catch {
    installHints(manager, 'python3');
  }
  return '✖';
};

// Track whether we're using a venv (when global pip isn't available)
let useVenv = false;

// Venv is created in the project's .taq folder
const getVenvPath = () => path.join(process.cwd(), '.taq', 'smartpy-venv');

const ensureVenvExists = async () => {
  const venvPath = getVenvPath();
  if (!fs.existsSync(`${venvPath}/bin/pip`)) {
    console.log(`Creating SmartPy venv at ${venvPath}...`);
    // Use Python's built-in venv module (available in Python 3.3+)
    await runCommand(`python3 -m venv ${venvPath}`);
    // Upgrade pip in the venv
    await runCommand(`${venvPath}/bin/pip install --upgrade pip`);
  }
};

const checkPip = async (manager) => {
  try {
    await runCommand('pip --version');
    return '✔';
  } catch {
    // Global pip not found - create a venv with pip
    try {
      useVenv = true;
      await ensureVenvExists();
      return '✔ (using venv)';
    } catch (err) {
      console.log(`Failed to create venv: ${err}`);
      if (manager === 'apt') {
        console.log('On Debian/Ubuntu, you may need: sudo apt install python3-venv');
      }
      installHints(manager, 'python3-pip');
      return '✖';
    }
  }
};

const getPipCommand = () => useVenv ? `${getVenvPath()}/bin/pip` : 'pip';

const checkSmartPy = async (pythonCheck, pipCheck) => {
  if (pythonCheck === '✖' || pipCheck === '✖') return '✖';

  const pip = getPipCommand();

  try {
    // Check for smartpy-tezos (PyPI package name)
    const version = await runCommand(`${pip} show smartpy-tezos | grep Version`);
    return '✔';
  } catch {
    try {
      // Install from PyPI
      await runCommand(`${pip} install smartpy-tezos`);
      return '✔';
    } catch {
      console.log('Failed to install SmartPy.');
      return '✖';
    }
  }
};

const main = async () => {
  const manager = await checkPackageManager();
  const dockerCheck = await checkDocker(manager);
  const pythonCheck = await checkPython(manager);
  const pipCheck = await checkPip(manager);
  const smartPyCheck = await checkSmartPy(pythonCheck, pipCheck);

  console.log('Health Check for Taqueria SmartPy Plugin')
  console.log('========================================')
  console.log(`[${dockerCheck}] docker`);
  console.log(`[${pythonCheck}] python 3.10 or greater`);
  console.log(`[${pipCheck}] pip`);
  console.log(`[${smartPyCheck}] smartpy v0.22.0 or greater`);
  console.log('')
};

main();
