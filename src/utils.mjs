import { markdownTable } from 'markdown-table';

export function generateMarkdownTable(folders) {
  const columnHeaders = ['Path', 'Version', '.terraform-version file'];
  const data = [columnHeaders];

  const table = markdownTable(
    data.concat(folders.map((f) => [f.path, f.version, f.containsTfFile])),
  );

  return table;
}
