const fs = require("fs");

const path = "android/app/build.gradle";
const conteudo = fs.readFileSync(path, "utf8");

const versionCodeMatch = conteudo.match(/versionCode\s+(\d+)/);
const versionNameMatch = conteudo.match(/versionName\s+"([^"]+)"/);

if (!versionCodeMatch || !versionNameMatch) {
    console.error("Não foi possível encontrar versionCode/versionName em android/app/build.gradle");
    process.exit(1);
}

const versionCodeAtual = parseInt(versionCodeMatch[1], 10);
const versionAtual = versionNameMatch[1];

// Incrementa o versionCode (obrigatório, sempre +1)
const novoVersionCode = versionCodeAtual + 1;

// Incrementa o último número da versão semântica (patch)
// Preenche com 0 caso a versão tenha menos de 3 partes (ex: "1.0" -> "1.0.0")
const partes = versionAtual.split(".").map(Number);
while (partes.length < 3) partes.push(0);
partes[2] += 1;
const novaVersion = partes.join(".");

const novoConteudo = conteudo
    .replace(/versionCode\s+\d+/, `versionCode ${novoVersionCode}`)
    .replace(/versionName\s+"[^"]+"/, `versionName "${novaVersion}"`);

fs.writeFileSync(path, novoConteudo);

console.log(`Version: ${versionAtual} → ${novaVersion}`);
console.log(`VersionCode: ${versionCodeAtual} → ${novoVersionCode}`);

// Expõe como output pro workflow, se precisar usar depois
const output = process.env.GITHUB_OUTPUT;
if (output) {
    fs.appendFileSync(output, `version_code=${novoVersionCode}\n`);
    fs.appendFileSync(output, `version_name=${novaVersion}\n`);
}