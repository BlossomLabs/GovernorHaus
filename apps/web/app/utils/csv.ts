export function csvStringToArray(
  strData: string,
  strDelimiter = "\t",
): string[][] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  let i = 0;
  const len = strData.length;

  // Normalize line endings to \n
  const str = strData.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  while (i < len) {
    const c = str[i];

    if (c === '"') {
      if (inQuotes) {
        if (i + 1 < len && str[i + 1] === '"') {
          // Escaped double quote
          field += '"';
          i++;
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        // Opening quote
        inQuotes = true;
      }
    } else if (c === strDelimiter && !inQuotes) {
      // Field separator
      row.push(field);
      field = "";
    } else if (c === "\n" && !inQuotes) {
      // End of record
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      // Regular character
      field += c;
    }
    i++;
  }

  // Add the last field and row if necessary
  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
