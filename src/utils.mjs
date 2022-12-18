import { markdownTable } from 'markdown-table';

/**
 * Generate a GitHub flavored markdown (GFM) table
 * @param {Object[]} folders Array of folders to include in table
 * @returns GFM table with columns of path, version, tf file
 */
export function generateMarkdownTable(folders) {
  const columnHeaders = ['Path', 'Version', '.terraform-version file'];
  const data = [columnHeaders];

  const table = markdownTable(
    data.concat(folders.map((f) => [f.path, f.version, f.containsTfFile])),
  );

  return table;
}
