# FT_TRANSENDENCE
``` 📌 This project is about creating a website for the mighty Pong contest! ```

<details>
 <summary> <h3>🖇️ Project Description <h2> </summary>

  ![1](https://github.com/denizkarhan/transcendence/assets/81527587/2d20e4b5-5920-435f-9fd3-eaeb8dd07910)
  ![2](https://github.com/denizkarhan/transcendence/assets/81527587/d9cd285d-4608-4963-b335-593085055edf)
  ![3](https://github.com/denizkarhan/transcendence/assets/81527587/39a9066e-72c2-4176-a609-ff030b642b42)
  ![4](https://github.com/denizkarhan/transcendence/assets/81527587/b383b662-b917-4a33-b61c-e841d11efd50)
  ![5](https://github.com/denizkarhan/transcendence/assets/81527587/6988746c-7594-4327-9a23-f1981b6e424f)
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

      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash source ~/.bashrc
  <img width="842" alt="Ekran Resmi 2023-05-08 ÖS 5 00 54" src="https://github.com/denizkarhan/transcendence/assets/81527587/78955116-c4a3-4db0-a1e5-e54742dd0822">
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

  ![Ekran görüntüsü 2023-07-08 145523](https://github.com/denizkarhan/transcendence/assets/81527587/678e7dd2-f2fb-4422-8f3d-54f024cdf078)
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

  <img width="1168" alt="SqlTable" src="https://github.com/denizkarhan/transcendence/assets/81527587/899296b5-89d0-4338-b820-602a6b7009af">
  <img width="1077" alt="182686678-54c00bf9-be17-4c1c-bb00-2b039d11c389" src="https://github.com/denizkarhan/transcendence/assets/81527587/e8fe9c69-93ee-49f3-89d2-a58d89262e69">

</details>

<details> <summary><h3>🟢 6) Diğer </h3></summary>

<details> <summary><h3>🔴 6.1)  psql -U postgres auth hatası çözümü </h3></summary>

  <img width="749" alt="Screen Shot 2023-05-08 at 4 50 37 PM" src="https://github.com/denizkarhan/transcendence/assets/81527587/ce0847ec-e767-4734-888e-89f68b6f005b">
</details>

<details> <summary><h3>🔴Authentication </h3></summary>

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





``` 🛡️ NestJS ```
``` 🗡️ React ```
``` 💾 PostgreSQL ```
