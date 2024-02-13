import { apiBaseUrl } from "../env";

export async function addSchema(schemaUrl: string) {
    const response = await fetch(`${apiBaseUrl}/schema/add`, {
        method: 'POST',
        body: JSON.stringify({
          schemaUrl: schemaUrl,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
    return response.json();
}

export async function submitForm(id: string, formData: Record<string, any>) {
    const response = await fetch(`${apiBaseUrl}/schema/submit`, {
        method: 'POST',
        body: JSON.stringify({id, formData}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    return response.json();
}