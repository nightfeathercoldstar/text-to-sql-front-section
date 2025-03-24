export type Language = 'en' | 'es' | 'zh-Hans' | 'ja';

export interface AppInfo {
  title: string;
  description: string;
  logo: string;
  icon: string;
  copyright: string;
  privacy_policy: string;
  default_language: Language;
}

export interface PromptVariable {
  key: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
  max_length?: number;
}

export interface PromptConfig {
  prompt_template: string;
  prompt_variables: PromptVariable[];
} 