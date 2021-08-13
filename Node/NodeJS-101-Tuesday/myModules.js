const {
	arch,
	cpus,
	totalmem,
	freemem,
	hostname,
	networkInterfaces,
} = require('os');
const process = require('process');

// const osInfo = () => {
// 	return `
//     <ul>
//       <li><strong>Architecture</strong> - ${arch()}</li>
//       <li><strong>CPU</strong> - ${JSON.stringify(cpus())}</li>
//       <li><strong>Total RAM</strong> - ${totalmem()}</li>
//       <li><strong>Available RAM</strong> - ${freemem()}</li>
//       <li><strong>Host Name</strong> - ${hostname()}</li>
//       <li><strong>IP Address</strong> - ${JSON.stringify(
// 				networkInterfaces().lo0[0].address
// 			)}</li>
//     </ul>
//   `;
// };

const osInfo = () => {
	const osInfoObj = {
		arch: arch(),
		cpu: cpus(),
		totalRam: totalmem(),
		availableRam: freemem(),
		hostName: hostname(),
		ip: JSON.stringify(networkInterfaces().lo0[0].address),
		get html() {
			return `
      <ul>
      <li><strong>Architecture</strong> - ${this.arch}</li>
      <li><strong>CPU</strong> - ${JSON.stringify(this.cpu)}</li>
      <li><strong>Total RAM</strong> - ${this.totalRam}</li>
      <li><strong>Available RAM</strong> - ${this.availableRam}</li>
      <li><strong>Host Name</strong> - ${this.hostname}</li>
      <li><strong>IP Address</strong> - ${this.ip}</li>
    </ul>
      `;
		},
	};
	return osInfoObj;
};

module.exports = osInfo;
