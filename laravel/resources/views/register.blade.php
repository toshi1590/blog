<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>register</title>
</head>
<body>
    <h1>register</h1>
    <form action="" method="post">
        @csrf
        <label for="name">name</label>
        <input type="text" name="name" id="name">
        <label for="email">email address</label>
        <input type="email" name="email" id="email">
        <label for="password">password</label>
        <input type="password" name="password" id="password">
        <button type="submit">register</button>
    </form>
</body>
</html>