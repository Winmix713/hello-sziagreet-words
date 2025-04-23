
import { NextJsRoute } from "./types";

export function analyzeNextJsRoutes(files: File[]): NextJsRoute[] {
  const routes: NextJsRoute[] = [];
  const layouts = new Map<string, string>();
  
  files.forEach(file => {
    if (file.name.match(/\/_layout\.(tsx|jsx|js|ts)$/)) {
      const dirPath = file.name.replace(/\/[^/]+$/, '');
      layouts.set(dirPath, file.name);
    }
  });
  
  files.forEach(file => {
    if (file.name.includes('pages/') && !file.name.includes('/_') && 
        !file.name.endsWith('.css') && !file.name.endsWith('.scss')) {
      const path = file.name
        .replace(/^pages/, '')
        .replace(/\.(tsx|jsx|js|ts)$/, '')
        .replace(/\/index$/, '/');

      const isIndex = file.name.endsWith('index.tsx') || file.name.endsWith('index.jsx') || 
                     file.name.endsWith('index.js') || file.name.endsWith('index.ts');
                     
      const isOptionalCatchAll = path.includes('[[') && path.includes(']]');
      const isCatchAll = path.includes('[...') && path.includes(']');
      const isDynamic = path.includes('[') && path.includes(']');
      
      const params = isDynamic 
        ? path.match(/\[(\.{0,3}[^\]]*)\]/g)?.map(p => p.replace(/[\[\]]/g, ''))
        : [];

      let layoutFile = null;
      let dirPath = file.name.replace(/\/[^/]+$/, '');
      while (dirPath !== 'pages') {
        if (layouts.has(dirPath)) {
          layoutFile = layouts.get(dirPath);
          break;
        }
        dirPath = dirPath.replace(/\/[^/]+$/, '');
      }

      routes.push({
        path,
        component: file.name,
        isDynamic,
        hasParams: isDynamic,
        params,
        layout: layoutFile,
        isIndex,
        isOptionalCatchAll,
        isCatchAll
      });
    }
  });

  return routes;
}
