const pathIndexHtml = "/Users/anushkamodi/Desktop/IGL experiment/index.html";
const pathStalkSvg = "/Users/anushkamodi/Desktop/IGL experiment/stalk_svg.txt";

// Helper to read file content
function readFile(filePath) {
    const objcPath = $.NSString.alloc.initWithUTF8String(filePath);
    const objcStr = $.NSString.stringWithContentsOfFileEncodingError(objcPath, $.NSUTF8StringEncoding, null);
    if (objcStr) {
        return objcStr.UTF8String;
    }
    return null;
}

// Helper to write file content
function writeFile(filePath, content) {
    const objcPath = $.NSString.alloc.initWithUTF8String(filePath);
    const objcStr = $.NSString.alloc.initWithUTF8String(content);
    return objcStr.writeToFileAtomicallyEncodingError(objcPath, true, $.NSUTF8StringEncoding, null);
}

const stalkGrainsSvg = readFile(pathStalkSvg);
let indexHtml = readFile(pathIndexHtml);

if (!stalkGrainsSvg) {
    console.log("Error: could not read stalk_svg.txt");
} else if (!indexHtml) {
    console.log("Error: could not read index.html");
} else {
    // We want to replace the content between <div class="wheat-stalk-container"> and the next </div>
    const startTag = '<div class="wheat-stalk-container">';
    const endTag = '</div>\n                \n                <div class="timeline-item left">'; // let's find the matching end point precisely
    
    // Alternative: search for the svg element and replace it
    const svgStartIdx = indexHtml.indexOf('<svg class="wheat-stalk-svg"');
    const svgEndIdx = indexHtml.indexOf('</svg>', svgStartIdx);
    
    if (svgStartIdx === -1 || svgEndIdx === -1) {
        console.log("Error: could not find wheat-stalk-svg inside index.html");
    } else {
        const newSvgContent = `<svg class="wheat-stalk-svg" viewBox="0 0 100 1100" width="100%" height="100%">
                        <defs>
                            <linearGradient id="wheat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#FFE3A3" />
                                <stop offset="35%" stop-color="#E8C07D" />
                                <stop offset="70%" stop-color="#C5964D" />
                                <stop offset="100%" stop-color="#9C6F2A" />
                            </linearGradient>
                            <radialGradient id="stem-grad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#E5C38C" />
                                <stop offset="100%" stop-color="#A57D48" />
                            </radialGradient>
                        </defs>
                        <!-- Watercolor-style main stem (stalk) -->
                        <path class="wheat-stem" d="M 50,0 Q 48,550 50,1100" stroke="url(#stem-grad)" stroke-width="4.5" fill="none" stroke-linecap="round" />
                        
                        <!-- 56 Tightly Packed Overlapping Watercolor Wheat Grains -->
${stalkGrainsSvg}
                    </svg>`;
                    
        indexHtml = indexHtml.substring(0, svgStartIdx) + newSvgContent + indexHtml.substring(svgEndIdx + 6);
        if (writeFile(pathIndexHtml, indexHtml)) {
            console.log("Successfully updated index.html with new wheat stalk SVG!");
        } else {
            console.log("Error: failed to write to index.html");
        }
    }
}
