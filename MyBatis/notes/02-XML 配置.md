# XML 配置

MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。 配置文档的顶层结构如下：

- configuration（配置）
  - [properties（属性）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#properties)
  - [settings（设置）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#settings)
  - [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#typeAliases)
  - [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#typeHandlers)
  - [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#objectFactory)
  - [plugins（插件）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#plugins)
  - environments（环境配置）
    - environment（环境变量）
      - transactionManager（事务管理器）
      - dataSource（数据源）
  - [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#databaseIdProvider)
  - [mappers（映射器）](https://mybatis.org/mybatis-3/zh_CN/configuration.html#mappers)

## 1. 属性（properties）