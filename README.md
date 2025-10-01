# fastlabel-codingtest-todo-s

## 課題
1. チェックボックスの挙動に一部バグを含んでいるため、修正してください。
2. 現状の作りだと検索によってデータベースに負荷がかかる可能性あります。課題を特定し修正してください。
3. 検索実行 -> そのまま新規TODOを追加 すると  
検索ワードと画面の表示状態が噛み合わず不自然な状態が生まれています。  
こちらを改善してください。要望としては以下です。
  - 追加したTODOは追加されたことが確認できるように、追加後すぐに画面に出てほしい
  - 検索ワードはリセットされて、表示も元の状態に戻っても構わない
4. TODOアプリのAPI側のソースコード（`api/src`以下のcontroller,repository,service,dto,types周辺）をリファクタリングしてください。  
5. このアプリユーザーのペインとして「ToDoの件数が増えてきた時に優先順位やタスクの管理がしづらい」という課題が挙がっています。こちらに対して少なくとも１つの機能を企画し実装してください。

## 提出方法
面接の日までに課題を終わらせ、当日ご自身のソースコードを画面共有しながら、  
どの箇所をどのように修正したかを説明してください。
事前の提出は不要、共有の方法は自由です。

## ローカルに準備いただくもの
- 必須
  - Docker
- オプション（エディタ上でインストールしたライブラリなどを参照したい場合）
  - Node.js(14.15.3)
  - npm

## API技術スタック
- Node.js
- Express
- TypeORM
- tsoa

## ローカル起動方法

```bash
$ docker network create fastlabel_todo_link
$ docker-compose up --build
# Open another window
$ docker-compose exec api npm run migration:run
```

`http://localhost:3000`にアクセスできます。

## routes.tsファイルの更新

`api/src/controllers`を更新した際は、下記コマンドを実行して`api/src/middlewares/tsoa/routes.ts`ファイルを更新してください.

```bash
$ docker-compose exec api npm run tsoa
```
