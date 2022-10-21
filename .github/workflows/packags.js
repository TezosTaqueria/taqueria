const fs = require('fs');
const git_short_sha = 'yeeeeees';
const git_tag = '${{ github.ref }}'.split('tags/')[1];

const packages = fs.readFileSync('packages', 'utf-8');

let packagesBody = '';

packages.split(/\r?\n/).forEach(package => {
	packagesBody = packagesBody.concat(`npm i ${package}-noooo --registry https://npm.ecadinfra.com \n`);
});

const body = `
    <table>
    <tr>
        <th scope="row">Latest Commit</th>
        <td>${git_short_sha}</td>
    </tr>
    <tr>
        <th scope="row">npm Packages</th>
        <td>
            <p>${packagesBody}</p>
        </td>
    </tr>
    </table>
`;

console.log(body);
