const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// The header split point is after the mobile-nav-menu div
const headerSplitIndex = content.indexOf('<!-- Hero Section with Background Video -->');
const headerContentRaw = content.substring(0, headerSplitIndex);

// Add wp_head() before </head>
const headerContent = headerContentRaw.replace('</head>', '    <?php wp_head(); ?>\n</head>');

// The footer split point is before <!-- Footer -->
const footerSplitIndex = content.indexOf('<!-- Footer -->');
const frontPageContentRaw = content.substring(headerSplitIndex, footerSplitIndex);

const footerContentRaw = content.substring(footerSplitIndex);

// Add wp_footer() before </body>
const footerContent = footerContentRaw.replace('</body>', '    <?php wp_footer(); ?>\n</body>');

// Replace asset paths with get_template_directory_uri()
function replaceAssets(html) {
    return html.replace(/src="assets\//g, 'src="<?php echo get_template_directory_uri(); ?>/assets/')
               .replace(/href="styles.css"/g, 'href="<?php echo get_stylesheet_uri(); ?>"');
}

const headerFinal = replaceAssets(headerContent);
const frontPageFinal = `<?php get_header(); ?>\n\n` + replaceAssets(frontPageContentRaw) + `\n<?php get_footer(); ?>\n`;
const footerFinal = replaceAssets(footerContent);

fs.writeFileSync('header.php', headerFinal);
fs.writeFileSync('front-page.php', frontPageFinal);
fs.writeFileSync('footer.php', footerFinal);
fs.writeFileSync('index.php', '<?php\n// Fallback template\nget_header();\nif ( have_posts() ) {\n\twhile ( have_posts() ) {\n\t\tthe_post();\n\t\tthe_content();\n\t}\n}\nget_footer();\n');

console.log('Template split successfully.');
