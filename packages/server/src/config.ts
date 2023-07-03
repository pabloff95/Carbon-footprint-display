export default (): Record<string, unknown> => ({
  PORT: parseInt(process.env.PORT || '3000'),
  DATABASE_URL: parseInt(process.env.DATABASE_URL ?? ''),
})
