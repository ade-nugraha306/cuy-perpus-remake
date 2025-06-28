## CuyPerpus

Menyediakan RESTful API untuk mengelola sistem perpustakaan digital dengan empat endpoint API utama diantara nya adalah:

- **Auth** / **Login / Register** Endpoint

|Method|Endpoint|Deskripsi|
|------|--------|---------|
|`POST`|`/api/auth/login`|Login user dan generate session|
|`POST`|`/api/auth/register`|Register user dan generate session|
|`GET`|`/api/auth/me`|Menampilkan status user|
|`POST`|`/api/auth/logout`|Logout & hapus session cookie|

- **Books Endpoint**

|Method|Endpoint|Deskripsi|
|------|--------|---------|
|`GET`|`/api/books`|Mendapatkan semua data buku|
|`GET`|`/api/books/:id`|Mendapatkan semua data buku berdasarkan ID|
|`POST`|`/api/books/`|Membuat data baru (hanya admin dan petugas)|
|`EDIT`|`/api/books/:id`|Mengedit data (hanya admin dan petugas)|
|`DELETE`|`/api/books/:id`|Menghapus data berdasarkan ID (hanya admin dan petugas)|

- **Users Endpoint** 

|Method|Endpoint|Deskripsi|
|------|--------|---------|
|`GET`|`/api/users`|Mendapatkan semua data user|
|`GET`|`/api/users/:id`|Mendapatkan semua data user berdasarkan ID|

- **Borrows Endpoint**

|Method|Endpoint|Deskripsi|
|------|--------|---------|
|`GET`|`/api/borrows`|Mendapatkan semua data peminjaman|
|`GET`|`/api/borrows/:id`|Mendapatkan semua data peminjaman berdasarkan ID|
|`POST`|`/api/borrows/`|Membuat data baru dan set data peminjaman default `PENDING` (hanya admin dan petugas)|
|`EDIT`|`/api/borrows/:id`|Update status peminjaman (hanya admin dan petugas)|
|`DELETE`|`/api/borrows/:id`|Menghapus data berdasarkan ID (hanya admin dan petugas)|

Contoh Response standar:

- **200**

```json
{
  "status":"200",
  "message":"Success",
  "data":{...},
}
```

- **201**

```json
{
  "status":"201",
  "message":"Success",
  "data":{...},
}
```

- **400**

```json
{
  "status":"400",
  "message":"Bad Request"
}
```

- **401**

```json
{
  "status":"401",
  "message":"Unauthorized: Please login"
}
```

- **403**

```json
{
  "status":"403",
  "message":"Forbidden: Insufficient privileges"
}
```

- **404**

```json
{
  "status":"404",
  "message":"Endpoint Not Found"
}
```

- **500**

```json
{
  "status":"500",
  "message":"Internal Server Error"
}
```

