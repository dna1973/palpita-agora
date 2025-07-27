export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      matches: {
        Row: {
          created_at: string
          id: number
          match_date: string
          pool_id: number
          score_a: number | null
          score_b: number | null
          team_a_name: string
          team_b_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          match_date: string
          pool_id: number
          score_a?: number | null
          score_b?: number | null
          team_a_name: string
          team_b_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          match_date?: string
          pool_id?: number
          score_a?: number | null
          score_b?: number | null
          team_a_name?: string
          team_b_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "pools"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_options: {
        Row: {
          created_at: string
          id: number
          option_text: string
          poll_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          option_text: string
          poll_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          option_text?: string
          poll_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          creator_user_id: number
          description: string | null
          end_date: string
          id: number
          start_date: string
          status: Database["public"]["Enums"]["poll_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_user_id: number
          description?: string | null
          end_date: string
          id?: number
          start_date: string
          status?: Database["public"]["Enums"]["poll_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_user_id?: number
          description?: string | null
          end_date?: string
          id?: number
          start_date?: string
          status?: Database["public"]["Enums"]["poll_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_creator_user_id_fkey"
            columns: ["creator_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pools: {
        Row: {
          admin_user_id: number
          created_at: string
          description: string | null
          end_date: string
          id: number
          name: string
          start_date: string
          status: Database["public"]["Enums"]["pool_status"]
          updated_at: string
        }
        Insert: {
          admin_user_id: number
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          name: string
          start_date: string
          status?: Database["public"]["Enums"]["pool_status"]
          updated_at?: string
        }
        Update: {
          admin_user_id?: number
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["pool_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pools_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_bets: {
        Row: {
          created_at: string
          id: number
          match_id: number
          points_awarded: number | null
          predicted_score_a: number
          predicted_score_b: number
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          match_id: number
          points_awarded?: number | null
          predicted_score_a: number
          predicted_score_b: number
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          match_id?: number
          points_awarded?: number | null
          predicted_score_a?: number
          predicted_score_b?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_bets_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_poll_votes: {
        Row: {
          created_at: string
          id: number
          poll_id: number
          user_id: number
          voted_option_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          poll_id: number
          user_id: number
          voted_option_id: number
        }
        Update: {
          created_at?: string
          id?: number
          poll_id?: number
          user_id?: number
          voted_option_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_poll_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_poll_votes_voted_option_id_fkey"
            columns: ["voted_option_id"]
            isOneToOne: false
            referencedRelation: "poll_options"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: number
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      poll_status: "open" | "closed"
      pool_status: "open" | "closed" | "finished"
      user_role: "admin" | "participant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      poll_status: ["open", "closed"],
      pool_status: ["open", "closed", "finished"],
      user_role: ["admin", "participant"],
    },
  },
} as const
