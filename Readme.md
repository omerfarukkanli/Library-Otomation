### Kütüphane Mobil Uygulaması
##### Kullanılan Teknolojiler 

**Client**
* React Native 
* Redux 
* Expo 
* Typescript 
* Axios
* Redux Tool Kit

**Database**
* MongoDB 
* Cloudinary : Resimlerin depolandığı web sunucusu 

**Server**
* Express 
* Typescript
* Mongoose

Server : **Railway** ile deploy edildi. 

https://library-otomation.up.railway.app/books

**Proje Gereksinimleri**
* Kitap adı, ISBN Numarası, Yazar ile arama, filtreleme ve sıralama yapılabilmeli. +
* Sisteme yeni bir kitap eklenip mevcut kitaplar değiştirilip silinebilmeli. + 
* Kitaplar bir sayfada liste halinde goruntulenebilmeli, bir kitabın
detay bilgileri incelenebilmeli. + 

**Beklentilerimiz:**
* Kod standartlarına uygun yazılım geliştirilmesi + 
* Uygulamanın çalıştırılabilir hale getirilmesi için bir IDE
kullanılması gerekmemesi (APK haline getirildi) +

**Bir adım öne çıkayım derseniz:**
* Birim test içermesi elbette bir artı olarak değerlendirilir. 
* Kullanıcılar sisteme kullanıcı adı/parola ile giriş yapmalı +
* Bir yetkilendirme mekanizması içermeli. Örneğin standart kullanıcılar
kayıt oluşturabilsin ilişkilendirebilsin fakat silemesin. Yönetici tüm
eylemleri gerçekleştirebilsin. +

* Admin : Test@gmail.com
* Parola : 123456789

## Proje Kurulumu 

* Git clone ile projeyi locale indiriniz.
*  Proje içerisinde bulunan client ve server dosyalarını çalıştırabilmek için :
   * client dosyası : 
      * `cd client` 
      * `npm install` 
      * Test edebilmek için bilgisayarınızda emulator olması gerekmektedir. 
         * `yarn start` 
      * Press s diyince development build moduna geçer ve press a diyince android emulatorde açılır.
        
   * server dosyası : 
       * `cd server` 
       * `npm install` gerekli paketler indikten sonra projede .env dosyası açıp içerisine aşağıdaki gibi
         yazmanız gerekmektedir.
          
          ```sh
          DATABASE_URL=mongodb+srv://kanlomerfaruk:159753Omer@books.g0lgcx0.mongodb.net/?retryWrites=true&w=majority
          CLOUD_NAME=dyyuox25w
          API_KEY=627694213558186
          API_SECRET=vnLWxb5gjilNbiyvhizHAR5itBE
          ```  

      * `npm start` diyerek veritabanı bağlantısı yapıp localinizde 
http://localhost:3000/books istek atıp kitapları görüntüleyebilirsiniz. 

  * Projenin backend servisi railway üzerinde deploy edilmiştir.
