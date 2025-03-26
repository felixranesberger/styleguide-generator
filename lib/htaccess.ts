import type { StyleguideConfiguration } from './index.ts'
import fs from 'fs-extra'

/**
 * Create a .htaccess file in the output directory
 * to enable cache control and brotli/gzip compression
 */
export async function createHtaccessFile(config: StyleguideConfiguration) {
  const outputFilePath = `${config.outDir}/.htaccess`
  const doesFileExist = await fs.pathExists(outputFilePath)
  if (doesFileExist)
    return

  const content = `
# Enable mod_rewrite
<IfModule mod_rewrite.c>
  RewriteEngine On
</IfModule>

# Enable cache control
<IfModule mod_expires.c>
  ExpiresActive On

  # Set default expiry
  ExpiresDefault "access plus 1 week"

  # JavaScript files - 1 year
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"

  # CSS files - 1 year
  ExpiresByType text/css "access plus 1 year"

  # Font files - 1 year
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"

  # SVG files - 1 year
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Set Cache-Control headers
<IfModule mod_headers.c>
  # JavaScript files
  <FilesMatch "\\.js$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # CSS files
  <FilesMatch "\\.css$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # WOFF2 font files
  <FilesMatch "\\.woff2$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # SVG files
  <FilesMatch "\\.svg$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# Enable Brotli compression if available
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json application/xml image/svg+xml
</IfModule>

# Enable gzip compression as fallback
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json application/xml image/svg+xml

  # Explicitly add font MIME types for older servers
  AddOutputFilterByType DEFLATE font/ttf font/otf font/woff font/woff2 application/font-woff application/font-woff2

  # Older browsers that don't support compression
  BrowserMatch ^Mozilla/4 gzip-only-text/html
  BrowserMatch ^Mozilla/4\\.0[678] no-gzip
  BrowserMatch \\bMSIE !no-gzip !gzip-only-text/html

  # Don't compress already compressed files
  SetEnvIfNoCase Request_URI \\.(?:gif|jpe?g|png|zip|gz|bz2|rar)$ no-gzip dont-vary
</IfModule>

# Prevent viewing of .htaccess file
<Files .htaccess>
  Order allow,deny
  Deny from all
</Files>

# Set correct content encoding
<IfModule mod_headers.c>
  # Set Vary: Accept-Encoding header to address caching proxies
  <FilesMatch "\\.(js|css|xml|svg|woff2)$">
    Header append Vary: Accept-Encoding
  </FilesMatch>
</IfModule>
  `.trimStart().trimEnd()

  await fs.outputFile(outputFilePath, content)
}
