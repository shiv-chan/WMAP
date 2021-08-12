const { argv } = require('process');
const {
	writeFile,
	appendFile,
	rename,
	rm,
	readdir,
	copyFile,
	constants,
	stat,
	open,
	readFile,
} = require('fs');

// node yourapp --createFile "somefile.txt"
// and your app will create an empty file called somefile.txt

if (argv[2] === '--createFile') {
	const data = '';
	const fileName = argv[3];
	writeFile(fileName, data, (err) => {
		if (err) {
			Promise.reject(new Error('Fail to create a file.')).catch((err) =>
				console.error(err)
			);
		} else {
			console.log(`The file ${fileName} has been saved!`);
		}
	});
}

// if (argv[2] === '--createFile') {
// 	const data = '';
// 	const fileName = argv[3];
// 	try {
// 		writeFile(fileName, data, (err) => {
// 			if (err) throw err;
// 			console.log(`The file ${fileName} has been saved!`);
// 		});
// 	} catch (err) {
// 		console.error(`Error: ${err}`);
// 	}
// }

// ==================

// node yourapp --writeFile "filename" "data"
// and your app will write to the filename, some data, and if there is any existing data, it will be overwritten

if (argv[2] === '--writeFile') {
	const data = argv[4];
	const fileName = argv[3];

	writeFile(fileName, data, (err) => {
		if (err) {
			Promise.reject(new Error('Fail to create a file.')).catch((err) => {
				console.error(err);
			});
		} else {
			console.log(`The file ${fileName} has been saved!`);
		}
	});
}

// ==================

// node yourapp --appendFile "filename" "data"
// and your app will write to the filename, some data, and if there is any existing data, it will be appended to the end

if (argv[2] === '--appendFile') {
	const data = argv[4];
	const fileName = argv[3];

	appendFile(fileName, data, (err) => {
		if (err) {
			Promise.reject(new Error('Fail to append.')).catch((err) =>
				console.error(err)
			);
		} else {
			console.log(`The file ${fileName} has been saved!`);
		}
	});
}

// ==================

// node yourapp --renameFile "fromFile" "toFile"
// and your app will rename a file, fromFile to toFile
if (argv[2] === '--renameFile') {
	const oldFileName = argv[3];
	const newFileName = argv[4];

	rename(oldFileName, newFileName, (err) => {
		if (err) {
			Promise.reject(new Error('Fail to rename the file.')).catch((err) =>
				console.error(err)
			);
		} else {
			console.log(
				`The file ${oldFileName} has been renamed as ${newFileName}!`
			);
		}
	});
}

// ==================

// node yourapp --deleteFile
// and your app will delete the file, but first ask the user if that's what she/she really wants to do?
// * you should also check for additional -y, if it exists, don't ask the user the question
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

if (argv[2] === '--deleteFile') {
	const deleteFilePath = argv[3];

	rl.question(
		`Do you really want to delete this file: ${deleteFilePath}?\n-y or -n?`,
		(answer) => {
			if (answer === '-n') rl.pause();
			if (answer === '-y') {
				rm(deleteFilePath, (err) => {
					if (err) {
						Promise.reject(new Error('Fail to delete the file.')).catch((err) =>
							console.error(err)
						);
					} else {
						console.log(`The file ${deleteFilePath} has been deleted!`);
					}
				});
			}
			rl.close();
		}
	);
}

// ==================

// node yourapp --listFiles "someDirectory"
// list files in a directory

const path = require('path');

if (argv[2] === '--listFiles') {
	const directoryPath = argv[3];

	readdir(path.join(__dirname, directoryPath), (err, files) => {
		if (err) {
			Promise.reject(new Error('Fail to list the files.')).catch((err) => {
				console.error(err);
			});
		} else {
			files.forEach((file) => console.log(file));
		}
	});
}

// ==================

// node yourapp --copyFile "thisfile" "tothisfile"
// copy a file from thisfile to thisfile

if (argv[2] === '--copyFile') {
	const src = argv[3];
	const dest = argv[4];
	const mode = constants.COPYFILE_EXCL;

	copyFile(src, dest, mode, (err) => {
		if (err) {
			Promise.reject(new Error(`Fail to copy the file ${src}`)).catch((err) => {
				console.error(err);
			});
		} else {
			console.log(`${src} was copied to ${dest} successfully!`);
		}
	});
}

// ==================

// node yourapp --movefile "thisfile" "tothisfile"
// move a file from thisfile to thatfile
if (argv[2] === '--moveFile') {
	const oldPath = argv[3];
	const newPath = path.join(__dirname, argv[4]);

	rename(oldPath, newPath, (err) => {
		if (err) {
			Promise.reject(new Error('Fail to move the file.')).catch((err) => {
				console.error(err);
			});
		} else {
			console.log(`The file has moved to ${newPath}!`);
		}
	});
}

// ==================

// node yourapp --size "somefile"
// get size of the file (in bytes)
if (argv[2] === '--size') {
	const path = argv[3];

	stat(path, (err, stats) => {
		if (err) {
			Promise.reject(new Error('Fail to get the size of the file.')).catch(
				(err) => {
					console.error(err);
				}
			);
		} else {
			console.log(`The size of the file ${path} is ${stats.size} bytes.`);
		}
	});
}
// ==================

// node yourapp --view "somefile"
// view the contents of the file on the screen
// if (argv[2] === '--view') {
// 	const path = argv[3];
// 	open(path, (err, fd) => {
// 		if (err) {
// 			Promise.reject(new Error('Fail to open the file.')).catch((err) => {
// 				console.error(err);
// 			});
// 		} else {
// 			console.log(fd);
// 		}
// 	});
// }

if (argv[2] === '--view') {
	const path = argv[3];
	readFile(path, (err, data) => {
		if (err) {
			Promise.reject(new Error('Fail to open the file.')).catch((err) => {
				console.error(err);
			});
		} else {
			console.log(data.toString());
		}
	});
}
// ==================

// node yourapp --view "somefile" --pause "22"
// where 22 is a number of lines, pause the viewing after that number of lines so that the user has a chance to see the text, then continue on
