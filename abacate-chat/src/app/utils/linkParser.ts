export function parseSearchLink(link: string): string | null {
      const query = new URL(link).searchParams.get("query");
      return query ? decodeURIComponent(query) : null;
  }
  
  export function isSearchLink(text: string): boolean {
      const url = new URL(text);
      return url.searchParams.has("query");
    } 
  
  export function convertToLocalUrl(link: string): string | null {
    const query = parseSearchLink(link);
    return query ? `/?query=${encodeURIComponent(query)}` : null;
  }
  