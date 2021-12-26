## Ory 
ini adalah percobaan menggunakan ORY, yang mana masih tahap alpha. Untuk melihat docs resminya, bisa dicek disini : [Ory](https://www.ory.sh/docs/)

Berikut adalah fitur fitur yang ada pada ORY dan tersedia di repo ini :
| Name | Progress | Demo |
| --- | --- | --- |
| [Kratos](#kratos) | ![Kratos](https://img.shields.io/badge/progress-wip%2070%25-brightgreen) | [Ory Noobee](https://ory.noobee.id/kratos) & [Mailslurper](http://ory.noobee.id:4436) |
| [Cloud](#cloud) | ![cloud](https://img.shields.io/badge/progress-not%20yet-red) | - |
| [Hydra](#hydra) | ![Hydra](https://img.shields.io/badge/progress-not%20yet-red) | - |
| [Oathkeeper](#Oathkeeper) | ![Oathkeeper](https://img.shields.io/badge/progress-not%20yet-red) | - |
| [Keto](#Keto) | ![Keto](https://img.shields.io/badge/progress-not%20yet-red) | - |

### Demo :

### Tools
- Docker
- Docker Compose

### Batasan
#### Kratos
Pada `ory-kratos`, masih menggunakan docker-compose. Untuk menjalankan script, menggunakan `makefile`. Semua command bisa kamu lihat pada file ini. Kamu bisa install command `make` dengan cara :
```bash
sudo apt install make
```

Project ini masih menggunakan UI dari Ory.

### Kratos
1. Pertama, `create docker network` terlebih dahulu. Disini saya memberinama `kratos`.
    ```bash
    make create-network
    ```
2. Setelah itu, ubah konfigurasi pada `kratos/config/kratos.yaml`. Ubah `localhost` dengan host yang kamu inginkan.

3. Lalu, ubah juga host pada file `kratos/config/uri.sh`. Ini berguna untuk set env variable `URI_HOST`. Setelah diubah, jalankan dengan perintah :
    ```bash
    . ./kratos/config/uri.sh <nama host kamu>
    ``` 
4. Setelah itu, jalankan kratos dengan docker compose
    ```bash
    make run-kratos-compose
    ```

> Note : \
> Jika ingin menggunakan **reverse proxy**, maka silahkan cek config nginx pada file *kratos/config/nginx.conf*. Jika kamu punya config yg lebih simple, please let me know ^-^

### Kontak
Jika ada yang ingin ditanyakan, bisa kontak :
- Instagram => https://instagram.com/reyhanjovie
- Instagram => https://instagram.com/noobeeid
- Linkedin => https://www.linkedin.com/in/reyhanjovie
