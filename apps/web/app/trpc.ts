import { Cookie } from "next-cookie";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/trpc/trpc.router";

export const trpc: any = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
      fetch(url, options = {}) {
        if (options.headers) {
          const token = obterTokenJWT(String(url)); // Função para obter o token JWT dinamicamente
          options.headers = {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : "",
          };
        }
        return fetch(url, options);
      },
    }),
  ],
});

function obterTokenJWT(url: string) {
  const rotasNaoAutenticadas = ["/signInLocal", "/refreshToken"];

  //verificar se url tem parte da rota não autenticada
  if (rotasNaoAutenticadas.some((rota) => url.includes(rota))) {
    return false;
  }

  //obter cookie
  const access_token = new Cookie().get("access_token") as string;

  if (!access_token) {
    return false;
  }

  return access_token;
}
