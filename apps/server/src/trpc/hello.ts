import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';

export function helloRouter(trpc: TrpcService) {
  return trpc.router({
    hello: trpc.publicProcedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : 'Bilbo'}`,
        };
      }),
  });
}
