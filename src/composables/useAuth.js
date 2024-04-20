// useAuth.js
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function useAuth() {
  const user = ref(null);

  const getUser = async () => {
    const session = supabase.auth.session();
    if (session) {
      user.value = session.user;
    } else {
      user.value = null;
    }
  };

  useEffect(() => {
    getUser();

    const sessionChangeSubscription = supabase.auth.onAuthStateChange((session) => {
      user.value = session?.user || null;
    });

    return () => {
      sessionChangeSubscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    // Implement Supabase sign-in logic
  };

  const signOut = async () => {
    // Implement Supabase sign-out logic
  };

  return { user };
}
