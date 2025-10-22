module.exports = function(eleventyConfig) {
  // ✅ Pass-through copy for assets (CSS is now processed as template)
  eleventyConfig.addPassthroughCopy("./src/assets");
  
  // ✅ Copy Lunr.js from node_modules for client-side search
  eleventyConfig.addPassthroughCopy({ "./node_modules/lunr/lunr.min.js": "js/lunr.min.js" });

  // ✅ Substances collection - get all substance profiles
  eleventyConfig.addCollection("substances", function(collectionApi) {
    return collectionApi.getFilteredByTag("substance-profile").sort((a, b) => {
      return (a.data.substance || '').localeCompare(b.data.substance || '');
    });
  });

  // ✅ Filter to extract alternative names from substance content
  eleventyConfig.addFilter("extractAlternativeNames", function(content) {
    if (!content) return [];
    
    // Extract alternative names from the HTML content
    const names = [];
    
    // Look for the alternative-names section specifically
    const altNamesMatch = content.match(/<div class="alternative-names">[\s\S]*?<\/div>/);
    if (altNamesMatch) {
      const altNamesContent = altNamesMatch[0];
      
      // Extract all span content within the alternative names section
      const spanMatches = altNamesContent.match(/<span[^>]*>([^<]+)<\/span>/g);
      if (spanMatches) {
        spanMatches.forEach(match => {
          const nameMatch = match.match(/<span[^>]*>([^<]+)<\/span>/);
          if (nameMatch && nameMatch[1]) {
            const name = nameMatch[1].trim();
            // Filter out separators and unwanted content
            if (name && 
                name.length >= 1 && 
                name !== '•' && 
                name !== '→' &&
                name !== ',' &&
                !name.includes('category') && 
                !name.includes('Names') &&
                !name.includes('H4') &&
                !name.includes('<') &&
                !name.includes('>')) {
              names.push(name);
            }
          }
        });
      }
    }
    
    // Also extract from title and chemical name as backup
    if (names.length === 0) {
      // Try to find substance name variations in the content
      const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (titleMatch && titleMatch[1]) {
        const title = titleMatch[1].replace(/[🌈💖🧪⚡️🔥❄️🌿🍄]/g, '').trim();
        if (title) names.push(title);
      }
    }
    
    return [...new Set(names)]; // Remove duplicates
  });

  // ✅ Add truncate filter for search.json
  eleventyConfig.addFilter("truncate", function(content, length = 5000) {
    if (!content) return "";
    const text = content.toString();
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  });

  // ✅ Tell Eleventy where everything lives
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public"
    },
    // Fix GitHub Pages routing
    pathPrefix: "/Dyo-s-Dubious-Domain/"
  };
};
