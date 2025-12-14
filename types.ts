
export interface MedicalTerm {
  id: string;
  abbr: string;
  full_name: string;
  chinese: string;
  category: 'Diagnosis' | 'Procedure' | 'Anatomy' | 'Medication' | 'General' | 'Management' | 'Ortho';
  description?: string;
  layman_term?: string; // New field for simple explanation
}

export interface AiResponse {
  abbr: string;
  full_name: string;
  chinese: string;
  description: string;
  layman_term: string; // New required field for AI
  context_usage?: string;
  category?: string; // Added to support saving to local
}
