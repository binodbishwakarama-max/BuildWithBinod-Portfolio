/**
 * Contact form submission utility
 * Proxies requests to backend to keep API credentials secure
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    const endpoint = import.meta.env.VITE_CONTACT_FORM_URL;
    
    if (!endpoint) {
      console.warn('VITE_CONTACT_FORM_URL not configured. Using fallback.');
      // Fallback: submit directly to Web3Forms (less secure but works for demo)
      // In production, ALWAYS use a backend endpoint
      return submitToWeb3Forms(formData);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
}

/**
 * Fallback Web3Forms submission (less secure, backend preferred)
 * Only used if backend endpoint not configured
 */
async function submitToWeb3Forms(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'your_key_here',
        ...formData,
      }),
    });

    const result = await response.json();
    return {
      success: result.success,
      message: result.message,
      error: result.success ? undefined : 'Form submission failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
