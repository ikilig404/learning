在Java中创建和执行线程任务的方法有很多，每种方法都有其特定的应用场景。下面详细介绍每种方法及其适用场景：

### 1. 继承 `Thread` 类

**应用场景**：
- 适用于简单的、独立的任务。
- 当不需要共享资源或数据时。
- 当需要覆盖 `Thread` 类的其他方法时。

**示例**：
```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running.");
    }

    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // 启动线程
    }
}
```

### 2. 实现 `Runnable` 接口

**应用场景**：
- 更常用，适用于需要共享资源或数据的任务。
- 适用于需要复用相同的任务代码但需要在不同线程中执行的情况。
- 可以与线程池、执行器结合使用，增加灵活性。

**示例**：
```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running.");
    }

    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start(); // 启动线程
    }
}
```

### 3. 实现 `Callable` 接口并使用 `FutureTask`

**应用场景**：
- 需要任务执行后返回结果的场景。
- 需要处理任务中的异常。
- 适用于需要等待多个并发任务完成并获取结果的情况。

**示例**：
```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("Thread is running.");
        return 123;
    }

    public static void main(String[] args) {
        MyCallable myCallable = new MyCallable();
        FutureTask<Integer> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start(); // 启动线程

        try {
            Integer result = futureTask.get(); // 获取结果
            System.out.println("Result: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

### 4. 使用 `ExecutorService`

**应用场景**：
- 需要管理多个并发任务的场景。
- 需要复用线程以减少创建和销毁线程的开销。
- 需要灵活地调度和管理线程池中的线程。
- 适用于复杂的并发需求，例如处理大量短时间任务或长时间运行任务。

**示例**：
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        Runnable task = () -> {
            System.out.println("Task is running.");
        };

        executorService.execute(task);
        executorService.shutdown();
    }
}
```

### 5. 使用 `ForkJoinPool`

**应用场景**：
- 适用于需要递归拆分任务的场景。
- 适用于需要并行处理大规模任务的情况。
- 适用于任务可以分解成更小的子任务并行处理的情况，例如处理大数据集或计算密集型任务。

**示例**：
```java
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

class MyRecursiveTask extends RecursiveTask<Integer> {
    private final int workLoad;

    public MyRecursiveTask(int workLoad) {
        this.workLoad = workLoad;
    }

    @Override
    protected Integer compute() {
        if (workLoad > 1) {
            MyRecursiveTask task1 = new MyRecursiveTask(workLoad / 2);
            MyRecursiveTask task2 = new MyRecursiveTask(workLoad / 2);
            task1.fork(); // 开始子任务
            return task2.compute() + task1.join(); // 等待并获取结果
        } else {
            return workLoad;
        }
    }

    public static void main(String[] args) {
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        MyRecursiveTask task = new MyRecursiveTask(10);
        Integer result = forkJoinPool.invoke(task); // 执行任务
        System.out.println("Result: " + result);
    }
}
```

### 6. 使用 `CompletableFuture`

**应用场景**：
- 适用于需要异步编程的场景。
- 适用于需要组合多个异步任务以构建复杂工作流的情况。
- 适用于需要异步任务的结果并进行进一步处理的情况。

**示例**：
```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("Task is running.");
            return 123;
        });

        future.thenAccept(result -> {
            System.out.println("Result: " + result);
        });

        try {
            future.get(); // 确保主线程等待异步任务完成
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

### 7. 使用 `ScheduledExecutorService`

**应用场景**：
- 适用于需要在给定延迟后或周期性地执行任务的场景。
- 适用于需要调度定时任务的情况，例如定期生成报告、定时清理临时文件等。

**示例**：
```java
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledExecutorServiceExample {
    public static void main(String[] args) {
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(3);

        Runnable task = () -> {
            System.out.println("Scheduled task is running.");
        };

        scheduledExecutorService.schedule(task, 5, TimeUnit.SECONDS); // 5秒后执行任务

        scheduledExecutorService.shutdown();
    }
}
```

### 总结

选择创建和执行线程任务的方式取决于具体的需求和应用场景：

- **继承 `Thread` 类**：简单、独立任务，不需要共享数据。
- **实现 `Runnable` 接口**：更常用，适合共享资源或需要复用任务代码的情况。
- **实现 `Callable` 接口**：需要返回结果或处理异常的任务。
- **使用 `ExecutorService`**：管理多个并发任务，适合复杂并发需求。
- **使用 `ForkJoinPool`**：递归任务分解和并行处理。
- **使用 `CompletableFuture`**：异步任务编排和组合。
- **使用 `ScheduledExecutorService`**：定时或周期性任务。

根据具体情况选择合适的方式，以实现最佳的性能和代码可维护性。