export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      article: {
        Row: {
          author: string;
          category: number;
          created_at: string;
          full_story: string | null;
          id: number;
          short_story: string | null;
          title: string;
        };
        Insert: {
          author: string;
          category: number;
          created_at?: string;
          full_story?: string | null;
          id?: number;
          short_story?: string | null;
          title: string;
        };
        Update: {
          author?: string;
          category?: number;
          created_at?: string;
          full_story?: string | null;
          id?: number;
          short_story?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'article_author_fkey';
            columns: ['author'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'article_category_fkey';
            columns: ['category'];
            referencedRelation: 'category';
            referencedColumns: ['id'];
          },
        ];
      };
      category: {
        Row: {
          alt_name: string;
          id: number;
          keyword: string | null;
          meta_title: string | null;
          name: string;
          parent_id: number;
        };
        Insert: {
          alt_name: string;
          id?: number;
          keyword?: string | null;
          meta_title?: string | null;
          name: string;
          parent_id?: number;
        };
        Update: {
          alt_name?: string;
          id?: number;
          keyword?: string | null;
          meta_title?: string | null;
          name?: string;
          parent_id?: number;
        };
        Relationships: [];
      };
      tag: {
        Row: {
          alt_name: string;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          alt_name: string;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          alt_name?: string;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      user: {
        Row: {
          created_at: string;
          id: string;
          login: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          login?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          login?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
