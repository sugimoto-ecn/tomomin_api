## 環境構築手順

### アプリケーションの起動

1. ソースコードをcloneする
```
git clone https://github.com/sugimoto-ecn/tomommin_api.git
```

2. パッケージのインストール
```
npm install
```

3. mysql準備
下記mysql準備を参照

4. アプリの起動

```
nodemon app.js
```

5. 動作確認
例)
```
http://localhost:3030/users/1/get
```

5. 停止
```
ctrl+c
```



### mysql準備

1. infraに進む
```
$ cd infra
```

2. mysql起動
```
$ docker-compose exec db bash -c 'mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}'
```

3. sequel pro 接続情報
```
host: 127.0.0.1
Username: project
Password: Passw0rd!
Port: 5306
```

4. テーブル準備
- sqlフォルダ内ファイルを順に実行



### その他
1. MySQLのデータを初期化
```
$ docker-compose down --volumes
$ docker-compose up -d
```