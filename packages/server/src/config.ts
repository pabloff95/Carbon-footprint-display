/* eslint-disable @typescript-eslint/naming-convention */

export default (): Record<string, unknown> => ({
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: parseInt(process.env.DATABASE_URL ?? '', 10),
});
