/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://chriscelaya.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://chriscelaya.com/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
  },
  exclude: ['/api/*', '/admin/*'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom transform function for URLs
    const priorities = {
      '/': 1.0,
      '/projects': 0.9,
      '/case-studies': 0.9,
      '/about': 0.8,
      '/experience': 0.8,
      '/skills': 0.7,
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
