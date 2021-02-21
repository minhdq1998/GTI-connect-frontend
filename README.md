# frontend

Code base for GTI connect platform

The development website can be access over: [Website](https://minhdq1998.github.io/GTI-connect-frontend/)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy

**deploy.sh** will build static dist folder then push that folder to gh-pages branch <br/>
gh-pages branch is default branch for development env

```
./deploy.sh
```

### Note

use .env for production build <br/>
by default .env.deployment.local will be use when running ```npm run serve``` in local