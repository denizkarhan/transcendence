# FT_TRANSENDENCE
``` 📌 This project is about creating a website for the mighty Pong contest! ```

<details>
 <summary> <h3>🖇️ Project Description <h2> </summary>
	 
![1](https://github.com/denizkarhan/transcendence/assets/81527587/718c11c6-e3a5-4b06-a58f-dffc6abc8bae)
![2](https://github.com/denizkarhan/transcendence/assets/81527587/7783d95a-beb2-4f20-9593-5df06feb297b)
![3](https://github.com/denizkarhan/transcendence/assets/81527587/c8b534f1-7d58-4c19-a83f-8cea7068ad9a)
![4](https://github.com/denizkarhan/transcendence/assets/81527587/aa146b6e-162d-4c95-99d7-5dfb951525d7)
![5](https://github.com/denizkarhan/transcendence/assets/81527587/d0b72ef7-309e-48a0-9edd-a2c7ae9962e9)
</details>



<details> <summary> <h3>🔵 NestJS </h3> </summary>
  <details> <summary><h3>🟢 1) NestJS 101 </h3></summary>
  
  [NestJS](https://docs.nestjs.com/), [Node.js](https://nodejs.org/en/about) tabanlı bir web uygulama çerçevesidir. TypeScript dilini kullanır ve kolay, ölçeklenebilir, yapılandırılabilir ve test edilebilir bir mimari sunar. Angular'dan esinlenmiştir.
  NestJS, sunucu tarafında web uygulamaları, mikroservisler ve ağ geçitleri oluşturmak için kullanılabilir.
  Ayrıca WebSocket gibi gerçek zamanlı uygulamalar için de kullanılabilir.
  Modüler bir yapıya sahiptir, bu da uygulamanın bölünebilirliğini ve birleştirilebilirliğini artırır. Express ve Fastify gibi Node.js HTTP sunucularının üzerine kurulmuştur.
  Bu sunucuların işlevselliğini korurken NestJS'in ek özelliklerinden de yararlanabilirsiniz.
  NestJS, diğer JavaScript veya TypeScript kütüphaneleri ve araçlarıyla kolayca entegre olabilir.
  Örneğin, TypeORM, Mongoose, Passport, GraphQL gibi yaygın kütüphanelerle uyumludur. 
  </details>


  
  <details> <summary><h3>🟢 2) NodeJS Kurulum  </h3></summary>
      <details> <summary>🔴 2.1) Ön Koşullar </summary>
        
        Lütfen işletim sisteminizde Node.js'i (sürüm >= 12, v13 hariç) kur.
  </details>

  <details> <summary>🔴 2.2) Brew İndir </summary>
      
      git clone https://github.com/Homebrew/brew homebrew
  </details>

  <details> <summary>🔴 2.3) NodeJS İndir </summary>
      
      brew update
      brew install node
      node -v
      npm -v
  </details>

  <details> <summary>🔴 2.4) Linux Alternatif </summary>
	  
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash source ~/.bashr
      
<img width="842" alt="Ekran Resmi 2023-05-08 ÖS 5 00 54" src="https://github.com/denizkarhan/transcendence/assets/81527587/3ee3d38c-2c73-47d9-9886-0e3629035dee">

  </details>
</details>

  <details> <summary><h3>🟢 3) NestJS Kurulum </h3></summary>
    💠 NestJS'in çekirdek modüllerini ve Express platformunu kur daha sonra NestJS CLI aracını yükle 💠 
    
    npm i --save @nestjs/core @nestjs/common @nestjs/platform-express
    npm i -g @nestjs/cli
  </details>


  <details> <summary><h3>🟢 4) Yeni Bİr Proje Oluştur </h3></summary>
      🏳️ Yeni bir NestJS projesi oluşturmak için aşağıdaki komutu kullanın:
      
      nest new project-name

  Projeyi oluşturduktan sonra, proje dizinine gidin ve aşağıdaki komutula proje çalıştırın 🚩
  
    cd project-name
    npm run start
    npm run start:dev => Watch Mode

  Bu komut, Node.js sunucusunu başlatır ve NestJS uygulamanızı çalıştırır. Varsayılan olarak, uygulamanız **`http://localhost:3000`** adresinde çalışır.
  Bu adımları takip ederek, NestJS ile yeni bir proje oluşturabilirsiniz. Daha sonra, uygulamanızı ihtiyaçlarınıza göre özelleştirebilir ve geliştirebilirsiniz.
  - Test adresi → **http://localhost:3000**
  </details>

  <details> <summary><h3>🟢 5) Porje İçeriği </h3></summary>
      
  **`project-name`** oluşturulacak.
  Düğüm modülleri, diğer birkaç standart dosya kurulacak ve bir `src/`dizin oluşturulacak bu src dizininde birkaç çekirdek dosya ile doldurulacaktır.

  <details> <summary>🔴 5.1) Çekirdek dosyalara genel bakış </summary>

![Ekran görüntüsü 2023-07-08 145523](https://github.com/denizkarhan/transcendence/assets/81527587/25557c48-14f4-4c3c-9931-0fbc08200c3e)

  </details>
  </details>


</details>

<details> <summary> <h3>🔵 React </h3> </summary>
  <details> <summary><h3>🟢 1) TypeScript 101 </h3></summary>

  TypeScript, JavaScript dilinin bir üst kümesidir. JavaScript diline ek olarak, tür sistemine, sınıf tabanlı nesne yönelimli programlamaya ve diğer özelliklere sahiptir.
    TypeScript, Microsoft tarafından geliştirilmiştir ve açık kaynaklıdır.
    TypeScript, JavaScript'in temel özelliklerini korurken, dilin güvenliğini ve kod kalitesini artırmak için birçok özellik ekler.
    Bu özellikler arasında tür denetimi, nesne tabanlı programlama, arayüzler, sınıflar, jenerikler, dekoratörler ve modüller bulunur.
    TypeScript, JavaScript koduyla uyumlu olduğu için, mevcut JavaScript projelerine kolayca dahil edilebilir.
    Ayrıca, TypeScript kodu, TypeScript derleyicisi kullanılarak JavaScript koduna dönüştürülebilir.
    Bu sayede, TypeScript kodu tüm modern web tarayıcılarında ve Node.js gibi platformlarda çalışabilir.
    TypeScript, büyük ölçekli projelerin geliştirilmesi için özellikle yararlıdır.
    Kodun daha açık ve anlaşılır olması, hataları erken tespit etme ve daha iyi bir kod kalitesi sağlama gibi avantajları vardır.
    Ayrıca, TypeScript, Angular, React, Vue.js gibi popüler web framework'lerinin de altında yatan dil olarak kullanılır.

  <details> <summary><h3>🔴 1.1) TypeScript Framework’leri Nelerdir? </h3></summary>

  TypeScript, JavaScript'in bir üst kümesi olduğu için, birçok JavaScript framework'ü de TypeScript ile kullanılabilir.
  TypeScript'in ek özellikleri, özellikle büyük ölçekli projelerde kod kalitesini ve güvenliğini artırır.
  İşte TypeScript ile kullanılabilecek popüler JavaScript framework'lerinden bazıları:

1. **[Angular](https://angular.io/docs)**: Google tarafından geliştirilen Angular, TypeScript tabanlı bir web framework'üdür. Angular, büyük ölçekli web uygulamaları geliştirmek için tasarlanmıştır ve Angular CLI gibi araçlarla kolayca kullanılabilir.
    
    [NestJS Step-by-Step: Connecting NestJS with Angular (Part 4)](https://www.codemag.com/Article/2005051/NestJS-Step-by-Step-Connecting-NestJS-with-Angular-Part-4)
    
2. **[React](https://legacy.reactjs.org/docs/getting-started.html)**: Facebook tarafından geliştirilen React, birçok geliştirici tarafından en popüler JavaScript framework'ü olarak kabul edilir. TypeScript ile birlikte kullanıldığında, React uygulamaları daha güvenli hale gelir ve hata ayıklama daha kolay hale gelir. 
    
    [Modern Full-Stack Development with Nest.js, React, TypeScript, and MongoDB: Part 2](https://auth0.com/blog/modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-2/#Building-the-Frontend-with-React-and-TypeScript)
    
3. **[Vue](https://vuejs.org/guide/introduction.html)**: Vue.js, son zamanlarda popülerlik kazanan bir JavaScript framework'üdür. TypeScript ile birlikte kullanılabilir ve büyük ölçekli projelerde de kullanılmaktadır.
4. **[NestJS](https://docs.nestjs.com/)**: NestJS, TypeScript tabanlı bir Node.js web framework'üdür. NestJS, sınıf tabanlı nesne yönelimli programlama prensiplerine dayanır ve Angular gibi bir yapıya sahiptir.
5. **[Express](https://expressjs.com/)**: Express, Node.js için popüler bir web framework'üdür. TypeScript ile birlikte kullanılabilir ve büyük ölçekli projelerde de başarılı bir şekilde kullanılmaktadır. (Frontend değil)
  </details>
  </details>

  <details> <summary><h3>🟢 2) React 101 </h3></summary>

React, basit, verimli ve güçlü bir JavaScript kütüphanesidir. Bileşen tabanlı bir yaklaşım sunar ve kullanıcı arayüzünü parçalara ayırır. Her bileşen kendi mantığı ve görüntüsüyle çalışır. Bu yapı sayesinde kodunuz daha okunabilir ve yeniden kullanılabilir hale gelir.

React, Virtual DOM (sanal DOM) kullanarak performansı artırır. Sadece değişen bileşenleri güncelleyerek kaynakları minimumda kullanır. Ayrıca, bileşen ömür döngüsü yönetimiyle, bileşenlerin oluşturulması, güncellenmesi ve yok edilmesi aşamalarında istediğiniz işlemleri gerçekleştirebilirsiniz.

React, geniş bir ekosisteme ve aktif bir topluluğa sahiptir. Üçüncü taraf kütüphaneler, araçlar ve eklentilerle desteklenir. Ayrıca, zengin bir kaynak ve dokümantasyon arşivi vardır.

React, modern web uygulamalarını hızlı, etkili ve kaliteli bir şekilde geliştirmek için ideal bir seçimdir. Basitliği, verimliliği ve geniş topluluk desteğiyle öne çıkar.
  </details>
</details>


<details> <summary> <h3>🔵 PostgreSQL </h3> </summary>
  <details> <summary><h3>🟢 1) PostgreSQL İndirilir </h3></summary>
  
  * brew update   →   ``` Paket yükselt ```
  * brew install postgresql   →    ``` PostgreSQL indir ```
  * postgres --version   →    ``` Version kontrolü ```
  * brew services start postgresql   →   ``` Servisi başlat ```
  * brew services list   →   ``` Çalışan Servisleri göster ```
  * psql   →   ``` PostgreSQL’e bağlan ```
  * brew services stop postgresql   →   ``` PostgreSQL'i durdur ```
  </details>

  <details> <summary><h3>🟢 2) TypeOrm Kurulumu </h3></summary>

  - npm install typeorm --save
  - npm install reflect-metadata --save
  - npm install @types/node --save-dev
  - npm install pg --save
  - npm add @nestjs/typeorm typeorm postgresql

  </details>

  <details> <summary><h3>🟢 3) app.module.ts </h3></summary>
```
  import "reflect-metadata";
  import { TypeOrmModule } from '@nestjs/typeorm'; 
  ```

  ```
imports: [TypeOrmModule.forRoot({
      type: 'postgres',
	    host: 'localhost',
	    port: 5432,
	    username: 'dkarhan',
	    password: '1',
	    database: 'mydatabase',
	    entities: [],
	    synchronize: true,
    }
  ```
  </details>

<details> <summary><h3>🟢 4) Document </h3></summary>
  
* https://www.postgresql.org/docs/current/index.html
* https://www.w3schools.com/sql/exercise.asp?filename=exercise_select1
* https://www.youtube.com/watch?v=4U54EVknm2Q&list=PLqG356ExoxZXZQt9edXkCS-_dunCq-bXm
</details>


<details> <summary><h3>🟢 5) Transcendence Sample Tables </h3></summary>

![database_example](https://github.com/denizkarhan/transcendence/assets/81527587/5b2b491b-8bbb-43ef-9b5b-65c8e694802a)

<img width="1077" alt="182686678-54c00bf9-be17-4c1c-bb00-2b039d11c389" src="https://github.com/denizkarhan/transcendence/assets/81527587/1c8ebc60-52df-4e3f-ae5e-ed6c49384f5d">

<img width="1168" alt="SqlTable" src="https://github.com/denizkarhan/transcendence/assets/81527587/8469eb36-9b07-40d9-9955-7bdeac9370a4">


</details>

<details> <summary><h3>🟢 6) Diğer </h3></summary>

<details> <summary><h3>🔴 6.1)  psql -U postgres auth hatası çözümü </h3></summary>

<img width="749" alt="Screen Shot 2023-05-08 at 4 50 37 PM" src="https://github.com/denizkarhan/transcendence/assets/81527587/579bc3d0-d8f0-4827-9fda-5c340f70c9d8">
</details>

<details> <summary><h3>🔴 6.2) Hashleme metodu </h3></summary>

```
import * as crypto from 'crypto';

const password: string = 'sifreniz';
const hash = crypto.createHash('sha256').update(password).digest('hex');

console.log(hash);
```
</details>
</details>
</details>


<details> <summary><h3>🔵 Authentication </h3></summary>

🟢 [Google Authentication](https://www.passportjs.org/packages/passport-google-oauth20/)
🟢 [Ecole 42 Authentication](https://www.passportjs.org/packages/passport-42/)

</details>
</details>

<details> <summary><h2> Registration and Login </h2></summary>
	
![Sign in](https://github.com/denizkarhan/transcendence/assets/81527587/8417ff3e-8b56-46d1-b17b-a5eaafa1014f)
![Register2](https://github.com/denizkarhan/transcendence/assets/81527587/83692102-9775-4b2d-bc27-a0839b692611)
</details>

<details> <summary><h2> 2 factor authentication </h2></summary>

![ProfileUpdated](https://github.com/denizkarhan/transcendence/assets/81527587/39fe338b-4098-480a-801e-a680764b2461)
![QRCode](https://github.com/denizkarhan/transcendence/assets/81527587/7b2dea72-714f-499d-a132-456921945e51)
![2faAuth](https://github.com/denizkarhan/transcendence/assets/81527587/04db45c4-75d3-478a-b6ba-75aa717ba5c9)
</details>

<details> <summary><h2> Profile and Follower </h2></summary>

![Profile](https://github.com/denizkarhan/transcendence/assets/81527587/b860925a-11b8-40d5-970c-b9fba69c7399)
![Follower](https://github.com/denizkarhan/transcendence/assets/81527587/10559a84-9605-44a0-8afc-480bd627700a)
</details>

<details> <summary><h2> Game </h2></summary>

![Game](https://github.com/denizkarhan/transcendence/assets/81527587/eea4951f-3763-40c9-9d63-8ad915133d1d)
![Pong](https://github.com/denizkarhan/transcendence/assets/81527587/7f988be5-de8c-4f2f-b613-c02a03e8cf2d)
![MatchHistory](https://github.com/denizkarhan/transcendence/assets/81527587/e5c2ccd0-ac3d-40eb-8da1-5ffb49847364)
![Achievements](https://github.com/denizkarhan/transcendence/assets/81527587/d1d75fab-73af-47fc-8279-6e1b4495d191)
</details>

<details> <summary><h2> Chat </h2></summary>
	
![Chat](https://github.com/denizkarhan/transcendence/assets/81527587/9052751e-c970-4053-800c-a3c5d5538e3c)
</details>




<h2> Developers </h2>

 🗝️ [Abdullah Çetin](https://github.com/abcetin)
 🧩 [Deniz Karhan](https://github.com/denizkarhan) 
 🛡️ [Metehan Erkol](https://github.com/merkol42) 
 🔭 [Taha Haksal](https://github.com/TahaHaksal) 
 🗡️ [Furkan Tuncer](https://github.com/furkantunc3r)




