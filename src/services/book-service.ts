import { createClient } from "@/lib/supabase/client";
import { DuplicateBookError, DataBaseError } from "@/lib/errors/bookErrors";
import { Database } from "@/types/database.types";

export const fetchBooks = async (userId:string, status?:string) => {
    const supabase = createClient();
    if(!supabase) {
        throw new Error("Supabase client not initialized");
    }
    
    let query = supabase.from("books").select("*").eq("user_id", userId);
    if(status) {
        query = query.eq("status", status);
    }
    query = query.order("created_at", { ascending: false });
    const { data, error } = await query;

    if(error) {
        throw error;
    }
    return data;
}

export const deleteBook = async (userId: string, bookId: string, status?:string) => {
    const supabase = createClient();
    if(!supabase) {
        throw new Error("Supabase client not initialized");
    }

    let query = supabase.from("books").delete().eq("user_id", userId).eq("id", bookId);
    if(status) {
        query = query.eq("status", status);
    }
    const { error } = await query;

    if(error) {
        throw error;
    }
}

export const insertUserBook = async (book: Database["public"]["Tables"]["books"]["Insert"]) => {
    const supabase = createClient();
    if(!supabase) {
        throw new Error("Supabase client not initialized");
    }
    const { data,error } = await supabase
        .from("books")
        .insert(book)
        .select()
        .single();

    if (error && error.code === "23505") {
        throw new DuplicateBookError();
      } else if (error) {
        throw new DataBaseError();
      }
    return data;
}
