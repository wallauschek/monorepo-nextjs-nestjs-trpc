import { Cookie } from "next-cookie";
import { trpc } from "@web/app/trpc";
import { decode } from "jsonwebtoken";

class ChamadasBackEnd {

  async refreshToken({ refresh_token }: { refresh_token: string }) {
    if (refresh_token) {
      const decoded = decode(refresh_token);
      const userId = String(decoded?.sub);

      return await trpc.refreshToken
        .query({
          userId,
          refresh_token,
        })
        .then((response: any) => {
          return response;
        })
        .catch((err: any) => {
          console.log(err);

          return err;
        });
    }
  }

  async getUser() {
    const token = new Cookie().get("access_token") as string;
    if (token) {
      return trpc.getUser
        .query()
        .then((response: any) => {
          return response;
        })
        .catch((err: any) => {
          console.log(err);

          return err;
        });
    }
  }

  async recuperarSenha(data: any) {
    return await trpc.recoveryPassword
      .query(data)
      .then((response: any) => {
        console.log(
          "🚀 ~ ChamadasBackEnd ~ returntrpc.recoveryPassword.query ~ response:",
          response
        );

        return response;
      })
      .catch((err: any) => {
        console.log("🚀 ~ ChamadasBackEnd ~ recuperarSenha ~ err:", err);
      });
  }

  async salvarNovaSenha(data: any) {
    return trpc.resetPassword
      .query(data)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async logout() {
    return trpc.logout
      .query()
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async buscaNotasBoletim(
    coligada: number,
    periodoLetivo: string,
    ra: string
  ) {
    const token = new Cookie().get("access_token") as string;
    if (token) {
      return trpc.buscarNotasBoletim
        .query({
          coligada,
          periodoLetivo,
          ra
        })
        .then((response: any) => {
          return response;
        })
        .catch((err: any) => {
          console.log(err);

          return err;
        });
    }
  }
  async buscaFaltasCELBoletim(
    periodoLetivo: string,
    ra: string
  ) {
    const token = new Cookie().get("access_token") as string;
    if (token) {
      return trpc.buscarFaltasCELBoletim
        .query({
          periodoLetivo,
          ra
        })
        .then((response: any) => {
          return response;
        })
        .catch((err: any) => {
          console.log(err);

          return err;
        });
    }
  }
  
  async buscaTrilhasCELBoletim(
    periodoLetivo: string,
    ra: string
  ) {
    const token = new Cookie().get("access_token") as string;
    if (token) {
      return trpc.buscarTrilhasCELBoletim
        .query({
          periodoLetivo,
          ra
        })
        .then((response: any) => {
          return response;
        })
        .catch((err: any) => {
          console.log(err);

          return err;
        });
    }
  }
}

export default new ChamadasBackEnd();
