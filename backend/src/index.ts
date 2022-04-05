import { app } from './app';
//TODO: build your application here
const PORT = process.env.PORT || '3001';
const main = async (): Promise<void> => {
  //TODO: start your application here
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main().catch(console.error);
