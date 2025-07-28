**Java 并发**



**线程池常用的阻塞队列**

![image-20250304232311435](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304232311435.png)



**Executors工具类**

![image-20250304232404027](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304232404027.png)

![image-20250304232441045](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304232441045.png)

**线程池拒绝策略**

![image-20250304232822044](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304232822044.png)



**线程池参数**

![image-20250304233239620](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304233239620.png)



**产生死锁的四个必要条件：**

- 互斥条件： 一个资源每次只能被一个进程使用。
- 占有且等待： 一个进程因请求资源而阻塞时，对已获得的资源保持不放。
- 不可强行占有： 进程已获得的资源，在未使用完之前，不能强行剥夺。
- 循环等待条件： 若干进程之间形成一种头尾相接的循环等待资源关系。



**如何解除死锁**

![image-20250304233305513](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/image-20250304233305513.png)