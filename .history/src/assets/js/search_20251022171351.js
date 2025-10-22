// Simple test to make sure JavaScript is loading
console.log('Search.js loaded!');

// Search functionality
let searchIndex = null;
let searchPosts = [];

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM ready, initializing search...');
  
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) {
    console.error('Search elements not found!');
    return;
  }
  
  console.log('Search elements found, loading data...');
  
  try {
    // Load search data - handle GitHub Pages path
    const basePath = window.location.hostname === 'uwaniumnya.github.io' ? '/Dyo-s-Dubious-Domain' : '';
    const searchUrl = `${basePath}/search.json`;
    console.log('Loading search data from:', searchUrl);
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    console.log('Response text length:', responseText.length);
    
    try {
      searchPosts = JSON.parse(responseText);
      console.log('Loaded posts:', searchPosts.length);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('First 500 chars of response:', responseText.substring(0, 500));
      throw new Error('Invalid JSON format in search data');
    }
    
    // Build Lunr index
    searchIndex = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('author', { boost: 5 });
      this.field('description', { boost: 3 });
      this.field('category', { boost: 2 });
      this.field('tags', { boost: 8 });
      this.field('content');
      // Substance-specific fields
      this.field('chemicalName', { boost: 8 });
      this.field('legalStatus', { boost: 1 });
      this.field('alternativeNames', { boost: 15 }); // Highest boost for alternative names
      
      // Add documents to index
      for (const post of searchPosts) {
        // For substances, store original array for display but create searchable text
        if (post.type === 'substance') {
          post.originalAlternativeNames = Array.isArray(post.alternativeNames) ? [...post.alternativeNames] : [];
          post.alternativeNames = Array.isArray(post.alternativeNames) ? post.alternativeNames.join(' ') : '';
        }
        
        // Ensure all fields exist to prevent Lunr errors
        post.author = post.author || '';
        post.tags = post.tags || '';
        post.chemicalName = post.chemicalName || '';
        post.legalStatus = post.legalStatus || '';
        post.alternativeNames = post.alternativeNames || '';
        
        this.add(post);
      }
    });
    
    console.log('Search index built successfully');
    
  } catch (error) {
    console.error('Failed to load search data:', error);
    return;
  }
  
  // Set up search input handlers
  let searchTimeout;
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim();
    console.log('Search input event:', query);
    
    if (query.length >= 2) {
      // Provide loading feedback
      searchResults.innerHTML = '<div class="search-loading">Searching for "' + query + '"...</div>';
      searchResults.style.display = 'block';
      
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(query, searchResults);
      }, 300);
    } else {
      searchResults.style.display = 'none';
    }
  });
  
  // Also trigger search on Enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = e.target.value.trim();
      console.log('Enter pressed, searching for:', query);
      clearTimeout(searchTimeout);
      performSearch(query, searchResults);
    }
  });
  
  // Hide search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      searchResults.style.display = 'none';
    }
  });
});

function performSearch(query, searchResults) {
  console.log('performSearch called with:', query);
  
  if (!query || query.length < 2) {
    console.log('Query too short, hiding results');
    searchResults.style.display = 'none';
    return;
  }
  
  if (!searchIndex) {
    console.error('Search index not ready');
    searchResults.innerHTML = '<div class="search-loading">Search index loading...</div>';
    searchResults.style.display = 'block';
    return;
  }
  
  console.log('Search index ready, posts loaded:', searchPosts.length);
  
  try {
    console.log('Attempting to search for:', query);
    const results = searchIndex.search(query);
    console.log('Raw search results:', results);
    
    if (results.length === 0) {
      // Try a simpler search
      const simpleResults = searchIndex.search(query + '*');
      console.log('Wildcard search results:', simpleResults);
      
      if (simpleResults.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found for "' + query + '"</div>';
        searchResults.style.display = 'block';
        return;
      }
      results.push(...simpleResults);
    }
    
    console.log('Final results to display:', results.length);
    displayResults(results, query, searchResults);
    
  } catch (error) {
    console.error('Search error:', error);
    searchResults.innerHTML = '<div class="search-error">Search error: ' + error.message + '</div>';
    searchResults.style.display = 'block';
  }
}

function displayResults(results, query, searchResults) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <p>No results found for "${query}"</p>
        <small>Try searching for substance names (e.g., "MDMA", "LSD", "molly") or archive categories like "Books", "Forum"</small>
      </div>
    `;
    searchResults.style.display = 'block';
    return;
  }

  // Find items by ID since Lunr returns refs
  const resultItems = results.slice(0, 10).map(result => {
    return searchPosts.find(item => item.id === result.ref);
  }).filter(item => item);

  // Separate substances and posts
  const substances = resultItems.filter(item => item.type === 'substance');
  const posts = resultItems.filter(item => item.type === 'post');

  let html = '';

  // Display substances first if any found
  if (substances.length > 0) {
    const substanceHtml = substances.map(substance => {
      const title = highlightSearchTerms(substance.title || 'Unknown Substance', query);
      const chemicalName = substance.chemicalName ? 
        `<span class="chemical-name">${highlightSearchTerms(substance.chemicalName, query)}</span>` : '';
      
      // Show matching alternative names
      let altNamesHtml = '';
      const altNames = substance.originalAlternativeNames || [];
      if (altNames.length > 0) {
        const matchingAltNames = altNames.filter(name => 
          name.toLowerCase().includes(query.toLowerCase())
        );
        if (matchingAltNames.length > 0) {
          altNamesHtml = `<div class="alt-names">Also known as: ${matchingAltNames.map(name => 
            highlightSearchTerms(name, query)
          ).join(', ')}</div>`;
        } else {
          // Show first few alternative names
          altNamesHtml = `<div class="alt-names">Also known as: ${altNames.slice(0, 3).join(', ')}</div>`;
        }
      }
      
      const description = truncateText(
        highlightSearchTerms(substance.description || '', query),
        120
      );
      
      return `
        <div class="search-result substance-result">
          <h4><a href="${substance.url}">${title}</a></h4>
          ${chemicalName}
          <p class="search-result-meta">
            <span class="category substance-category">${substance.category}</span> • 
            <span class="legal-status">${substance.legalStatus || 'Unknown legal status'}</span>
          </p>
          ${altNamesHtml}
          <p class="search-result-description">${description}</p>
        </div>
      `;
    }).join('');

    html += `
      <div class="search-section">
        <h3 class="search-section-title">🧪 Substances (${substances.length})</h3>
        ${substanceHtml}
      </div>
    `;
  }

  // Display posts/archives if any found
  if (posts.length > 0) {
    const postsHtml = posts.map(post => {
      const title = highlightSearchTerms(post.title || 'Untitled', query);
      const description = truncateText(
        highlightSearchTerms(post.description || '', query),
        120
      );
      
      return `
        <div class="search-result post-result">
          <h4><a href="${post.archive || post.url}" target="_blank">${title}</a></h4>
          <p class="search-result-meta">
            <span class="category">${post.category}</span> • 
            <span class="author">${post.author}</span>
          </p>
          <p class="search-result-description">${description}</p>
        </div>
      `;
    }).join('');

    html += `
      <div class="search-section">
        <h3 class="search-section-title">📚 Archives (${posts.length})</h3>
        ${postsHtml}
      </div>
    `;
  }

  const totalResults = substances.length + posts.length;
  searchResults.innerHTML = `
    <div class="search-results-header">
      <span>Found ${results.length} result${results.length !== 1 ? 's' : ''}</span>
      ${results.length > 10 ? `<small>Showing first 10 results</small>` : ''}
    </div>
    ${html}
  `;
  
  searchResults.style.display = 'block';
}

function highlightSearchTerms(text, query) {
  if (!text) return '';
  
  const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
  let highlightedText = text;
  
  terms.forEach(term => {
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
  });
  
  return highlightedText;
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}