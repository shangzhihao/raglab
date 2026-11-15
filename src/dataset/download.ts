import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const baseUrl =
	"https://huggingface.co/datasets/yixuantt/MultiHopRAG/resolve/main";
const chunksDir = "./data";

await mkdir(chunksDir, { recursive: true });

for (const fname of ["MultiHopRAG.json", "corpus.json"]) {
	const response = await fetch(`${baseUrl}/${fname}`);
	if (!response.ok) {
		throw new Error(`Download failed: ${fname},${response.status}`);
	}
	const data = Buffer.from(await response.arrayBuffer());
	await writeFile(join(chunksDir, fname), data);
	console.log(`Downloaded ${fname}`);
}
