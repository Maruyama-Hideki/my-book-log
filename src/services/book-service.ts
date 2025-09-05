import { createClient } from "@/lib/supabase/client";

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

export const insertUserBook = async (userId: string, book: any) => {
    const supabase = createClient();
    if(!supabase) {
        throw new Error("Supabase client not initialized");
    }
    const { error } = await supabase
        .from("books")
        .insert(book);

    if (error && error.code === "23505") {
        console.error("本がすでに本棚に登録されています");
      } else if (error) {
        throw error;
      }
}
