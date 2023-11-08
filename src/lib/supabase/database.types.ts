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
      category: {
        Row: {
          id: number;
          keyword: string | null;
          meta_name: string;
          name: string;
        };
        Insert: {
          id?: number;
          keyword?: string | null;
          meta_name: string;
          name: string;
        };
        Update: {
          id?: number;
          keyword?: string | null;
          meta_name?: string;
          name?: string;
        };
        Relationships: [];
      };
      post: {
        Row: {
          author: string;
          category: number;
          created_at: string;
          full_story: string | null;
          id: number;
          meta_title: string;
          published: boolean;
          short_id: string;
          subtitle: string | null;
          title: string;
        };
        Insert: {
          author: string;
          category: number;
          created_at?: string;
          full_story?: string | null;
          id?: number;
          meta_title: string;
          published?: boolean;
          short_id: string;
          subtitle?: string | null;
          title: string;
        };
        Update: {
          author?: string;
          category?: number;
          created_at?: string;
          full_story?: string | null;
          id?: number;
          meta_title?: string;
          published?: boolean;
          short_id?: string;
          subtitle?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_category_fkey';
            columns: ['category'];
            isOneToOne: false;
            referencedRelation: 'category';
            referencedColumns: ['id'];
          },
        ];
      };
      tag: {
        Row: {
          created_at: string;
          id: number;
          meta_name: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          meta_name: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          meta_name?: string;
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
      hash_encode: {
        Args: {
          '': number;
        };
        Returns: string;
      };
      id_decode: {
        Args: {
          '': string;
        };
        Returns: unknown;
      };
      id_decode_once: {
        Args: {
          '': string;
        };
        Returns: number;
      };
      id_encode:
        | {
            Args: {
              '': number[];
            };
            Returns: string;
          }
        | {
            Args: {
              '': number;
            };
            Returns: string;
          };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
