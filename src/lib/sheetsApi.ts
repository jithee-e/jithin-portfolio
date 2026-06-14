export interface SheetInquiry {
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Creates a brand new Google Spreadsheet for Portfolio Inquiries.
 * Returns the created Spreadsheet ID.
 */
export async function createSpreadsheet(accessToken: string): Promise<string> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Jithin Rajan Portfolio Inquiries',
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Failed to create Google Spreadsheet');
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  if (!spreadsheetId) {
    throw new Error('Spreadsheet ID was not returned by Google Sheets API');
  }

  // Add sheet headers
  await appendRowData(spreadsheetId, accessToken, 'Sheet1', [
    'Timestamp (UTC)',
    'Sender Name',
    'Email Address',
    'Subject Matter',
    'Message Content'
  ]);

  return spreadsheetId;
}

/**
 * Check if a Spreadsheet exists and is accessible
 */
export async function checkSpreadsheetAccess(spreadsheetId: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.ok;
  } catch (err) {
    console.error('Error checking spreadsheet access:', err);
    return false;
  }
}

/**
 * Appends row data to Google Sheets
 */
export async function appendRowData(
  spreadsheetId: string,
  accessToken: string,
  rangeOrSheet: string,
  rowValues: string[]
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangeOrSheet}:append?valueInputOption=USER_ENTERED`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Failed to append row to Google Sheets');
  }
}

/**
 * Sync inquiries in batch to the Google Sheet
 */
export async function syncInquiriesToSheet(
  spreadsheetId: string,
  accessToken: string,
  inquiries: SheetInquiry[]
): Promise<void> {
  for (const inquiry of inquiries) {
    const row = [
      inquiry.timestamp,
      inquiry.name,
      inquiry.email,
      inquiry.subject,
      inquiry.message
    ];
    // We target 'Sheet1!A:E'
    await appendRowData(spreadsheetId, accessToken, 'Sheet1!A:E', row);
  }
}
