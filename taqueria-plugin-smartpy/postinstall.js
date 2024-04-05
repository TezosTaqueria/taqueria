const { exec } = require('child_process');

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

const osType = () => {
  return process.platform === 'darwin' ? 'mac' : 'linux';
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

const checkPip = async (manager) => {
  try {
    await runCommand('pip --version');
    return '✔';
  } catch {
    installHints(manager, 'python3-pip');
    return '✖';
  }
};

const checkSmartPy = async (pythonCheck, pipCheck) => {
  if (pythonCheck === '✖' || pipCheck === '✖') return '✖';

  try {
    const version = await runCommand('pip show smartpy | grep Version');
    if (parseFloat(version.split(' ')[1].replace('a', '')) >= 0.19) return '✔';
  } catch {
    try {
      await runCommand('pip install pip install https://smartpy.io/static/tezos_smartpy-0.19.1-py3-none-any.whl');
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
  console.log(`[${smartPyCheck}] smartpy v0.19.0a0 or greater`);
  console.log('')
};

main();
