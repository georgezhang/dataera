# DataEra IT Association

### Prerequisites
- install mongodb
- install node.js (will install npm together)
- install git
- install nodemon

### start mongodb in one terminal session

```bash
mongod
```

### build project

``` bash
git clone https://github.com/georgezhang/dataera.git
cd dataera
cd dataera-keystone
# create an environment files
touch .env
# ask george to get the sample of the content like below
#
# COOKIE_SECRET=o790287r90283729874297928749sfy98fyssfsf
# CLOUDINARY_URL=cloudinary://298797979879:lfajwijf2342342@sfjslfjsl
# MONGO_URI=mongodb://localhost/dataera
#
npm install

# after completed successfully
# you can start the project now
nodemon keystone
```

### Go to browser and visit http://localhost:3000

### Go to browser and visit http://localhost:3000/keystone

```
username:
admin@dataera.ca

password:
admin

```

***
### Reference
***

- [Bootstrap 4](https://getbootstrap.com/)
- [Material UI](https://mdbootstrap.com/docs/jquery/)
- [KeystoneJS](https://keystonejs.netlify.com/getting-started)

- [Host ASP.NET Core on Linux with Nginx](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-2.2)
