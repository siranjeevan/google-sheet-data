
// Update this URL with your NEW deployed Web App URL (must end in /exec)
// Example: "https://script.google.com/macros/s/AKfycbx.../exec"
const API_URL = "https://script.google.com/macros/s/AKfycbz6nzAjsExslIePnaB0Fx99lxrugM1d11PhNVcHCKN_M0Z_MQFY2lBElX_e_K9LWcnRDg/exec";

const handleResponse = async (response) => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    if (json.status === 'error') {
      throw new Error(json.message || 'Unknown API Error');
    }
    return json;
  } catch (e) {
    if (e.message.startsWith('API Error') || e.message === 'Unknown API Error' || e.message.includes('API returned invalid')) {
      throw e;
    }
    console.error("API Error: Response was not JSON", text);
    throw new Error(`API returned invalid format. Check console. URL might be wrong. Response: ${text.substring(0, 100)}...`);
  }
};

const getUrl = (action) => {
  const separator = API_URL.includes('?') ? '&' : '?';
  return `${API_URL}${separator}action=${action}`;
};

// Map Sheet Headers to App Keys
const normalizeData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => ({
    recordId: item.recordId || item['Record ID'] || item['record id'],
    date: item.date || item['Date'] || item['date'],
    userName: item.userName || item['User Name'] || item['Name'] || item['user name'],
    sessionNo: item.sessionNo || item['Session No'] || item['Session'] || item['session no']
  }));
};

export const fetchData = async () => {
  try {
    const response = await fetch(getUrl('read'));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const rawData = await handleResponse(response);
    return normalizeData(rawData);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const createRecord = async (data) => {
  try {
    // Send data as URL parameters to ensure GAS picks it up correctly
    // regardless of CORS preflight issues with body parsing

    // Create a copy so we don't mutate input
    const cleanData = { ...data };

    // Remove recordId so GAS generates a new one. 
    // If we leave it as null/undefined, URLSearchParams converts it to "null"/"undefined" string.
    delete cleanData.recordId;

    const params = new URLSearchParams({
      ...cleanData,
      action: 'create'
    });

    const urlWithParams = `${API_URL}${API_URL.includes('?') ? '&' : '?'}${params.toString()}`;

    // Use POST with text/plain to avoid CORS strictness, but data is in URL
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

export const updateRecord = async (data) => {
  try {
    const params = new URLSearchParams({
      ...data,
      action: 'update'
    });
    const urlWithParams = `${API_URL}${API_URL.includes('?') ? '&' : '?'}${params.toString()}`;

    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

export const deleteRecord = async (id) => {
  try {
    const params = new URLSearchParams({
      recordId: id,
      action: 'delete'
    });
    const urlWithParams = `${API_URL}${API_URL.includes('?') ? '&' : '?'}${params.toString()}`;

    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};
