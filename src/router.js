class Router {
  constructor(routes, containerId, titleId) {
    this.routes = routes;
    this.container = document.getElementById(containerId);
    this.titleElement = document.getElementById(titleId);
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  }

  handleRouting() {
    let hash = window.location.hash || '#dashboard';
    
    // Support route parameters, e.g. #jobs?id=job-1
    let params = {};
    if (hash.includes('?')) {
      const parts = hash.split('?');
      hash = parts[0];
      const queryStr = parts[1];
      const searchParams = new URLSearchParams(queryStr);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    const route = this.routes[hash] || this.routes['#dashboard'];
    this.currentRoute = hash;

    // Update active nav link
    document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === hash) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (route) {
      // Set view title in header
      if (this.titleElement) {
        this.titleElement.textContent = route.title || "CareerForge";
      }

      // Render view HTML
      if (this.container) {
        this.container.innerHTML = route.getHTML(params);
        
        // Execute dynamic initialization events
        if (typeof route.init === 'function') {
          try {
            route.init(params);
          } catch (e) {
            console.error(`Error executing init for route ${hash}:`, e);
          }
        }
      }
    } else {
      console.error(`Route not found: ${hash}`);
    }
  }

  navigate(hash) {
    window.location.hash = hash;
  }
}

export default Router;
