'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const result = await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success';
    // En NextAuth v5, cuando redirect: false, puede retornar un objeto con error o url
    if (result) {
      // Si hay error, retornar el estado de error
      if ('error' in result && result.error) {
        return 'CredentialsSignin';
      }
      
      // Si hay URL, redirigir (login exitoso)
      if ('url' in result && result.url) {
        redirect(result.url);
      }
    }

    // Si llegamos aquí sin error ni URL, redirigir a home (login exitoso)
    redirect('/');
  } catch (error) {
    console.log('Error during authentication:', error);
    return 'CredentialsSignin';
  }
}

export const login = async(email: string, password:string) => {

  try {
    await signIn('credentials', { email, password});
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al iniciar sesión. Por favor, verifica tus credenciales.'
    };
  }
}