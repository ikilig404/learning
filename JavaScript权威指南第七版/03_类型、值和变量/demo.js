let s = "Hello, world"; // 先声明－个字符串

// 取得字符串的一部分
s.substring(1, 4) // =>"ell"：第2~4个字符
s.slice(1, 4) //=>"ell"：同上
s.slice(-3) //=>"rld"：最后3个字符
s.split(", ") //=>["Hello"，"worLd"]：从定界符处拆开

// 搜索字符串
s.indexOf("l") //=>2：第一个字母l的位置
s.indexOf("l", 3) //=>3：位置3后面第一个"1"的位置
s.indexOf("zz") //=>-1：s并不包含子串"zz"
s.lastIndexOf("l") //=>10：最后一个字母1的位置

// ES6及之后版本中的布尔值搜索函数
s.startsWith("Hell") //=>true：字符串是以这些字符开头的
s.endsWith("!") //=>false：s不是以它结尾的
s.includes("or") // =>true：s包含子串"or"

// 创建字符串的修改版本
s.replace("llo", "ya") // => "Heya, world"
s.toLocaleLowerCase() // => "hello, world"
s.toUpperCase() // => "HELLO, WORLD"
s.normalize() // Unicode NFC 归一化：ES6新增
s.normalize("NFD") //NFD归一化。还有"NFKC"和"NFKD"

// 访问字符串中的个别（16位值）字符
s.charAt(0) //=>"H"：第一个字符
s.charAt(s.length - 1)  // =>"d"：最后一个字符
s.charCodeAt(0) // =>72：指定位置的16位数值
s.codePointAt(0) //=>72：ES6，适用于码点大于16位的情形

// ES2017 新增的字符串填充函数
"x".padStart(3) // => "  x"：在左侧添加空格，让字符串长度变成3
"x".padEnd(3) // => "x  ": 在右侧添加空格，让字符串长度变成3
"x".padStart(3, "*") // => "**x": 在左侧添加星号，让字符串长度变成3
"x".padEnd(3, "-")  // => "x--": 在右侧添加破折号，让字符串长度变成3

// 删除空格函数。trim() 是 ES5 就有的，其他是ES2019增加的
" test".trim() //=>"test"：删除开头和末尾的空格
" test ".trimStart() //=>"test "：删除左侧空格。也叫trimLeft
" test ".trimEnd() // =>"test"：删除右侧空格。也叫trimRight

//未分类字符串方法
s.concat("!") //=>"HeLlo，world！"：可以用+操作符代替
"<>".repeat(5) // => "<><><><><>": 拼接n次。ES6新增
