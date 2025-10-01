import { Command } from "commander";
import fs from "fs"

const program = new Command();

program
  .name("WebBack-3")
  .description("")
  .version("1.0.0");

program
  .option("-i, --input [file]", "Input file path")
  .option("-o, --output <file>", "Output file path")
  .option("-d, --display", "Display into console")
  .option("-v, --variety", "Flower kind")
  .option("-l, --length <number>", "Display only entries with petal.length greater than this value", parseFloat)

program.parse(process.argv);

const options = program.opts();

if (options.input === true || !options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if(!fs.existsSync(options.input)){
    console.error("Cannot find input file")
    process.exit(1)
}

if (process.argv.length === 2) {
    console.error("Please, specify input file");
    process.exit(1);
}



let jsonData;

try {
    const fileData = fs.readFileSync(options.input, "utf-8")
    const lines = fileData.split(/\r?\n/).filter(Boolean)
    jsonData = lines.map(line => JSON.parse(line))
} catch(err) {
    console.error("Cannot read or parse input file: ", err.message)
    process.exit(1)
}

let outputData = jsonData

if(options.length !== undefined && !isNaN(options.length)){
    outputData = outputData.filter(item => Number(item["petal.length"]) > options.length)
}

if (options.output) {
    const linesToWrite = outputData.map(item => {
        let line = `${item["petal.length"]} ${item["petal.width"]}`;
        if (options.variety) line += ` ${item.variety}`;
        return line;
    }).join("\n");

    fs.writeFileSync(options.output, linesToWrite, "utf-8");
}

if(options.display){
    

    outputData.forEach(item => {
        let line = `${item["petal.length"]} ${item["petal.width"]}`;
        if (options.variety) line += ` ${item.variety}`;
        console.log(line);
    });
}