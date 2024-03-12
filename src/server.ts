import { envs } from "./config/enviroments/enviroment";
import app from './app';


async function main(){
  try {


  } catch (e) {
    console.error(e)
  }
}


main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
})